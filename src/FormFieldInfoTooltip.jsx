import { createElement, Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "./components/Tooltip";
import classNames from "classnames";
import "./ui/FormFieldInfoTooltip.scss";

/**
 * FormFieldInfoTooltip element
 *
 * @since 1.0.0
 *
 * @param {String} options.class            Mendix widget class name.
 * @param {Object} options.tooltipType      Widget type attribute.
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
export function FormFieldInfoTooltip({
    class: widgetClassName,
    tooltipType,
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

    // Check type: Form field
    const isFormFieldType = "formField" === tooltipType;

    // Check type: Widget or Standalone
    const isWidgetOrStandaloneType = "widget" === tooltipType || "standalone" === tooltipType;

    // Define noop for
    const noop = () => {};

    // Setup container element
    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip-container";

    // Log issue with nested conditional visibility
    if (isFormFieldType && formFieldContent.length && formFieldContent[0].props.hasOwnProperty("visible")) {
        console.error(
            `${name}: Widget cannot properly handle nested widgets with conditional visibility. Apply conditional visibility to the tooltip widget itself.`
        );
    }

    // Act when rendering the element
    useEffect(() => {
        let controlLabel;

        // Form field: when the widget element is rendered
        if (isFormFieldType && formFieldContainerRef.current) {
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
            {isFormFieldType && (
                <div
                    ref={formFieldContainerRef}
                    className={classNames(
                        { "form-field-with-info-tooltip": isFormFieldType },
                        isFormFieldType ? `tooltip-location-${tooltipLocation}` : null
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
            {isWidgetOrStandaloneType && (
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
