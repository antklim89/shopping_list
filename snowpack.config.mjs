/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
    // [
    //   "@snowpack/plugin-babel",
    //   {
    //     "input": ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
    //     transformOptions: {
    //       "plugins": [
    //         ["@babel/plugin-transform-react-jsx", {
    //           "pragma": "h",
    //           "pragmaFrag": "Fragment",
    //         }]
    //       ]
    //     }
    //   }
    // ],
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        ['@snowpack/plugin-webpack'],
        [
            '@snowpack/plugin-typescript',
            {

                /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
                ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
            },
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
