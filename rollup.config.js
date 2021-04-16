import styles from "rollup-plugin-styles";
import copy from 'rollup-plugin-copy'
// import { uglify } from "rollup-plugin-uglify";
import typescript from '@rollup/plugin-typescript';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'build/bundle.min.js',
        format: 'cjs',
        assetFileNames: "assets/[name][extname]"
    },
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        styles({
            mode: ['extract', 'styles.min.css'],
            minimize: true
        }),
        // nodeResolve(),
        // uglify(),
        copy({
            targets: [
                { src: 'src/images/*', dest: 'build/images' },
                { src: 'src/index.html', dest: 'build/' },
                { src: 'node_modules/handlebars/dist/handlebars.min.js', dest: 'build/' }
            ]
        })
    ]
};