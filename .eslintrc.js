const base = require("@mendix/pluggable-widgets-tools/configs/eslint.js.base.json");

// Extend rules
base.rules = Object.assign(base.rules, {
    "sort-imports": ["off"]
});

module.exports = {
    ...base
};
