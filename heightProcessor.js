
var fs = require('fs'),
PNG = require('pngjs').PNG;

fs.createReadStream('./blender/Desert/Desert_Displacement.png')
    .pipe(new PNG({
    }))
    .on('parsed', function() {
        var pxArray = [];
        for (var y = 0; y < this.height; y+=4) {
            for (var x = 0; x < this.width; x+=4) {
                var idx = (this.width * y + x) << 2;

                // invert color
                // this.data[idx] = 255 - this.data[idx];
                // this.data[idx+1] = 255 - this.data[idx+1];
                // this.data[idx+2] = 255 - this.data[idx+2];

                // and reduce opacity
                // this.data[idx+3] = this.data[idx+3] >> 1;
                
                // add red px
                pxArray.push(String.fromCharCode(this.data[idx]))
            }
        }
        
        var pxStr = pxArray.join("");
        console.log(pxStr.length)
        // fs.writeFile("output.json", JSON.stringify(pxArray), 'utf8', function (err) {
        fs.writeFile("output.txt", pxArray.join(""), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });
    });