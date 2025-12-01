// story-section.js
// Simple Web Component module that uses light DOM so existing page CSS (e.g. #section1 h3)
// continues to apply. The component copies any existing child nodes into its internal
// content container and reflects a `title` attribute into the heading.

const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Styles target the custom element so they apply in light DOM */
    story-section {
      display: block;
      margin: 5em;
      padding: 1em;
      color: white;
      box-sizing: border-box;
    }
    story-section .card {
      background: rgba(0,0,0,0.45);
      padding: 1.25rem;
      border-radius: 8px;
      font-family: Georgia, serif;
    }
    story-section .card h3 {
      margin: 0 0 0.5rem 0;
      font-family: Helvetica, sans-serif;
      font-size: 2rem;
      color: #fff;
    }
    story-section .card p { color: #eee; margin: 0; }
  </style>
  <section class="card">
    <h3 id="title">Section Title</h3>
    <div id="content">Section content goes here.</div>
  </section>
`;

export class StorySection extends HTMLElement {
  constructor() {
    super();
    // Capture any pre-existing children so we can reinsert them into the template's content
    this._initialChildren = document.createDocumentFragment();
    while (this.firstChild) {
      this._initialChildren.appendChild(this.firstChild);
    }
  }

  connectedCallback() {
    // Clone the template into the element's light DOM (no shadow root)
    const node = template.content.cloneNode(true);
    this.appendChild(node);

    // If a title attribute is provided, set the heading text
    const title = this.getAttribute('title');
    const titleEl = this.querySelector('#title');
    if (title && titleEl) titleEl.textContent = title;

    // Move captured initial children into the content container
    const contentEl = this.querySelector('#content');
    if (contentEl && this._initialChildren && this._initialChildren.childNodes.length) {
      contentEl.innerHTML = '';
      contentEl.appendChild(this._initialChildren);
    }
  }
}

customElements.define('story-section', StorySection);
