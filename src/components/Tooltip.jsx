import { Fragment, createElement, useRef, useState } from "react";
import {
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useClick,
    useDismiss,
    useRole,
    offset,
    flip,
    shift,
    arrow,
    autoUpdate,
    FloatingPortal,
    FloatingArrow
} from "@floating-ui/react";
import classNames from "classnames";
import { TooltipButton } from "./TooltipButton";

/**
 * Tooltip element
 *
 * @since 1.0.0
 *
 * @param {String} options.className        Mendix widget class name.
 * @param {String} options.text             Tooltip text attribute.
 * @param {String} options.tooltipClassName Tooltip class attribute.
 * @param {Object} options.icon             Tooltip icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {String} options.position         Tooltip position attribute.
 * @param {String} options.interaction      Tooltip interaction attribute.
 * @param {Array}  options.target           Optional. Tooltip target.
 */
export function Tooltip({ className, text, tooltipClassName, icon, position, interaction, target }) {
    // Define state for showing/hiding the tooltip
    const [showTooltip, setShowTooltip] = useState(false);

    // Define whether focus is enabled
    const enableFocus = "hoverFocus" === interaction;

    // Define reference for the tooltip arrow element
    const arrowRef = useRef(null);

    // Define whether a target is provided
    const hasTarget = target && !!target.length;

    // Configuration of Floating UI
    const {
        // References for the trigger and tooltip element
        refs,

        // Styles for the tooltip element
        floatingStyles,

        // Floating UI context
        context
    } = useFloating({
        // Show/hide tooltip
        open: showTooltip,

        // Change show/hide tooltip
        onOpenChange: setShowTooltip,

        // Tooltip placement
        placement: position,

        // Tooltip transforms
        middleware: [
            // Add distance between icon and tooltip
            offset(10),

            // Flip tooltip when lacking space
            flip(),

            // Shift tooltip when lacking space
            shift({ padding: 10 }),

            // Position arrow element
            arrow({ element: arrowRef })
        ],

        // Update tooltip position when interacting with the page
        whileElementsMounted: autoUpdate
    });

    // Define interactions
    const focus = useFocus(context, { enabled: enableFocus });
    const hover = useHover(context, { enabled: "hover" === interaction || "hoverFocus" === interaction });
    const click = useClick(context, { enabled: "click" === interaction });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });
    const { getReferenceProps, getFloatingProps } = useInteractions([focus, hover, click, dismiss, role]);

    return (
        <Fragment>
            {hasTarget && (
                <div
                    ref={refs.setReference}
                    className={classNames("ffit-widget-info-tooltip", className)}
                    tabIndex={enableFocus ? 0 : -1}
                    {...getReferenceProps()}
                >
                    {target}
                </div>
            )}
            {!hasTarget && (
                <TooltipButton
                    ref={refs.setReference}
                    className={classNames("ffit-standalone-info-tooltip", `tooltip-on-${interaction}`, className)}
                    icon={icon}
                    tabIndex={enableFocus ? 0 : -1}
                    {...getReferenceProps()}
                />
            )}
            <FloatingPortal>
                {showTooltip && (
                    <div
                        ref={refs.setFloating}
                        className={classNames(
                            "ffit-tooltip-popup",
                            /* For backcompat */ "form-field-info-tooltip",
                            tooltipClassName?.value
                        )}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div className="tooltip-popup-content">{text.value}</div>
                        <FloatingArrow className="tooltip-popup-arrow" ref={arrowRef} context={context}></FloatingArrow>
                    </div>
                )}
            </FloatingPortal>
        </Fragment>
    );
}
