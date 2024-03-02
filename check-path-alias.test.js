const { RuleTester } = require("eslint");
const checkPathAlias = require("./check-path-alias");

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: "module",
    },
});

ruleTester.run("check-path-alias", checkPathAlias, {
    valid: [{ code: "import { Component } from '@shared/component';" }],
    invalid: [
        {
            code: "import { Component } from 'src/shared/component';",
            errors: [
                {
                    message: "Run autofix to use path alias: @shared",
                    type: "ImportDeclaration",
                },
            ],
            output: "import { Component } from '@shared/component';",
        },
    ],
});

console.log("All tests passed!");
