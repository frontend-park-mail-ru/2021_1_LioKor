import styles from "rollup-plugin-styles";
import copy from 'rollup-plugin-copy'
import { uglify } from "rollup-plugin-uglify";
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'public/index.js',
    output: {
        file: 'build/bundle.min.js',
        format: 'cjs',
        assetFileNames: "assets/[name][extname]"
    },
    plugins: [
        styles({
            mode: ['extract', 'styles.css'],
            minimize: true
        }),
        // nodeResolve(),
        uglify(),
        copy({
            targets: [
                { src: 'public/images/*', dest: 'build/images' },
                { src: 'public/index.html', dest: 'build/' }
            ]
        })
    ]
};
