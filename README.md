# Study Runner – Sample Rating Portal

A single-page website that:

1. **Accepts a study URL** (e.g. `https://study-runner.vercel.app/sample-rating?participantId=...`)
2. **Extracts the `participantId`** automatically from the URL query parameters
3. **Displays a styled Thank-You page** replicating the look of the original study-runner submission confirmation, including all available metadata

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page with the URL input box |
| `thankyou.html` | Thank-you / confirmation page |
| `style.css` | Shared styles (dark glassmorphism theme) |
| `app.js` | Landing page logic (URL parsing + redirect) |
| `thankyou.js` | Thank-you page logic (populate ID, meta, copy button) |

## Usage

Paste a URL like:
```
https://study-runner.vercel.app/sample-rating?MANUAL=true&PREASSIGNED=true&studyId=sample-rating__20260623T153647Z_78b0a47d&participantId=fa7b7a90-dd1b-4081-a650-3f78bcc2f438&TASK_TYPE=SAMPLE_RATING&PAGE=80&PAGE_SIZE=60&submissionId=1fa2a0e1-fc07-4ea1-a2a4-68955e9e3291&step=4
```

The site will extract `fa7b7a90-dd1b-4081-a650-3f78bcc2f438` and show it on the confirmation page along with `studyId`, `submissionId`, `TASK_TYPE`, and other metadata.

## Deploy

This is a pure HTML/CSS/JS project with no build step — deploy to any static host (GitHub Pages, Vercel, Netlify).
