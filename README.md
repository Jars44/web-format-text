# 🧹 Format Teks - Online Tool for Cleaning Messy Text

[![GitHub stars](https://img.shields.io/github/stars/Jars44/web-format-text?style=social)](https://github.com/Jars44/web-format-text)
[![GitHub issues](https://img.shields.io/github/issues/Jars44/web-format-text)](https://github.com/Jars44/web-format-text/issues)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Jars44/web-format-text/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://jars44.github.io/web-format-text/)

Format Teks is a simple and free web application designed to clean and format messy or cluttered text. Users can paste unformatted text and use the app to remove unwanted markdown symbols, trim spaces, and limit empty lines. The app also supports copying the formatted text in both raw and WhatsApp-friendly formats.

## ✨ Key Features

- 🧽 **Clean Text**: Remove markdown symbols like `*`, `_`, `~`, and backticks
- ✂️ **Trim Spaces**: Trim extra spaces and limit consecutive empty lines
- 🗑️ **Remove Hash Lines**: Remove lines containing only 2 or 3 hash symbols
- 📝 **Markdown Conversion**: Convert markdown to plain text, handling headings, lists, links, and other structures
- 📋 **Copy Text**: Copy the cleaned text to clipboard
- 💬 **WhatsApp Format**: Copy a WhatsApp-formatted version with appropriate markdown conversions
- 🔄 **Quick Reset**: Clear input and output fields with one click
- 📱 **Responsive UI**: Clean and responsive design using Tailwind CSS

## 🚀 Live Demo

Visit the [Live Demo](https://jars44.github.io/web-format-text/) to try the application directly in your browser.

## 📖 How to Use

1. **Paste Text**: Enter messy text into the input textarea
2. **Format Text**: Click the **✨ Format Text** button to clean and format the text
3. **View Result**: See the formatted text in the output area below
4. **Copy Text**: Use the **📋 Copy Raw Text** button to copy the cleaned text
5. **Copy for WA**: Use the **📋 Copy for WA** button to copy a WhatsApp-friendly version
6. **Reset**: Click the **🗑️ Clear Text** button to reset input and output

## 🛠️ Technologies Used

- **HTML5**: Application structure
- **Tailwind CSS**: Styling and responsive design (via CDN)
- **Vanilla JavaScript**: Text processing and DOM manipulation
- **Marked.js**: Library for parsing markdown

## 🔧 Internal Logic

The application processes input text using JavaScript with the following steps:

- Remove markdown symbols such as asterisks (`*`), underscores (`_`), tildes (`~`), and backticks
- Trim leading and trailing spaces from each line
- Limit consecutive empty lines to a maximum of one
- Remove lines that contain only 2 or 3 hash symbols
- Convert the cleaned text into a WhatsApp-friendly format by replacing markdown with appropriate characters

- Markdown headers (#, ##, ###, ...) are converted into WhatsApp bold formatting. Example: `### 1. Judul` → `*1. Judul*`

## 🧩 Developer: Rule Engine & Extensibility

The app uses a flexible rule-engine implemented in `main.js` so you can tune how lines are processed without changing the core logic.

- Rule format: { id, match, action }
  - match: either a regex ({ type: 'regex', pattern: /.../ }) or a custom function(line, index, lines) returning a boolean
  - action: one of `remove`, `removeSpaces`, `trimReduce`, `addEmptyAfter` (you can extend these)
- Default behavior keeps markdown tokens for conversion to WhatsApp, but the cleaning call supports a `stripMarkdown` option so the same pipeline can be used for preview (strip tokens) and for export (preserve tokens)

Examples and how to extend:

1. Edit `main.js` and update the `DEFAULT_RULES` array to change what gets removed, preserved or reformatted.
2. Add a new rule with `match.type: 'regex'` to target pattern-based lines (for instance, remove lines that are exact dividers).
3. Add a `match` function when you need context-aware rules that depend on the surrounding lines.

This design lets you define dynamic and composable transformations without hard-coded line indices.

## 🏃‍♂️ Running the Project

Open the `index.html` file in any modern web browser to use the application. No server installation or additional dependencies required.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository and create your branch from `main`
2. Make your changes
3. Ensure your code follows project standards
4. Update README.md with details of changes if necessary
5. Increase version numbers in example files and README.md
6. Create a Pull Request

## 🔍 Troubleshooting

- Use a modern web browser for best compatibility
- Clear browser cache if formatting doesn't work as expected
- Check browser console for JavaScript errors
- Ensure input text is properly pasted into the input area

## ❓ FAQ

**Q: Can I use this app offline?**  
A: Yes, this is a client-side web application that runs entirely in your browser without requiring an internet connection.

**Q: Does the app support other markdown symbols?**  
A: Currently supports common markdown symbols like `*`, `_`, `~`, and backticks. Support for additional symbols may be added in future updates.

**Q: Can I customize the formatting rules?**  
A: Not at this time, but contributions to add customization features are welcome.

## 📄 License

This project is open source and free to use under the [MIT license](LICENSE).
