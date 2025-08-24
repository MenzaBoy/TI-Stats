import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== 'production';

export default {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'webpack'),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.app.json',
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // runs a local server
            openAnalyzer: true, // automatically open browser
            analyzerPort: 8888, // or pick another port if needed
        }),
    ],
    devServer: {
        static: './public',
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: true,
    },
    devtool: isDev ? 'inline-source-map' : false,
};
