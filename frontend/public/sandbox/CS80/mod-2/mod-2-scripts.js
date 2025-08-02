// mod-2-scripts.js

let lastScroll = window.scrollY;
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll < lastScroll) {
    footer.classList.add("visible");
  } else {
    footer.classList.remove("visible");
  }

  lastScroll = currentScroll;
});

function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
}

function closePreviewModal() {
  const modal = document.getElementById("previewModal");
  const iframe = document.getElementById("previewFrame");
  iframe.src = "";
  modal.classList.remove("active");
}
// Load readme section dynamically
fetch("mod2-readme.html")
  .then((response) => response.text())
  .then((html) => {
    const container = document.getElementById("readme-container");
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn("readme-container not found in DOM");
    }
  })
  .catch((err) => {
    console.error("Failed to load mod2-readme.html", err);
  });

let isPreviewOpen = false;

function togglePreview() {
  const button = document.getElementById("previewToggleBtn");
  const main = document.getElementById("mainContent");
  const readme = document.getElementById("readme-container");

  if (isPreviewOpen) {
    // CLOSE PREVIEW: Remove shadowRoot, show readme
    if (main.shadowRoot) {
      // Completely remove shadow root by replacing <main> element
      const parent = main.parentNode;
      const newMain = main.cloneNode(false);
      newMain.id = "mainContent";
      parent.replaceChild(newMain, main);
    }

    if (readme) readme.style.display = "block";

    isPreviewOpen = false;
    button.textContent = "Open Assignment Preview";
  } else {
    // OPEN PREVIEW: Add shadow DOM, hide readme
    if (readme) readme.style.display = "none";

    const shadowRoot = main.attachShadow({ mode: "open" });

    fetch("mod-2-preview.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load preview");
        }
        return response.text();
      })
      .then((html) => {
        shadowRoot.innerHTML = `
          <style>
            :host {
              all: initial;
              display: block;
              font-family: Arial, sans-serif;
            }
            * {
              box-sizing: border-box;
            }
            body, html {
              all: unset;
            }
          </style>
          ${html}
        `;

        isPreviewOpen = true;
        button.textContent = "Close Assignment Preview";
      })
      .catch((error) => {
        console.error(error);
        alert("Could not load assignment preview.");
      });
  }
}
