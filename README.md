# Form Field Info Tooltip
Mendix custom widget for adding a contextual information tooltip to a form field

**Form Field Info Tooltip** is a Mendix widget created by [E-mergo](https://www.e-mergo.nl). Use this widget to add contextual information to your form fields in Mendix. The widget displays an information icon nested inside the form field adjacent to the label or input field, creating a clear relation between form field and contextual information. When interacting with the icon, a simple tooltip shows the contextual information.

This widget is [hosted on GitHub](https://github.com/e-mergo/mx-emergo-form-field-info-tooltip). You can report bugs and discuss features on the [issues page](https://github.com/e-mergo/mx-emergo-form-field-info-tooltip/issues).

## Disclaimer
This widget is created free of charge for Mendix developers, personal or professional. E-mergo developers aim to maintain the functionality of this widget with each new release of Mendix. However, this product does not ship with any warranty of support. If you require any updates to the widget or would like to request additional features, please inquire for E-mergo's commercial plans for supporting your widget needs at support@e-mergo.nl.

## Features
Below is a detailed description of the available features of this widget.

### Tooltip text
Set the tooltip text with plain text or use parameters to create dynamic tooltip text. This is a required attribute of the widget.

### Tooltip icon
Set the tooltip icon with a icon or image from the icon library.

### Tooltip location
Set the location of the tooltip icon in the form field: before the label, after the label or before the input.

### Tooltip position
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

- 'form-field-with-info-tooltip' is the class name of the widget element that contains the embedded form field.
- 'tooltip-container' is the class name of the element that contains the tooltip trigger element (button).
- 'tooltip-default-icon' is the class name of the tooltip trigger element when no tooltip icon is configured.
- 'tooltip-custom-icon' is the class name of the tooltip trigger element when a tooltip icon is configured.
- 'form-field-info-tooltip' is the class name of the tooltip element that contains the tooltip text.

## FAQ

### Can I get support for this widget?
E-mergo provides paid support through standard support contracts. For other scenarios, you can post your bugs or questions in the widget's GitHub repository.

### Can you add feature X?
Requests for additional features can be posted in the widget's GitHub repository. Depending on your own code samples and the availability of E-mergo developers your request may be considered and included.

## Changelog

#### 1.0.0 - 20231009 - Mendix 9.24.3
Initial release.
