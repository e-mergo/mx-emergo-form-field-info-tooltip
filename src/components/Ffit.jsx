import { createElement, Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "./Tooltip";
import classNames from "classnames";
import "../ui/FormFieldInfoTooltip.scss";

/**
 * Ffit element
 *
 * @since 1.1.1
 *
 * @param {String} options.widgetClassName  Mendix widget class name.
 * @param {Object} options.tooltipMode      Widget mode attribute.
 * @param {Array}  options.content          Form field child elements.
 * @param {Array}  options.widgetContent    Widget child elements.
 * @param {String} options.tooltipText      Tooltip text attribute.
 * @param {String} options.tooltipClassName Tooltip class attribute.
 * @param {Object} options.tooltipIcon      Tooltip icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.tooltipLocation  Tooltip location attribute.
 * @param {String} options.tooltipPosition  Tooltip position attribute.
 * @param {String} options.openOn           Tooltip interaction attribute.
 * @param {String} options.name             Mendix widget element name.
 */
export function Ffit({
    widgetClassName,
    tooltipMode,
    content: formFieldContent,
    widgetContent,
    tooltipText,
    tooltipClassName,
    tooltipIcon,
    tooltipLocation,
    tooltipPosition,
    openOn,
    name
}) {
    // Define reference for the widget element
    const formFieldContainerRef = useRef(null);

    // Check mode: Form field
    const isFormFieldMode = "formField" === tooltipMode;

    // Check mode: Widget or Standalone
    const isWidgetOrStandaloneMode = "widget" === tooltipMode || "standalone" === tooltipMode;

    // Define noop for
    const noop = () => {};

    // Setup container element
    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip-container";

    // Log issue with nested conditional visibility
    if (isFormFieldMode && formFieldContent.length && formFieldContent[0].props.hasOwnProperty("visible")) {
        console.error(
            `${name}: Widget cannot properly handle nested widgets with conditional visibility. Apply conditional visibility to the tooltip widget itself.`
        );
    }

    // Act when rendering the element
    useEffect(() => {
        let controlLabel;

        // Form field: when the widget element is rendered
        if (isFormFieldMode && formFieldContainerRef.current) {
            // Query the form field label element
            controlLabel = formFieldContainerRef.current.querySelector(".control-label");

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
        <Fragment>
            {isFormFieldMode && (
                <div
                    ref={formFieldContainerRef}
                    className={classNames(
                        { "form-field-with-info-tooltip": isFormFieldMode },
                        isFormFieldMode ? `tooltip-location-${tooltipLocation}` : null
                    )}
                >
                    {formFieldContent}
                    {createPortal(
                        <Tooltip
                            className={widgetClassName}
                            tooltipClassName={tooltipClassName}
                            text={tooltipText}
                            icon={tooltipIcon}
                            position={tooltipPosition}
                            interaction={openOn}
                        />,
                        tooltipContainer
                    )}
                </div>
            )}
            {isWidgetOrStandaloneMode && (
                <Tooltip
                    className={widgetClassName}
                    tooltipClassName={tooltipClassName}
                    text={tooltipText}
                    icon={tooltipIcon}
                    position={tooltipPosition}
                    interaction={openOn}
                    target={widgetContent}
                />
            )}
        </Fragment>
    );
}
