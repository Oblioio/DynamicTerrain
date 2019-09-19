var loaderUtils = require("loader-utils");

module.exports = function loader(source) {
	var options = loaderUtils.getOptions(this) || {};
	var text = source;

	// replace "/* sections */" in main.js file with lines to import sections from en.json 
	if (source.match(/\/\*\ssections\s\*\/.*/)) {
		let sectionsText = '';
		let sectionsObjText = '\n\nvar imports = {\n';

		for (var i = options.json.sections.length - 1; i >= 0; i--) {
			// let str = options.json.sections[i];
			// let name = str[0].toUpperCase() + str.substr(1);
			let name = options.json.sections[i];
			let jspath = options.json.widgets[name].jsPath;
			sectionsText += "import { " + name + " } from '" + jspath + "';\n";
			sectionsObjText += name + ":" + name + ",\n";
		}

		sectionsObjText += "}\n";

		text = text.replace(/\/\*\ssections\s\*\//, sectionsText + sectionsObjText);
	}

	// replace "/* xxxx.widgets */" in .js files with lines to import widgets from en.json 
	var match;
	if (match = text.match(/\/\*\s(.*)\.widgets\s\*\//)) {
		let widgetsText = '';
		console.log('MATCH = ', match[1]);
		let widgets = options.json.widgets[match[1]].widgets;

		if (widgets) {
			for (var i = widgets.length - 1; i >= 0; i--) {
				// let str = widgets[i];
				// let name = str[0].toUpperCase() + str.substr(1);
				// let jspath = options.json.widgets[str].jsPath;
				let name = widgets[i];
				let jspath = options.json.widgets[name].jsPath;

				if (jspath) widgetsText += "import { " + name + " } from '" + jspath + "';\n";
			}

			text = text.replace(/\/\*\s(.*)\.widgets\s\*\//, widgetsText);
		}
	}

	return text;
};