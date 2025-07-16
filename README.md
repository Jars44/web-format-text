# Messy Text Formatting

Messy Text Formatting is a simple web application designed to clean and format messy or cluttered text. Users can paste unformatted text and use the app to remove unwanted markdown symbols, trim spaces, and limit empty lines. The app also supports copying the formatted text in both raw and WhatsApp-friendly formats.

## Features

- Cleans and formats pasted text by removing markdown symbols such as `*`, `_`, `~`, and backticks.
- Trims extra spaces and limits consecutive empty lines.
- Removes lines containing only 2 or 3 hash symbols.
- Copies the cleaned text to the clipboard.
- Copies a WhatsApp-formatted version of the text with appropriate markdown conversions.
- Clears input and output fields with a single click.
- Features a responsive and clean UI styled with Tailwind CSS.

## How to Use

1. Paste your messy text into the input textarea.
2. Click the **Format Text** button to clean and format the text.
3. View the formatted text in the output area below.
4. Use the **Copy Raw Text** button to copy the cleaned text.
5. Use the **Copy for WA** button to copy a WhatsApp-friendly formatted version.
6. Use the **Clear Text** button to reset the input and output fields.

## Internal Logic

The application processes the input text using JavaScript by:

- Removing markdown symbols such as asterisks (`*`), underscores (`_`), tildes (`~`), and backticks.
- Trimming leading and trailing spaces from each line.
- Limiting consecutive empty lines to a maximum of one.
- Removing lines that contain only 2 or 3 hash symbols.
- Converting the cleaned text into a WhatsApp-friendly format by replacing markdown with appropriate characters.

## Technologies Used

- HTML5 for structure.
- Tailwind CSS (via CDN) for styling and responsive design.
- Vanilla JavaScript for text processing and DOM manipulation.

## Running the Project

Open the `index.html` file in any modern web browser to use the application.

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository and create your branch from `main`.
- Remove any install or build dependencies before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
- Increase the version numbers in any example files and the README.md to the new version that this Pull Request would represent.
- Merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, request the second reviewer to merge it for you.

## Troubleshooting

- Use a modern web browser for best compatibility.
- Clear your browser cache if formatting does not work as expected.
- Check the browser console for any JavaScript errors.
- Ensure the input text is properly pasted into the input area.

## FAQ

- **Q**: Can I use this app offline?
  - **A**: Yes, this is a client-side web application that runs entirely in your browser without requiring an internet connection.
- **Q**: Does the app support other markdown symbols?
  - **A**: Currently, it supports common markdown symbols like `*`, `_`, `~`, and backticks. Support for additional symbols may be added in future updates.
- **Q**: Can I customize the formatting rules?
  - **A**: Not at this time, but contributions to add customization features are welcome.

## License

This project is open source and free to use.
