// import { builtinModules } from 'module'
// import { defineConfig, Plugin } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import resolve from 'vite-plugin-resolve'
import pkg from '../../package.json'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    // resolveElectron(),
    /**
     * Here you can specify other modules
     * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
     *    which will ensure that the electron-builder can package it correctly
     * @example
     * {
     *   'electron-store': 'const Store = require("electron-store"); export default Store;',
     * }
     */
  ],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
    minify: process.env./* from mode option */ NODE_ENV === 'production',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true, // 生产环境去除console
      },
    },
  },
  server: {
    port: pkg.env.PORT,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/assets/css/css-variables.less',
        )}";`,
      },
    },
  },
})

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
// function resolveElectron(resolves: Parameters<typeof resolve>[0] = {}): Plugin {
//   const builtins = builtinModules.filter((t) => !t.startsWith("_"));

//   /**
//    * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
//    */
//   return resolve({
//     electron: electronExport(),
//     ...builtinModulesExport(builtins),
//     ...resolves,
//   });

//   function electronExport() {
//     return `
// /**
//  * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
//  */
// const electron = require("electron");
// const {
//   clipboard,
//   nativeImage,
//   shell,
//   contextBridge,
//   crashReporter,
//   ipcRenderer,
//   webFrame,
//   desktopCapturer,
//   deprecate,
// } = electron;

// export {
//   electron as default,
//   clipboard,
//   nativeImage,
//   shell,
//   contextBridge,
//   crashReporter,
//   ipcRenderer,
//   webFrame,
//   desktopCapturer,
//   deprecate,
// }
// `;
//   }

//   function builtinModulesExport(modules: string[]) {
//     return modules
//       .map((moduleId) => {
//         const nodeModule = require(moduleId);
//         const requireModule = `const M = require("${moduleId}");`;
//         const exportDefault = `export default M;`;
//         const exportMembers =
//           Object.keys(nodeModule)
//             .map((attr) => `export const ${attr} = M.${attr}`)
//             .join(";\n") + ";";
//         const nodeModuleCode = `
// ${requireModule}

// ${exportDefault}

// ${exportMembers}
// `;

//         return { [moduleId]: nodeModuleCode };
//       })
//       .reduce((memo, item) => Object.assign(memo, item), {});
//   }
// }
