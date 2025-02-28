import { createElement } from "react";
import { Ffit } from "./components/Ffit";

/**
 * FormFieldInfoTooltip element
 *
 * @since 1.0.0
 *
 * @param {String} options.class Mendix widget class name.
 */
export function FormFieldInfoTooltip({ class: widgetClassName, ...props }) {
    // Rename widget class name
    props.widgetClassName = widgetClassName;

    return <Ffit {...props} />;
}
