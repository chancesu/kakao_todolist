import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

/**
 * store 디렉토리에 있는 것을 하나한 import 하는 것이 아니라,
 *  디렉토리와 store/index.js 만 추가하면 자동으로 store에 등록하도록 되어있음.
 * @type {__WebpackModuleApi.RequireContext}
 */
const requireModule = require.context(
  ".",
  true,
  /^((?!\.unit\.).)*.index\.js$/
);
const rootModule = { modules: {} };

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return;

  const modulePath = fileName
    .replace(/^\.\//, "")
    .replace(/\.\w+$/, "")
    .split(/\//)[0];

  rootModule.modules[modulePath] = requireModule(fileName).default;
});

const plugins = [
  createPersistedState({
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
  })];

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    ...rootModule.modules
  },
  plugins
});
