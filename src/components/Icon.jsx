import { Fragment, createElement } from "react";
import classNames from "classnames";
import pathToDefaultIconSvg from "../assets/default-icon.svg";

/**
 * Icon element
 *
 * @since 1.1.0
 *
 * @param {Object} icon Icon object. See {@link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis/#icon-value}.
 */
export function Icon({ icon }) {
    return (
        <Fragment>
            {icon && icon.value.iconClass && (
                <i
                    aria-hidden
                    className={classNames(
                        {
                            glyphicon: "glyph" === icon.value.type
                        },
                        icon.value.iconClass
                    )}
                ></i>
            )}
            {icon && icon.value.iconUrl && <img aria-hidden src={icon.value.iconUrl} />}
            {icon ? null : <img src={pathToDefaultIconSvg} />}
        </Fragment>
    );
}
