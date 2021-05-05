import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import eslint from '@rollup/plugin-eslint';

import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
// import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        file: 'build/bundle.js',
        format: 'cjs',
        assetFileNames: 'assets/[name][extname]'
    },
    plugins: [
        typescript({
            target: 'ES6',
            sourceMap: false // if true => would broke rollup's source map
        }),
        styles({
            mode: ['extract', 'styles.min.css'],
            minimize: true
        }),
        nodeResolve(),
        commonjs(),
        /* eslint({
            throwOnError: true,
            exclude: 'src/styles/**'
        }), */
        // uglify(),
        copy({
            targets: [
                { src: 'src/images/*', dest: 'build/images' },
                { src: 'src/index.html', dest: 'build/' },
                { src: 'src/sw.js', dest: 'build/' }
            ]
        })
    ]
};
