const checkPathAlias = require("./check-path-alias");
const plugin = {
    rules: {
        "check-path-alias": checkPathAlias,
    },
};

module.exports = plugin;
