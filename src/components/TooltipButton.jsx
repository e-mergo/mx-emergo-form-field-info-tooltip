import { createElement, forwardRef } from "react";
import classNames from "classnames";
import { Icon } from "./Icon";

/**
 * TooltipButton element
 *
 * Wrapped in `forwardRef()` for accepting external refs.
 *
 * @since 1.1.0
 *
 * @param {String}  options.className   Tooltip button class name.
 * @param {Object}  options.icon        Tooltip icon attribute. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 * @param {Boolean} options.enableFocus Whether the button is focussable.
 */
export const TooltipButton = forwardRef(({ className, icon, enableFocus, ...props }, forwardedRef) => {
    return (
        <button
            ref={forwardedRef}
            type="button"
            className={classNames(
                "ffit-tooltip-btn",
                "tooltip-btn", // For back-compat
                icon ? "tooltip-custom-icon" : "tooltip-default-icon"
            )}
            {...props}
            tabIndex={enableFocus ? 0 : -1}
        >
            <Icon icon={icon} />
        </button>
    );
});
