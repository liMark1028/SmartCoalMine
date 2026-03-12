/*
 * @Author: 孙海涛 973316286@qq.com
 * @Date: 2025-02-13 17:50:34
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-18 14:33:37
 * @FilePath: \ahla-tkxt-web\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'

// 自适应插件
import postCssPxToRem from 'postcss-pxtorem'
// 自动导入相关插件--->>vue,vue-router,element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// 引入SDK插件
import { mars3dPlugin } from 'vite-plugin-mars3d'

// https://vite.dev/config/
export default defineConfig({
  //静态资源服务的文件夹
  publicDir: 'public',
  base: './',
  //静态资源处理
  assetsInclude: '',
  //控制台输出的级别 info 、warn、error、silent
  logLevel: 'info',
  // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
  clearScreen: true,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/index.scss" as *;
        `,
        api: 'modern-compiler',
      },
    },
    // postcss: {
    //   plugins: [
    //     postCssPxToRem({
    //       // 自适应，px>rem转换
    //       rootValue: 192, // 75表示750设计稿，37.5表示375设计稿
    //       propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
    //       // selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
    //       unitPrecision: 5, //允许rem单位增长的十进制数字
    //       // replace: true, //替换包含rems的规则，而不添加后备
    //       // mediaQuery: false, //允许在媒体查询中转换px
    //       minPixelValue: 0, //设置要替换的最小像素值
    //       // selectorBlackList: [], //忽略转换正则匹配项
    //       // exclude: /node_modules/i //要忽略并保留为px的文件路径
    //     }),
    //   ],
    // },
  },
  //本地运行配置，以及反向代理配置
  server: {
    host: "0.0.0.0",
    https: false, //是否启用 http 2
    // cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    open: false, //服务启动时自动在浏览器中打开应用
     port: 5173,
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    hmr: false, //禁用或配置 HMR 连接
    // 传递给 chockidar 的文件系统监视器选项
    // watch: {
    //   ignored: ['!**/node_modules/your-package-name/**'],
    // },
    // 反向代理配置
    proxy: {
      '/api': {
        target: 'http://192.168.1.80:9090/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools()
    // 配置自动导入
    AutoImport({
      imports: ['vue', 'vue-router'],
      // 自动导入element plus 组件，无需全局注册和手动按需导入
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      eslintrc: {
        enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        extends: ['./.eslintrc-auto-import.json'],
      },
    }),
    Components({
      dirs: ['src/components/common'],
      resolvers: [
        // 导入element-plus组件
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        /**
         * 导入icon图标组件  使用方法 ----->>> <i-ep-[name]>  ep 为element图标缩写
         * 具体其他图标库可以查看网站：https://icon-sets.iconify.design/
         * 如果需要使用其他图标库图标需要联网完成
         * 自动引入图标组件会根据使用情况自动下载依赖并导入-----使用后可查看package.json文件
         */
        IconsResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    mars3dPlugin(),
  ],

  json: {
    //是否支持从 .json 文件中进行按名导入
    namedExports: true,
    //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
    stringify: false,
  },
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    //指定输出路径
    outDir: 'dist',
    //生成静态资源的存放路径
    assetsDir: 'assets',
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,

    //@rollup/plugin-commonjs 插件的选项
    //commonjsOptions: {
    // },
    //构建的库
    // lib: {
    // },
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    // 设置为 false 可以禁用最小化混淆，
    // 或是用来指定使用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    minify: 'esbuild', //terser 构建后文件体积更小
    //传递给 Terser 的更多 minify 选项。
    //  terserOptions: {
    // },
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 brotli 压缩大小报告
    // brotliSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 1024,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 分类输出
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})
