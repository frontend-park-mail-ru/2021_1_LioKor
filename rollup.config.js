import styles from "rollup-plugin-styles";
import { uglify } from "rollup-plugin-uglify";
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
        nodeResolve(),
        uglify()
    ]
};
