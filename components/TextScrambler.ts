"use client";

class TextScrambler {
  el: HTMLElement;
  chars: string;
  minStart: number;
  maxStart: number;
  minEnd: number;
  maxEnd: number;
  frame: number;
  queue: { from: string; to: string; start: number; end: number; char: string }[];
  frameRequest: number | null;

  constructor(element: HTMLElement, options = {}) {
    this.el = element;
    this.chars = options.chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.minStart = options.minStart || 0;
    this.maxStart = options.maxStart || 20;
    this.minEnd = options.minEnd || 20;
    this.maxEnd = options.maxEnd || 40;
    this.frame = 0;
    this.queue = [];
    this.frameRequest = null;
  }

  scramble(finalText: string) {
    // Save the original text from a data attribute if set; otherwise, use the current text.
    const originalText = this.el.getAttribute("data-original") || this.el.textContent || "";
    this.el.setAttribute("data-original", originalText);
    const length = Math.max(originalText.length, finalText.length);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = originalText[i] || "";
      const to = finalText[i] || "";
      const start = Math.floor(Math.random() * (this.maxStart - this.minStart)) + this.minStart;
      const end = start + Math.floor(Math.random() * (this.maxEnd - this.minEnd)) + this.minEnd;
      this.queue.push({ from, to, start, end, char: "" });
    }

    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
    this.frame = 0;
    this.update();
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        // Update the random character with a 28% chance each frame.
        if (!char || Math.random() < 0.28) {
          this.queue[i].char = this.randomChar();
        }
        output += this.queue[i].char;
      } else {
        output += from;
      }
    }

    this.el.textContent = output;

    if (complete < this.queue.length) {
      this.frameRequest = requestAnimationFrame(() => {
        this.frame++;
        this.update();
      });
    } else {
      // Force the final text to ensure exact match.
      this.el.textContent = this.queue.map(item => item.to).join("");
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
  
  export default TextScrambler;