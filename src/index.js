import "@babel/polyfill";
import "normalize.css";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^\.\/.*\.(jsx?)$/)); // pattern to take each .js(x) files
requireAll(require.context('./pages', true, /^\.\/.*\.(jsx?)$/));
