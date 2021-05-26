import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        file: 'dist/bundle.min.js',
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
        terser({ format: { comments: false } }),
        copy({
            targets: [
                { src: 'src/images/*', dest: 'dist/images' },
                { src: 'src/index.html', dest: 'dist/' },
                { src: 'src/sw.js', dest: 'dist/' }
            ]
        })
    ]
};
