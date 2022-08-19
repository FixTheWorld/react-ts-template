const NODE_ENV = process.env.NODE_ENV || 'development'
const TARGET = process.env.TARGET || 'development'
const TENANT = process.env.TENANT

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** Target Server Type */
  target: TARGET,
  /** The tenant to use when building the project */
  tenant: TENANT,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: NODE_ENV === 'development' ? `http://localhost:3000/` : '/app/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {
    'ali-oss': 'ali-oss',
  },
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'babel-polyfill',
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router',
  ],
}
