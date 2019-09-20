module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "object-shorthand": ["error", "always"],
        "object-property-newline": [
            "error",
            { "allowMultiplePropertiesPerLine": false }
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "quote-props": [
            "error",
            "as-needed"
        ],
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "asyncArrow": "always",
                "named": "never"
            }
        ],
        "arrow-body-style": [
            "error", "as-needed"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};