const API_URL = "http://localhost:3000/api/ai";

const textArea = document.getElementById("selected-text");
const result = document.getElementById("result");
const copyButton = document.getElementById("copyButton");

console.log("Side panel script loaded");
async function loadSelectedText() {
  const data = await chrome.storage.local.get("selectedText");

  if (data.selectedText) {
    textArea.value = data.selectedText;
  }
}

async function runAI(action) {
  const text = textArea.value.trim();

  if (!text) {
    result.textContent = "Select some text first.";
    return;
  }

  result.textContent = "Thinking...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        action,
        text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    result.textContent = data.result;

  } catch (error) {
    result.textContent =
      "Something went wrong: " + error.message;
  }

}

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    console.log("Button clicked:", button.dataset.action);
    runAI(button.dataset.action);
  });
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(result.textContent);

  copyButton.textContent = "Copied!";

  setTimeout(() => {
    copyButton.textContent = "Copy result";
  }, 1500);
});

loadSelectedText();
