const checkPathAlias = require("./check-path-alias");
const restrictImportDepth = require("./restrict-import-depth");
const plugin = {
    rules: {
        "check-path-alias": checkPathAlias,
        "restrict-import-depth": restrictImportDepth,
    },
};

module.exports = plugin;
