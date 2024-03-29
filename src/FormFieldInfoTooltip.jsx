import { createElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { noop } from "lodash";
import { Tooltip } from "./components/Tooltip";
import "./ui/FormFieldInfoTooltip.scss";

/**
 * FormFieldInfoTooltip element
 *
 * @since 1.0.0
 *
 * @param {String} options.class           Mendix widget class name.
 * @param {Array}  options.content         Widget child elements. Expected to contain a form field widget.
 * @param {String} options.tooltipText     Tooltip text attribute.
 * @param {Object} options.tooltipIcon     Tooltip icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.tooltipLocation Tooltip location attribute.
 * @param {String} options.tooltipPosition Tooltip position attribute.
 * @param {String} options.openOn          Tooltip interaction attribute.
 * @param {String} options.name            Mendix widget element name.
 */
export function FormFieldInfoTooltip({
    class: widgetClassName,
    content,
    tooltipText,
    tooltipIcon,
    tooltipLocation,
    tooltipPosition,
    openOn,
    name
}) {
    // Define reference for the widget element
    const contentRef = useRef(null);

    // Setup container element
    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip-container";

    // Log issue with nested conditional visibility
    if (content.length && content[0].props.hasOwnProperty("visible")) {
        console.error(
            `${name}: Widget cannot properly handle nested widgets with conditional visibility. Apply conditional visibility to the tooltip widget itself.`
        );
    }

    // Act when rendering the element
    useEffect(() => {
        let controlLabel;

        // When the widget element is rendered
        if (contentRef.current) {
            // Query the form field label element
            controlLabel = contentRef.current.querySelector(".control-label");

            // Bail when the label element is not found
            if (!controlLabel) {
                return noop;
            }

            // Wrap the label content
            const labelContainer = document.createElement("span");
            labelContainer.className = "label-content";
            labelContainer.innerHTML = controlLabel.innerHTML;

            // Replace label content
            controlLabel.replaceChildren(labelContainer);

            // Insert container at location
            switch (tooltipLocation) {
                case "beforeLabel":
                    controlLabel.prepend(tooltipContainer);
                    break;
                case "afterLabel":
                case "beforeInput":
                default:
                    controlLabel.append(tooltipContainer);
                    break;
            }

            return () => {
                // Remove container from location, unwrap label
                controlLabel.replaceChildren(labelContainer.innerHTML);
            };
        }

        return noop;
    });

    return (
        <div ref={contentRef} className={`form-field-with-info-tooltip tooltip-location-${tooltipLocation}`}>
            {content}
            {createPortal(
                <Tooltip
                    className={widgetClassName}
                    text={tooltipText}
                    icon={tooltipIcon}
                    position={tooltipPosition}
                    interaction={openOn}
                />,
                tooltipContainer
            )}
        </div>
    );
}
