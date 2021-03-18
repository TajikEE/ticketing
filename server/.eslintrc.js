module.exports = {
    'env': {
        'browser': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
    // we only want single quotes
        'quotes': ['warn', 'single'],
        // we want to force semicolons
        'semi': ['warn', 'always'],
        // we use 2 spaces to indent our code
        'indent': ['warn', 4],
        // we want to avoid useless spaces
        'no-multi-spaces': ['warn'],
        'no-console': ['warn']
    }
};
