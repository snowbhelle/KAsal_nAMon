# Tacloban Wedding E-Invite

A responsive, four-page, static wedding invitation designed for GitHub Pages. No build step is required.

## Pages

- `index.html` — cinematic invitation / home
- `rsvp.html` — RSVP form and confirmation state
- `details.html` — schedule, dress code, logistics, FAQ
- `story.html` — relationship timeline and photo carousel

## Edit wedding information in one place

Open `assets/js/config.js`. Update:

- bride and groom names
- monogram initials
- wedding date and time
- ceremony/reception times
- venue and city
- RSVP deadline
- map URLs
- coordinator contact
- palette guidance
- schedule
- relationship timeline

Most repeated content is populated from this file automatically.

## Replace photos

The files in `assets/images/` are deliberately lightweight SVG placeholders. You can either:

1. replace each SVG with a real image using the same filename, or
2. change the image paths in `assets/js/config.js` and `story.html`.

Recommended real-photo formats: WebP or optimized JPEG. Aim for roughly 1600–2200 px on the long edge and compress before publishing.

## RSVP backend hookup

The current RSVP is front-end only. Submission data is assembled in JavaScript and logged as a placeholder payload. In `assets/js/main.js`, find the `#rsvp-form` submit handler and replace the placeholder behavior with one of:

- Supabase insert
- Firebase Firestore write
- Google Apps Script endpoint connected to Google Sheets
- Formspree / Basin / another static form endpoint

For a real guest-list validation flow, query the guest record using a secure token or invitation code rather than exposing the full guest list in client-side JavaScript. Populate `allottedGuests` from the validated record and prevent a submitted party size above that allotment.

## Local preview

From this folder, run one of:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages deployment

### Option A — repository root

1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. Commit and push.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose your main branch and `/ (root)`.
7. Save. GitHub will provide the public Pages URL.

All links are relative, so the site works whether Pages is hosted at a custom domain or a repository subpath.

### Option B — custom domain

After GitHub Pages is working, add your custom domain in **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

## Accessibility and performance notes

- keyboard-accessible nav, FAQ, carousel buttons, and form controls
- visible skip link
- reduced-motion support
- semantic page structure
- lazy-loaded story/carousel images
- no front-end framework or heavy animation library
- ambient sound is only a placeholder toggle and is OFF by default

## Final information still to fill

Search the project for `[` to find intentionally unfinished placeholders, including ceremony time, reception time, RSVP deadline, hotel and parking notes, coordinator contact, children policy, gift preference, and the couple's real story copy.

## Watercolor decorations

The front-page SVG botanical trees have been replaced with watercolor PNG artwork in:

- `assets/images/watercolor/hero-frame.png`
- `assets/images/watercolor/hero-frame-mobile.png` — dedicated portrait artwork automatically used at 700px and below
- `assets/images/watercolor/floral-frame.png`
- `assets/images/watercolor/botanical-elements.png`
- `assets/images/watercolor/leaves/leaf-1.png` through `leaf-5.png`

The falling leaves are created in `assets/js/main.js` and styled in `assets/css/styles.css`. They are a fixed, pointer-events-disabled decorative layer, so they continue to drift while the guest scrolls without blocking links or form fields. Their number is automatically reduced on smaller screens, and the animation is disabled when `prefers-reduced-motion` is enabled.

## RSVP -> Google Sheets

The RSVP form is ready to submit to Google Sheets through a Google Apps Script Web App.

Setup files are in:

```text
google-apps-script/
  Code.gs
  README.md
```

After deploying the Apps Script, paste its Web App `/exec` URL into:

```text
assets/js/config.js
```

under:

```javascript
rsvp.googleAppsScriptUrl
```

The form stores a unique submission ID with every response and includes placeholder columns for future guest-list validation (`Party ID` and `Guest List Match`).
