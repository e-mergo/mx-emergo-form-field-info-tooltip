# Form Field Info Tooltip

Mendix custom widget for adding a contextual information tooltip to a form field, a widget or just by itself

**Form Field Info Tooltip** is a Mendix widget created by [E-mergo](https://www.e-mergo.nl). Use this widget to add contextual information to your form fields, widgets or just an icon in Mendix. When applied to a form field, the widget displays an information icon nested inside the form field adjacent to the label or input field, creating a clear relation between form field and contextual information. When interacting with the icon, a simple tooltip shows the contextual information.

This widget is [hosted on GitHub](https://github.com/e-mergo/mx-emergo-form-field-info-tooltip). You can report bugs and discuss features on the [issues page](https://github.com/e-mergo/mx-emergo-form-field-info-tooltip/issues).

## Disclaimer

This widget is created free of charge for Mendix developers, personal or professional. E-mergo developers aim to maintain the functionality of this widget with each new release of Mendix. However, this product does not ship with any warranty of support. If you require any updates to the widget or would like to request additional features, please inquire for E-mergo's commercial plans for supporting your widget needs at support@e-mergo.nl.

## Features

Below is a detailed description of the available features of this widget.

### Mode

Select the variation of the information tooltip: in a form field, using any type of widget, or a standalone icon. By default, the widget uses 'Form field' to insert a tooltip icon in a form field. Select 'Widget' to apply the tooltip to any embedded widget. Select 'Standalone' to display just the selected icon with a tooltip. The variations allow for a harmonized tooltip experience across different parts of an app.

### Tooltip

Set the tooltip text with plain text or use parameters to create dynamic tooltip text. This is a required attribute of the widget.

### Tooltip class

Set an expression for the dynamic class name for the tooltip popup.

### Icon

Set the tooltip icon with a icon or image from the icon library.

### Placement

Set the placement of the tooltip icon in the form field: before the label, after the label or before the input.

### Position

Set the position of the tooltip related to the tooltip icon: top, left, bottom, or right.

### Interaction

Set the interaction method of the tooltip: show the tooltip on click, hover or on hover and focus.

## Usage

Follow these steps to add the widget to your Mendix project:

1. Download the Widget from the Mendix Marketplace in Studio Pro.
2. Insert the Widget in a page.
3. Insert a form field widget in the content region of the Widget.
4. Configure the Widget. The tooltip text is a required attribute.
5. Run the app, observe the tooltip icon in the form field and interact with the icon to see the info tooltip.

## Styling

The default tooltip icon and the tooltip itself can be styled through CSS in your project's theme styles.

-   'form-field-with-info-tooltip' is the class name of the widget element that contains the embedded form field.
-   'tooltip-container' is the class name of the element that contains the tooltip trigger element in Form field mode (button).
-   'ffit-form-field-info-tooltip' is the class name of the tooltip trigger element in Form field mode (button).
-   'ffit-widget-info-tooltip' is the class name of the tooltip trigger element in Widget mode (widget).
-   'ffit-standalone-info-tooltip' is the class name of the tooltip trigger element in Standalone mode (button).
-   'tooltip-default-icon' is the class name of the tooltip trigger element when no tooltip icon is configured.
-   'tooltip-custom-icon' is the class name of the tooltip trigger element when a tooltip icon is configured.
-   'ffit-tooltip-popup' is the class name of the tooltip element that contains the tooltip text.

## FAQ

### Can I get support for this widget?

E-mergo provides paid support through standard support contracts. For other scenarios, you can post your bugs or questions in the widget's GitHub repository.

### Can you add feature X?

Requests for additional features can be posted in the widget's GitHub repository. Depending on your own code samples and the availability of E-mergo developers your request may be considered and included.

## Changelog

#### 1.1.1 - 20250228

-   Fixed class name assignment for various modes.

#### 1.1.0 - 20250228

-   Added the Mode attribute to expand the tooltip usage beyond form fields: use any type of widget or a standalone icon.
-   Changed the default icon to use the Atlas Core lined icon question-circle.

#### 1.0.4 - 20231027

-   Updated the default icon to use a better looking SVG image.
-   Fixed codebase formatting following Prettier principles.

#### 1.0.3 - 20231020

-   Fixed rendering widget with hidden child widgets.

#### 1.0.2 - 20231011

-   Fixed widget package version update.

#### 1.0.1 - 20231010

-   Fixed bug where the tooltip icon would disappear due to overflow in the form field's label element.

#### 1.0.0 - 20231009 - Mendix 9.24.3

Initial release.
