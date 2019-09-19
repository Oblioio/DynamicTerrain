function buildConfig(env) {
  return require('./config/webpack.config.' + env + '.js');
}

module.exports = env => {
  return buildConfig(env.NODE_ENV === 'production' ? 'prod': 'dev');
}