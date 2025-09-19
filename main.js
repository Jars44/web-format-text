// Cache DOM elements
const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const copyRawBtn = document.getElementById("copyRawBtn");
const copyWABtn = document.getElementById("copyWABtn");

const rapihinTeks = () => {
  const linesToRemoveSpaces = new Set([1, 3]);
  const linesToAddExtraLine = new Set([2]);

  let lines = input.value
    .replace(/---+/g, "") // Remove separators
    .replace(/(\r\n|\n|\r){3,}/g, "\n\n") // Limit consecutive empty lines
    .split("\n");

  // Remove lines that contain exactly 2 or 3 hash symbols only
  lines = lines.filter((line) => !/^#{2,3}$/.test(line.trim()));

  // Process lines with rules
  let finalLines = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (linesToRemoveSpaces.has(i)) {
      // Remove all spaces in this line
      line = line.replace(/\s+/g, "");
    } else {
      // Trim and reduce multiple spaces to one
      line = line.trim().replace(/\s{2,}/g, " ");
      // Remove markdown symbols for preview (*, _, ~, `, and triple backticks)
      line = line.replace(/(\*\*|\*|_|~|`{1,3})/g, "");
    }
    // Avoid consecutive empty lines
    if (line !== "" || (finalLines.length > 0 && finalLines[finalLines.length - 1] !== "")) {
      finalLines.push(line);
      if (linesToAddExtraLine.has(i)) {
        finalLines.push("");
      }
    }
  }

  const cleanedText = finalLines.join("\n").trim();
  output.textContent = cleanedText;
};

const clearTeks = () => {
  input.value = "";
  output.textContent = "";
};

const copyTeks = async () => {
  if (!output.textContent) return;

  try {
    await navigator.clipboard.writeText(output.textContent);
    copyRawBtn.textContent = "✓ Tersalin!";
    copyRawBtn.classList.replace("bg-green-600", "bg-green-500");
    setTimeout(() => {
      copyRawBtn.textContent = "📋 Copy Raw Text";
      copyRawBtn.classList.replace("bg-green-500", "bg-green-600");
    }, 2000);
  } catch (err) {
    console.error("Gagal menyalin:", err);
  }
};

const copyTeksWA = async () => {
  if (!output.textContent) return;

  // Clean input text before applying WhatsApp formatting
  let waText = input.value
    .replace(/---+/g, "") // Remove sequences of ---
    .replace(/--+/g, "") // Remove sequences of --
    .split("\n")
    .filter((line) => !/^#{2,3}$/.test(line.trim())) // Remove lines with exactly 2 or 3 hashes
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  // Convert markdown-like syntax to WhatsApp formatting symbols
  // Replace double asterisks with single asterisk for bold
  waText = waText.replace(/\*\*(.*?)\*\*/g, "*$1*");
  // Italic: _text_ to _text_
  // (Assuming input uses _ for italic already, so no change needed)
  // Underline: ~text~ to _text_ (WhatsApp uses _ for italic, no underline, so we can skip or map ~ to _)
  waText = waText.replace(/~(.*?)~/g, "_$1_");
  // Strikethrough: `text` to ~text~
  waText = waText.replace(/`(.*?)`/g, "~$1~");
  // Code block: ```text``` keep as is for WhatsApp monospace block
  // No change needed for triple backticks

  try {
    await navigator.clipboard.writeText(waText);
    copyWABtn.textContent = "✓ Tersalin!";
    copyWABtn.classList.replace("bg-blue-600", "bg-blue-500");
    setTimeout(() => {
      copyWABtn.textContent = "📋 Copy for WA";
      copyWABtn.classList.replace("bg-blue-500", "bg-blue-600");
    }, 2000);
  } catch (err) {
    console.error("Gagal menyalin WA:", err);
  }
};

const stripHTML = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const markdownToText = () => {
  if (!input.value) return;
  const html = marked.parse(input.value);
  const plainText = stripHTML(html);
  output.textContent = plainText;
};
