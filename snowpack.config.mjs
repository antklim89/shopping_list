/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
        '@prefresh/snowpack',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        ['@snowpack/plugin-webpack'],
        [
            '@snowpack/plugin-typescript',
            { ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}) },
        ],
    ],
    routes: [],
    optimize: { 'bundle': true },
    packageOptions: {},
    devOptions: {},
    buildOptions: {},
    alias: {
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
        '~': './src',
    },
};
