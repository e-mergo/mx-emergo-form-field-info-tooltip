import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

// Define form field specific properties
const typeFormFieldKeys = ["tooltipLocation", "content"];

// Define widget specific properties
const typeWidgetKeys = ["widgetContent"];

// Define standalone specific properties
const typeStandaloneKeys = [];

// Define conditional properties for tooltip modes
const keysToHideByTooltipMode = {
    formField: [...typeWidgetKeys, ...typeStandaloneKeys],
    widget: [...typeFormFieldKeys, ...typeStandaloneKeys, "tooltipIcon"],
    standalone: [...typeFormFieldKeys, ...typeWidgetKeys]
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
    hidePropertiesIn(defaultProperties, values, [...keysToHideByTooltipMode[values.tooltipMode]]);

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
