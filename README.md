# Container Tab Flow

`Container Tab Flow` is a Firefox extension that helps you stay within the current container when closing a tab.

## How It Works

The extension follows these rules to determine which tab to activate upon closing the current tab:

1. If there's a tab to the right within the current container, activate it.
2. Otherwise, if there's a tab to the left within the current container, activate it.
3. If no suitable tabs are found in the current container, activate the nearest tab to the right.
4. If there are no tabs to the right, activate the nearest tab to the left.

## Installation

1. Download the extension from the [Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/container-tab-flow/).
2. Follow the on-screen instructions to add the extension to your browser.

## License

This project is licensed under the [ISC License](LICENSE).

## Acknowledgments

- The contents of all text files in the first commit was written by GPT4, as an experiment to see if it can be prompted to write a Firefox extension with the desired behaviour in its entirety.
- <a href="https://www.flaticon.com/free-icons/tab" title="tab icons">Tab icons created by Freepik - Flaticon</a>.
