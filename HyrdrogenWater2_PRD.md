![Wireframe](./assets/landing-page-wireframe-example-long.jpg)

# PRD: Hydrogen Water Landing Page (Railway-Optimized)

## 💡 Purpose
Build a responsive, engaging landing page for **Hydrogen Water**, designed to inform users about the health benefits, and enable voice-based interaction using ElevenLabs' AI widget.

The goal is to deploy this on **Railway** using a minimal Express server, enabling dynamic content (such as AudioWorklet compatibility) while keeping deployment lightweight and cost-efficient.

---

## 🚀 Hosting Plan: Railway

- This app will use an **Express.js server** to serve all frontend assets.
- The server will:
  - Serve `index.html`, `styles.css`, and any additional static assets
  - Serve from the root (or `/public` folder)
  - Listen on `process.env.PORT || 3000` to meet Railway requirements
- Supports ElevenLabs widget and future dynamic modules (like AudioWorklets)

---

## 🎯 Goals

- Educate visitors about Hydrogen Water
- Present product visually and persuasively
- Offer interaction via ElevenLabs AI voice assistant
- Be responsive and easily expandable
- Be deployable from a GitHub repo to Railway in one click

---

## 🧩 Features (Wireframe-Guided)

### Hero Section
- Headline: “Discover the Power of Hydrogen Water”
- Subheadline: 1-line pitch
- Email signup form or call-to-action

### Trusted By (Logos Row)
- Row of brand/client logos to build trust

### Benefits
- 6 circular icons + benefit text
- Examples: “More Energy”, “Reduces Inflammation”, “Hydration Boost”

### About Section
- Left: short brand story paragraph
- Right: image or background art

### How It Works
- Left: embedded video placeholder
- Right: 3–4 bullet steps

### Testimonials
- Quote block w/ image and user name/title

### ElevenLabs Conversational Widget
Place this just before `</body>` in `index.html`:

```html
<elevenlabs-convai agent-id="2zmSDMINq8XUV5WMcmzX"></elevenlabs-convai>
<script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
```

### Footer
- Logo or name, privacy/contact links, copyright

---

## 🎨 Design Guidelines

- Color: Light blue, white, and silver/gray
- Fonts: Inter or Poppins, clean sans-serif
- Layout: Mobile-first, responsive flex/grid
- Style: Modern, light gradients or soft drop shadows

---

## 📦 File Structure

```
/public
  ├── index.html
  ├── styles.css
  ├── audio-concat-processor.js  (optional)
/server.js
/package.json
/PRD.md
/assets/landing-page-wireframe-example-long.jpg
```

---

## 🔗 Deployment Notes

- App should use `npm start`
- Railway auto-detects `PORT` via `process.env.PORT`
- ElevenLabs widget is browser-only and works in Railway’s hosted HTTPS environment

---

## 🧱 Deliverables

- `index.html` with embedded widget + layout
- `styles.css` (or Tailwind)
- `server.js` (Express)
- `package.json`
- `PRD.md` and wireframe image for AI/dev reference
