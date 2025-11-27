const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const copyRawBtn = document.getElementById("copyRawBtn");
const copyWABtn = document.getElementById("copyWABtn");

const DEFAULT_RULES = [
  { id: "remove-separators", match: { type: "regex", pattern: /^-{3,}\s*$/ }, action: "remove" },
  { id: "remove-hash-only", match: { type: "regex", pattern: /^#{2,3}\s*$/ }, action: "remove" },
  { id: "trim-reduce-md-preview", match: { type: "regex", pattern: /\S/ }, action: "trimReduce" },
];

const normalize = (text = "") => String(text).replace(/\r\n|\r/g, "\n");

const limitConsecutiveBlankLines = (lines = [], max = 1) => {
  const result = [];
  let blankCount = 0;
  for (const l of lines) {
    if (l.trim() === "") {
      blankCount += 1;
    } else {
      blankCount = 0;
    }
    if (blankCount <= max) result.push(l);
  }
  return result;
};

const applyRuleToLine = (rule, line, index, lines, { stripMarkdown = false } = {}) => {
  const { match, action } = rule;
  let matched = false;
  if (!match) matched = true;
  else if (match.type === "regex" && match.pattern instanceof RegExp) {
    matched = match.pattern.test(line);
  } else if (typeof match === "function") {
    try {
      matched = !!match(line, index, lines);
    } catch (e) {
      matched = false;
    }
  }
  if (!matched) return { keep: true, line, extra: [] };
  switch (action) {
    case "remove":
      return { keep: false };
    case "removeSpaces":
      return { keep: true, line: line.replace(/\s+/g, "") };
    case "trimReduce": {
      const t = line.trim();
      if (t.startsWith("```")) return { keep: true, line: t };
      return {
        keep: true,
        line: t.replace(/\s{2,}/g, " ").replace(/(\*\*|\*|_{1,2}|~|`(?!``))/g, ""),
      };
    }
    case "addEmptyAfter":
      return { keep: true, line, extra: [""] };
    default:
      return { keep: true, line };
  }
};

const cleanText = (raw, { rules = DEFAULT_RULES, maxConsecutiveEmpty = 1, stripMarkdown = false } = {}) => {
  if (!raw) return "";
  let clean = normalize(raw)
    .replace(/-{2,}/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
  const lines = clean.split("\n");
  const processed = [];
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];
    let keep = true;
    let extras = [];
    for (const rule of rules) {
      const result = applyRuleToLine(rule, line, i, lines, { stripMarkdown });
      if (!result.keep) {
        keep = false;
        break;
      }
      if (result.line !== undefined) line = result.line;
      if (Array.isArray(result.extra) && result.extra.length) extras = extras.concat(result.extra);
    }
    if (keep) {
      processed.push(line);
      if (extras.length) processed.push(...extras);
    }
  }
  const limited = limitConsecutiveBlankLines(processed, maxConsecutiveEmpty);
  return limited.join("\n").trim();
};

const protectCodeBlocks = (text) => {
  const store = [];
  const protectedText = text.replace(/```([\s\S]*?)```/g, (match, inner) => {
    const token = `___CODE_BLOCK_${store.length}___`;
    store.push(match);
    return token;
  });
  return { protectedText, store };
};

const restoreCodeBlocks = (text, store) => text.replace(/___CODE_BLOCK_(\d+)___/g, (_, i) => store[Number(i)] || "");

const convertToWhatsApp = (cleaned) => {
  if (!cleaned) return "";
  const { protectedText, store } = protectCodeBlocks(cleaned);
  let out = protectedText;
  out = out
    .split(/\r?\n/)
    .map((ln) => {
      const headerMatch = ln.match(/^\s{0,}#{1,6}\s+(.*\S.*)$/);
      if (!headerMatch) return ln;
      let content = headerMatch[1].trim();
      content = content.replace(/\*\*(.+?)\*\*/gs, "*$1*");
      content = content.replace(/`([^`]+?)`/g, "~$1~");
      content = content.replace(/(^|\s)_([^_\n]+?)_(\s|$)/g, (m, p1, p2, p3) => `${p1}_${p2}_${p3}`);
      const trimmed = content.trim();
      if (/^\*.*\*$/.test(trimmed)) return trimmed;
      return `*${trimmed}*`;
    })
    .join("\n");
  out = out.replace(/\*\*(.+?)\*\*/gs, "*$1*");
  out = out.replace(/`([^`]+?)`/g, "~$1~");
  out = out.replace(/(^|\s)_([^_\n]+?)_(\s|$|$)/g, (m, p1, p2, p3) => `${p1}_${p2}_${p3}`);
  out = restoreCodeBlocks(out, store);
  return out;
};

const flashButton = (
  btn,
  {
    successText = "✓ Copied!",
    defaultText,
    successBg = "bg-green-500",
    defaultBg = "bg-green-600",
    duration = 2000,
  } = {}
) => {
  if (!btn) return;
  const original = btn.textContent;
  const originalClasses = btn.className;
  btn.textContent = successText;
  btn.classList.remove(defaultBg);
  btn.classList.add(successBg);
  setTimeout(() => {
    btn.textContent = defaultText || original;
    btn.className = originalClasses;
  }, duration);
};

const writeToClipboard = async (
  text,
  { button, successText, defaultText, successBg, defaultBg, fallbackAlert } = {}
) => {
  if (!text) return false;
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      if (!document.execCommand("copy")) throw new Error("execCommand failed");
      document.body.removeChild(area);
    }
    if (button) flashButton(button, { successText, defaultText, successBg, defaultBg });
    return true;
  } catch (err) {
    console.error("Clipboard write failed", err);
    if (fallbackAlert) alert(fallbackAlert);
    return false;
  }
};

const rapihinTeks = () => {
  try {
    const cleaned = cleanText(input?.value || "", {
      rules: DEFAULT_RULES,
      maxConsecutiveEmpty: 1,
      stripMarkdown: true,
    });
    output.textContent = cleaned;
  } catch (err) {
    console.error("Failed to format text:", err);
    output.textContent = "";
  }
};

const clearTeks = () => {
  if (input) input.value = "";
  if (output) output.textContent = "";
};

const copyTeks = async () => {
  const text = output?.textContent || "";
  if (!text) return;
  await writeToClipboard(text, {
    button: copyRawBtn,
    successText: "✓ Copied!",
    defaultText: "📋 Copy Raw Text",
    successBg: "bg-green-500",
    defaultBg: "bg-green-600",
    fallbackAlert: "Copy failed — please select and copy manually.",
  });
};

const copyTeksWA = async () => {
  try {
    const cleaned = cleanText(input?.value || "", { rules: DEFAULT_RULES, maxConsecutiveEmpty: 1 });
    const waText = convertToWhatsApp(cleaned);
    await writeToClipboard(waText, {
      button: copyWABtn,
      successText: "✓ Copied!",
      defaultText: "📋 Copy for WA",
      successBg: "bg-blue-500",
      defaultBg: "bg-blue-600",
      fallbackAlert: "Copy for WA failed — please select and copy manually.",
    });
  } catch (err) {
    console.error("Error copying WA text:", err);
  }
};

const stripHTML = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const markdownToText = () => {
  if (!input?.value) return;
  try {
    const html = marked.parse(input.value);
    const plainText = stripHTML(html);
    output.textContent = plainText;
  } catch (err) {
    console.error("Markdown parse failed:", err);
  }
};
