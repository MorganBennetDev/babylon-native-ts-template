const path = require("path");

module.exports = {
    entry: "./scripts/index.ts",
    // mode: "production", // Enable this when shipping for better size.
    output: {
        path: path.resolve(__dirname, "build", "scripts"),
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
                include: path.resolve(__dirname, 'scripts'),
                use: {
                    loader: "ts-loader"
                },
            },
        ],
    },
};