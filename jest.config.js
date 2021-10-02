

/** @type { import('@jest/types').Config.DefaultOptions } */
module.exports = {
    verbose: true,
    setupFiles: [
        // '/home/ubuntu/projects/shopping_list/node_modules/react-app-polyfill/jsdom.js'
    ],
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    transform: {
        // '^.+\\.(js|jsx|ts|tsx)$': '/home/ubuntu/projects/shopping_list/node_modules/@snowpack/app-scripts-preact/jest/babelTransform.js',
        // '^.+\\.css$': '/home/ubuntu/projects/shopping_list/node_modules/@snowpack/app-scripts-preact/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '/home/ubuntu/projects/shopping_list/node_modules/@snowpack/app-scripts-preact/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['node_modules'],
    // watch: true,
};
