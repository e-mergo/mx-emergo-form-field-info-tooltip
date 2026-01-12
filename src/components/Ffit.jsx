import { createElement, Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMutationObserver } from "@react-hooks-library/core";
import { Tooltip } from "./Tooltip";
import classNames from "classnames";
import "../ui/FormFieldInfoTooltip.scss";

/**
 * Ffit element
 *
 * @since 1.1.1
 *
 * @param {String} options.widgetClassName      Mendix widget class name.
 * @param {Object} options.tooltipMode          Widget mode attribute.
 * @param {Array}  options.content              Form field child elements.
 * @param {Array}  options.widgetContent        Widget child elements.
 * @param {String} options.tooltipText          Tooltip text attribute.
 * @param {String} options.tooltipContent       Tooltip content elements.
 * @param {Object} options.tooltipContentIsText Tooltip content is text attribute.
 * @param {String} options.tooltipClassName     Tooltip class attribute.
 * @param {Object} options.tooltipIcon          Tooltip icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.tooltipLocation      Tooltip location attribute.
 * @param {String} options.tooltipPosition      Tooltip position attribute.
 * @param {String} options.openOn               Tooltip interaction attribute.
 * @param {Object} options.focusWithin          Tooltip focus within attribute.
 * @param {Object} options.enableInteraction    Tooltip enable interaction attribute.
 * @param {String} options.name                 Mendix widget element name.
 * @param {Object} options.style                Mendix widget element styles.
 */
export function Ffit({
    widgetClassName,
    tooltipMode,
    content: formFieldContent,
    widgetContent,
    tooltipText,
    tooltipContent,
    tooltipContentIsText,
    tooltipClassName,
    tooltipIcon,
    tooltipLocation,
    tooltipPosition,
    openOn,
    focusWithin,
    enableInteraction,
    name,
    style
}) {
    // Define reference for the widget element
    const formFieldContainerRef = useRef(null);

    // Check mode: Form field
    const isFormFieldMode = "formField" === tooltipMode;

    // Check mode: Widget
    const isWidgetMode = "widget" === tooltipMode;

    // Check mode: Standalone
    const isStandaloneMode = "standalone" === tooltipMode;

    // Setup container element
    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip-container";

    // Setup label wrapper
    const labelContainer = document.createElement("span");
    labelContainer.className = "label-content";

    // Log issue with nested conditional visibility
    if (isFormFieldMode && formFieldContent.length && formFieldContent[0].props.hasOwnProperty("visible")) {
        console.error(
            `${name}: Widget cannot properly handle nested widgets with conditional visibility. Apply conditional visibility to the tooltip widget itself.`
        );
    }

    /**
     * Insert the tooltip in the form field element
     */
    function insertFormFieldTooltip() {
        // Bail when not in form field mode
        if (!isFormFieldMode) return;

        // Query the form field label element
        const controlLabel = formFieldContainerRef.current?.querySelector(".control-label");

        // Bail when the label element is not found
        if (!controlLabel) return;

        // Bail when inserted already
        if (-1 !== [controlLabel.firstElementChild, controlLabel.lastElementChild].indexOf(tooltipContainer)) return;

        // Wrap the label content
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
    }

    // Watch form field container
    useMutationObserver(
        formFieldContainerRef,
        mutationList => {
            // Search whether added node is the tooltip container
            const isContainerAdded = mutationList.reduce(
                (is, mutation) => is || tooltipContainer === mutation.addedNodes[0],
                false
            );

            // Tooltip container insert is observed
            if (isContainerAdded) return;

            // Insert the tooltip container
            insertFormFieldTooltip();
        },
        {
            childList: true, // Observe when already inserted
            characterData: true, // Observe when not inserted
            subtree: true
        }
    );

    // Act when rendering the element
    useEffect(() => {
        insertFormFieldTooltip();
    });

    // Bail when text tooltip is empty.
    // Widget-based content cannot reliably be detected for visibility
    if (!tooltipText?.value && !tooltipContent) {
        return (
            <Fragment>
                {isFormFieldMode && formFieldContent}
                {isWidgetMode && widgetContent}
            </Fragment>
        );
    }

    return (
        <Fragment>
            {isFormFieldMode && (
                <div
                    ref={formFieldContainerRef}
                    className={classNames("form-field-with-info-tooltip", `tooltip-location-${tooltipLocation}`)}
                >
                    {formFieldContent}
                    {createPortal(
                        <Tooltip
                            className={classNames(widgetClassName, "ffit-form-field-info-tooltip")}
                            tooltipClassName={tooltipClassName}
                            text={tooltipText}
                            content={tooltipContent}
                            contentIsText={tooltipContentIsText}
                            icon={tooltipIcon}
                            position={tooltipPosition}
                            interaction={openOn}
                            focusWithin={focusWithin}
                            enableInteraction={enableInteraction}
                            style={style}
                        />,
                        tooltipContainer
                    )}
                </div>
            )}
            {(isWidgetMode || isStandaloneMode) && (
                <Tooltip
                    className={classNames(widgetClassName, {
                        "ffit-widget-info-tooltip": isWidgetMode,
                        "ffit-standalone-info-tooltip": isStandaloneMode
                    })}
                    tooltipClassName={tooltipClassName}
                    text={tooltipText}
                    content={tooltipContent}
                    contentIsText={tooltipContentIsText}
                    icon={tooltipIcon}
                    position={tooltipPosition}
                    interaction={openOn}
                    focusWithin={focusWithin}
                    enableInteraction={enableInteraction}
                    target={widgetContent}
                    style={style}
                />
            )}
        </Fragment>
    );
}
