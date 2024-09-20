const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    // mode: "production", // Enable this when shipping for better size.
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                include: /@babylonjs/,
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [['@babel/preset-env']]
                    },
                },
            },
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: "ts-loader"
                },
            },
        ],
    },
};