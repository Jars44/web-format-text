# 🧹 Text Wizard - Online Tool for Cleaning Messy Text

[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Jars44/text-wizard/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://jars44.github.io/text-wizard/)

> A simple, free web application to clean and format messy text. Remove markdown symbols, trim spaces, and prepare text for WhatsApp with ease.

## 📋 Table of Contents

- [🧹 Text Wizard - Online Tool for Cleaning Messy Text](#-text-wizard---online-tool-for-cleaning-messy-text)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Key Features](#-key-features)
  - [🚀 Live Demo](#-live-demo)
  - [📖 How to Use](#-how-to-use)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [🔧 Internal Logic](#-internal-logic)
    - [Default Rules](#default-rules)
  - [🧩 Developer: Rule Engine \& Extensibility](#-developer-rule-engine--extensibility)
    - [Rule Format](#rule-format)
    - [Extending the Engine](#extending-the-engine)
  - [🏃‍♂️ Running the Project](#️-running-the-project)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [🤝 Contributing](#-contributing)
    - [Development Guidelines](#development-guidelines)
  - [🔍 Troubleshooting](#-troubleshooting)
    - [Common Issues](#common-issues)
    - [Browser Compatibility](#browser-compatibility)
  - [❓ FAQ](#-faq)
  - [📄 License](#-license)

## ✨ Key Features

- 🧽 **Clean Text**: Automatically remove unwanted markdown symbols like `*`, `_`, `~`, and backticks
- ✂️ **Trim Spaces**: Eliminate extra spaces and limit consecutive empty lines
- 🗑️ **Remove Separators**: Strip out lines with only hash symbols or dashes
- 📝 **Markdown Conversion**: Convert markdown to plain text, preserving structure
- 📋 **Copy Functionality**: One-click copying for raw text and WhatsApp-formatted versions
- 🔄 **Quick Reset**: Clear input and output with a single button
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **No Installation**: Runs entirely in your browser, no setup required

## 🚀 Live Demo

Experience the tool live: **[Text Wizard Demo](https://jars44.github.io/text-wizard/)**

## 📖 How to Use

1. **Paste Your Text**: Copy and paste messy text into the input area
2. **Choose Action**:
   - Click **✨ Format Text** to clean and format the text
   - Click **📝 Markdown to Text** to convert markdown to plain text
   - Click **🗑️ Clear Text** to reset everything
3. **View Results**: See the processed text in the output area
4. **Copy Results**:
   - **📋 Copy Raw Text** for plain cleaned text
   - **💬 Copy for WA** for WhatsApp-compatible formatting

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vanilla JavaScript**: Client-side text processing and DOM manipulation
- **Marked.js**: Lightweight markdown parser for conversion
- **Font Awesome**: Icons for enhanced UI

## 🔧 Internal Logic

The application processes text through a multi-step pipeline:

1. **Normalization**: Convert line endings to Unix format
2. **Rule Application**: Apply configurable rules to each line
3. **Line Limiting**: Restrict consecutive blank lines
4. **WhatsApp Formatting**: Convert markdown to WhatsApp-compatible syntax

### Default Rules

- Remove separator lines (---, ##, ###)
- Trim and reduce multiple spaces
- Preserve code blocks during processing

## 🧩 Developer: Rule Engine & Extensibility

The core uses a flexible rule-based engine in `main.js` for easy customization:

```javascript
const DEFAULT_RULES = [
  { id: "remove-separators", match: { type: "regex", pattern: /^-{3,}\s*$/ }, action: "remove" },
  { id: "remove-hash-only", match: { type: "regex", pattern: /^#{2,3}\s*$/ }, action: "remove" },
  { id: "trim-reduce-md-preview", match: { type: "regex", pattern: /\S/ }, action: "trimReduce" },
];
```

### Rule Format

- **id**: Unique identifier for the rule
- **match**: Either a regex pattern or custom function
- **action**: Processing action (`remove`, `removeSpaces`, `trimReduce`, `addEmptyAfter`)

### Extending the Engine

1. Modify `DEFAULT_RULES` in `main.js` to add new rules
2. Use regex for pattern matching or functions for complex logic
3. Test changes by running the app locally

## 🏃‍♂️ Running the Project

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for CDN resources (optional for offline use)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jars44/text-wizard.git
   cd text-wizard
   ```

2. Open `index.html` in your browser

That's it! No build process or server required.

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works on mobile

## 🔍 Troubleshooting

### Common Issues

- **Text not formatting**: Check browser console for JavaScript errors
- **Copy not working**: Ensure clipboard permissions are enabled
- **Styling issues**: Clear browser cache or try incognito mode
- **Mobile display**: Ensure viewport meta tag is present

### Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## ❓ FAQ

**Q: Can I use this offline?**  
A: Yes! Once loaded, the app works without internet. CDN resources are cached locally.

**Q: Is my data stored anywhere?**  
A: No. All processing happens in your browser. Text never leaves your device.

**Q: Can I customize the formatting rules?**  
A: Currently, rules are predefined, but the code is open-source for modifications.

**Q: What markdown elements are supported?**  
A: Headers, bold/italic text, inline code, and basic formatting. Complex structures may need manual adjustment.

**Q: How do I report bugs?**  
A: Open an issue on GitHub with steps to reproduce and your browser/OS info.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
