"use strict";

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = [ {
	mode: "development",
	watch: true,
	plugins: [
		new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
	],
	output: {
		path: path.resolve(__dirname, 'wwwroot'),
		filename: "js/[name].extracted.css.js",
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: "cache-loader",
					},
					MiniCssExtractPlugin.loader,
					{
						loader: "fast-css-loader", // translates CSS into CommonJS
						options: {
							url: false, // Don't change url paths in css rules
							importLoaders: 1, // Must have it for postcss autoprefixer to work
						},
					}, {
						loader: "postcss-loader", // perform operations on the css such as run autoprefixer
					}, {
						loader: "fast-sass-loader", // compiles Sass to CSS
						options: {
							includePaths: ["src/sass"],
						},
					},
				],
			},
		],
	},
	entry: {
		"bundle.task": ['./wwwroot/sass/task.scss.js'],
	},
	optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                include: /(\.min\.(css|js)$|sw\.js)/,
                extractComments: false,
                cache: true,
                uglifyOptions: {
                    compress: {
                        arrows: false,
                        booleans: false,
                        cascade: false,
                        collapse_vars: false,
                        comparisons: false,
                        computed_props: false,
                        hoist_funs: false,
                        hoist_props: false,
                        hoist_vars: false,
                        if_return: false,
                        inline: false,
                        join_vars: false,
                        keep_infinity: true,
                        loops: false,
                        negate_iife: false,
                        properties: false,
                        reduce_funcs: false,
                        reduce_vars: false,
                        sequences: false,
                        side_effects: false,
                        switches: false,
                        top_retain: false,
                        toplevel: false,
                        typeofs: false,
                        unused: false,
                        // Switch off all types of compression except those needed to convince
                        // react-devtools that we're using a production build
                        conditionals: true,
                        dead_code: true,
                        evaluate: true,
                    },
                    mangle: true,
                  },
            }),
        ],
	},
}
];