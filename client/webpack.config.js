import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export const plugins = [
    new NodePolyfillPlugin()
];
export const resolve = {
    fallback: {
        "path": require.resolve("path-browserify")
    }
};
