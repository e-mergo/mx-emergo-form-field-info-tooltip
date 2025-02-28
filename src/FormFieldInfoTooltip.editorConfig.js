import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

// Define formField exclusive properties
const modeFormFieldKeys = ["tooltipLocation", "content"];

// Define widget exclusive properties
const modeWidgetKeys = ["widgetContent"];

// Define standalone exclusive properties
const modeStandaloneKeys = [];

// Define conditional properties for modes
const keysToHideByMode = {
    formField: [...modeWidgetKeys, ...modeStandaloneKeys],
    widget: [...modeFormFieldKeys, ...modeStandaloneKeys, "tooltipIcon"],
    standalone: [...modeFormFieldKeys, ...modeWidgetKeys]
};

/**
 * Control visibility of properties in Studio Pro
 *
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {String} target
 * @returns {Properties}
 */
export function getProperties(values, defaultProperties, target) {
    // Conditional event property
    hidePropertiesIn(defaultProperties, values, [...keysToHideByMode[values.tooltipMode]]);

    return defaultProperties;
}

/**
 * Return the custom widget caption
 *
 * @param {Object} values
 * @param {String} platform
 * @return {String} Custom caption
 */
export function getCustomCaption(values, platform) {
    switch (values.tooltipMode) {
        case "widget":
            return "Widget Info Tooltip";
        case "standalone":
            return "Info Tooltip";
        case "formField":
        default:
            return "Form Field Info Tooltip";
    }
}
