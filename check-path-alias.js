/**
 * @fileoverview Check if imports match the path aliases defined in tsconfig.
 */

"use strict";

const path = require("path");

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Check if imports match the path aliases defined in tsconfig",
            category: "Possible Errors",
            recommended: true,
        },
        fixable: "code",
        schema: [],
    },

    create: function (context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                // Get aliases from tsconfig and check if the import matches any of them
                // "paths": {
                //     "src/*": ["src/*"],
                //     "@assets/*": ["src/assets/*"],
                //     "@pages/*": ["src/pages/*"],
                //     "@public/*": ["public/*"],
                //     "@shared/*": ["src/shared/*"],
                //     "@views/*": ["src/views/*"]
                // }
                const tsconfig = require(path.resolve(
                    process.cwd(),
                    "tsconfig.json"
                ));
                const paths = tsconfig.compilerOptions.paths;
                let pathList = [];

                for (let key in paths) {
                    paths[key].forEach((value) => {
                        if (key.startsWith("@")) {
                            pathList.push(value.replace("/*", ""));
                        }
                    });
                }

                if (pathList.some((path) => importPath.startsWith(path))) {
                    const matchingPath = pathList.find((path) =>
                        importPath.startsWith(path)
                    );
                    const alias = Object.keys(paths).find((key) =>
                        paths[key].includes(matchingPath + "/*")
                    );
                    const aliasParsed = alias.replace("/*", "");
                    const updatedImportPath = importPath.replace(
                        matchingPath,
                        aliasParsed
                    );
                    context.report({
                        node,
                        message: `Run autofix to use path alias: ${alias}`,
                        fix: (fixer) => {
                            return fixer.replaceText(
                                node.source,
                                `'${updatedImportPath}'`
                            );
                        },
                    });
                }
            },
        };
    },
};
