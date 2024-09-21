const path = require("path");

module.exports = {
    target: "node",
    entry: "./scripts/index.ts",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build", "scripts"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                loader: 'esbuild-loader',
                options: {
                    target: 'esnext'
                }
            },
        ],
    },
    optimization: {
        minimize: false,
        moduleIds: 'named',
        chunkIds: 'named',
        concatenateModules: false,
        mangleExports: false,
    }
};