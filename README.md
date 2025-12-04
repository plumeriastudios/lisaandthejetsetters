# Lisa and the Jet Setters

A travel blog showcasing adventures in Belize, Aruba, and the Dominican Republic.

## How to Launch the Website Locally

This is a static website (HTML, CSS, and JavaScript). To view it locally, you need to run a simple web server. Here are a few easy options:

### Option 1: Using Python (Recommended)

If you have Python installed, open a terminal in the project folder and run:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: **http://localhost:8000**

### Option 2: Using Node.js

If you have Node.js installed, you can use `npx` to run a server without installing anything:

```bash
npx serve
```

Or install `http-server` globally and run it:

```bash
npm install -g http-server
http-server
```

Then open your browser and go to the URL shown in the terminal (usually **http://localhost:8080**).

### Option 3: Using VS Code Live Server Extension

1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Select **"Open with Live Server"**
4. Your browser will open automatically with the website

### Option 4: Open Directly in Browser

For quick previewing, you can simply double-click `index.html` to open it in your browser. Note: Some features may not work correctly without a web server.

## Project Structure

- `index.html` - Home page
- `aruba.html` - Aruba travel guide
- `belize.html` - Belize travel guide
- `dominican-republic.html` - Dominican Republic travel guide
- `survey.html` - Visitor survey
- `styles.css` - Main stylesheet
- `script.js` - JavaScript for carousel, lightbox, and survey
- `scripts/` - Build scripts for image processing
