const { RuleTester } = require("eslint");
const restrictImportDepth = require("./restrict-import-depth");

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: "module",
    },
});

ruleTester.run("restrict-import-depth", restrictImportDepth, {
    valid: [
        { code: "import { Component } from 'src/component';" },
        { code: "import { Component } from '@shared/component';" },
        { code: "import { Component } from './component';" },
        { code: "import { Component } from '../component';" },
    ],
    invalid: [
        {
            code: "import { Component } from '../../component';",
            errors: [
                {
                    message:
                        "Importing files more than 2 directories up is not allowed",
                    type: "ImportDeclaration",
                },
            ],
        },
    ],
});

console.log("All tests passed!");
