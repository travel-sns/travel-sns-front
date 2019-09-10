const path = require("path");
const ROOT = path.resolve(__dirname, "../");
const APP_DIR = path.resolve(ROOT, "src");
const BUILD_DIR = path.resolve(ROOT, "dist");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: BUILD_DIR,
    publicPath: "/webpack-react-setting/"
  },
  context: path.resolve(ROOT, "public"), //The base directory, an absolute path
  optimization: {
    namedModules: true, //Tells webpack to use readable module identifiers for better debugging
    namedChunks: true, //webpack to use readable chunk identifiers for better debugging
    moduleIds: "named", //Readable ids for better debugging.
    mangleWasmImports: true, //tells webpack to reduce the size of WASM by changing imports to shorter strings.
    providedExports: true, //Tells webpack to figure out which exports are provided by modules to generate more efficient code for export * from
    removeAvailableModules: true, //Tells webpack to detect and remove modules from chunks when these modules are already included in all parents
    usedExports: true, //Tells webpack to determine used exports for each module
    concatenateModules: true, //Tells webpack to find segments of the module graph which can be safely concatenated into a single module
    minimizer: [
      //https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        parallel: true, //Use multi-process parallel running to improve the build speed
        sourceMap: true, //Use source maps to map error message locations to modules
        //https://github.com/terser/terser#minify-options
        terserOptions: {
          mangle: true, //false to skip mangling names
          compress: {
            drop_console: true //Pass true to discard calls to console.* functions
          }
        }
      })
    ]
  },
  plugins: [
    //remove/clean your build folder(s) before building
    new CleanWebpackPlugin([BUILD_DIR], {
      root: ROOT,
      verbose: true,
      dry: false
    })
    // new BundleAnalyzerPlugin()
  ]
};
