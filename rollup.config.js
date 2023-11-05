import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.js", // Your entry point
  output: {
    file: "dist/bundle.js", // Your output bundle
    format: "iife", // Format iife for browser scripts
    sourcemap: true, // Enable source maps
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    resolve(), // Resolve node modules
    commonjs(), // Convert CommonJS modules to ES6
    babel({
      exclude: "node_modules/**", // Only transpile our source code
      presets: ["@babel/preset-react"], // Preset for React
      babelHelpers: "bundled",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // Replace process.env.NODE_ENV with 'production'
      preventAssignment: true,
    }),
    terser(), // Minify the bundle
    postcss({
      plugins: [],
      minimize: true, // Minify CSS (if you're using CSS-in-JS, this may be unnecessary)
    }),
  ],
  external: ["react", "react-dom"], // Specify peer dependencies here to exclude them from the bundle
};
