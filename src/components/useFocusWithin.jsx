import * as React from "react";
import { getWindow, isElement, isHTMLElement } from "@floating-ui/utils/dom";
import {
    activeElement,
    contains,
    getDocument,
    getTarget,
    isMac,
    isSafari,
    isTypeableElement,
    matchesFocusVisible
} from "@floating-ui/react/utils";
import { useFocusWithin as useAriaFocusWithin } from "react-aria";

/** ..utils/createAttribute */
function createAttribute(name) {
    return `data-floating-ui-${name}`;
}

/** ..utils/clearTimeoutIfSet */
function clearTimeoutIfSet(timeoutRef) {
    if (timeoutRef.current !== -1) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = -1;
    }
}

function isMacSafari() {
    return isMac() && isSafari();
}

/**
 * Interaction hook for child focus events
 *
 * Opens the floating element while the reference element has child elements
 * with focus, like CSS `:focus-within`.
 *
 * @see https://github.com/floating-ui/floating-ui/blob/master/packages/react/src/hooks/useFocus.ts
 *
 * @since 1.3.0
 */
export function useFocusWithin(context, props = {}) {
    const { open, onOpenChange, events, dataRef, elements } = context;
    const { enabled = true, visibleOnly = true } = props;

    const blockFocusRef = React.useRef(false);
    const timeoutRef = React.useRef(-1);
    const keyboardModalityRef = React.useRef(true);

    React.useEffect(() => {
        if (!enabled) return;

        const win = getWindow(elements.domReference);

        // If the reference was focused and the user left the tab/window, and the
        // floating element was not open, the focus should be blocked when they
        // return to the tab/window.
        function onFocus() {
            if (
                !open &&
                isHTMLElement(elements.domReference) &&
                elements.domReference === activeElement(getDocument(elements.domReference))
            ) {
                blockFocusRef.current = true;
            }
        }

        function onKeyDown() {
            keyboardModalityRef.current = true;
        }

        function onPointerDown() {
            keyboardModalityRef.current = false;
        }

        win.addEventListener("focus", onFocus);

        if (isMacSafari()) {
            win.addEventListener("keydown", onKeyDown, true);
            win.addEventListener("pointerdown", onPointerDown, true);
        }

        // eslint-disable-next-line consistent-return
        return () => {
            win.removeEventListener("focus", onFocus);

            if (isMacSafari()) {
                win.removeEventListener("keydown", onKeyDown, true);
                win.removeEventListener("pointerdown", onPointerDown, true);
            }
        };
    }, [elements.domReference, open, enabled]);

    React.useEffect(() => {
        if (!enabled) return;

        function _onOpenChange({ reason }) {
            if (reason === "reference-press" || reason === "escape-key") {
                blockFocusRef.current = true;
            }
        }

        events.on("openchange", _onOpenChange);
        // eslint-disable-next-line consistent-return
        return () => {
            events.off("openchange", _onOpenChange);
        };
    }, [events, enabled]);

    React.useEffect(() => () => clearTimeoutIfSet(timeoutRef), []);

    const { focusWithinProps } = useAriaFocusWithin({
        onFocusWithin(event) {
            if (blockFocusRef.current) return;

            const target = getTarget(event.nativeEvent);

            if (visibleOnly && isElement(target)) {
                // Safari fails to match `:focus-visible` if focus was initially
                // outside the document.
                if (isMacSafari() && !event.relatedTarget) {
                    if (!keyboardModalityRef.current && !isTypeableElement(target)) {
                        return;
                    }
                } else if (!matchesFocusVisible(target)) {
                    return;
                }
            }

            onOpenChange(true, event.nativeEvent, "focuswithin");
        },
        onBlurWithin(event) {
            blockFocusRef.current = false;
            const relatedTarget = event.relatedTarget;
            const nativeEvent = event.nativeEvent;

            // Hit the non-modal focus management portal guard. Focus will be
            // moved into the floating element immediately after.
            const movedToFocusGuard =
                isElement(relatedTarget) &&
                relatedTarget.hasAttribute(createAttribute("focus-guard")) &&
                relatedTarget.getAttribute("data-type") === "outside";

            // Wait for the window blur listener to fire.
            timeoutRef.current = window.setTimeout(() => {
                const activeEl = activeElement(elements.domReference ? elements.domReference.ownerDocument : document);

                // Focus left the page, keep it open.
                if (!relatedTarget && activeEl === elements.domReference) return;

                // When focusing the reference element (e.g. regular click), then
                // clicking into the floating element, prevent it from hiding.
                // Note: it must be focusable, e.g. `tabindex="-1"`.
                // We can not rely on relatedTarget to point to the correct element
                // as it will only point to the shadow host of the newly focused element
                // and not the element that actually has received focus if it is located
                // inside a shadow root.
                if (
                    contains(dataRef.current.floatingContext?.refs.floating.current, activeEl) ||
                    contains(elements.domReference, activeEl) ||
                    movedToFocusGuard
                ) {
                    return;
                }

                onOpenChange(false, nativeEvent, "focuswithin");
            });
        }
    });

    const reference = React.useMemo(
        () => ({
            onMouseLeave() {
                blockFocusRef.current = false;
            },
            ...focusWithinProps
        }),
        [focusWithinProps]
    );

    return React.useMemo(() => (enabled ? { reference } : {}), [enabled, reference]);
}
