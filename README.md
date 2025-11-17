⭐ SafeBrowse – Real-Time Malicious Website Detection Browser Extension

A lightweight Chrome/Edge extension that protects users from phishing, malware, and unsafe websites using the Google Safe Browsing API.

🚀 Overview

SafeBrowse is a browser security extension designed to analyze websites in real time and warn users about potential threats. It integrates with the Google Safe Browsing API v4 to detect:

Malware

Phishing pages

Unwanted software

Potentially harmful applications

The extension automatically monitors loaded URLs, provides manual URL checks, and displays clear visual alerts—including a full-screen warning page—to ensure safer browsing.

🔒 Key Features

✔ Real-time automatic URL scanning

✔ Manual URL safety checker in popup

✔ Full-screen warning page for unsafe sites

✔ Desktop notifications for dangerous URLs

✔ Browser action badge alerts (!)

✔ History tracking of unsafe sites

✔ Lightweight design with zero performance slowdown

📁 Project Structure
├── manifest.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── warning.html
├── warning.css
├── history.html
├── history.js
└── icons/

🧠 How It Works

When a user visits any webpage, the extension extracts and normalizes the URL.

The URL is sent to the Google Safe Browsing API.

If a threat is detected:

A badge alert appears

A desktop notification is triggered

The user is redirected to a warning screen

The detected URL is added to unsafe history

If the URL is safe, browsing continues normally.

🔧 Installation (Developer Mode)

Download or clone this repository.

Open Chrome/Edge → chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select the project folder.

🧪 Testing the Extension

Use Google’s official unsafe test URLs:

Malware test:

http://testsafebrowsing.appspot.com/s/malware.html


Phishing test:

http://testsafebrowsing.appspot.com/s/phishing.html

📌 API Requirement

This extension requires a Google Safe Browsing API key.
Replace the placeholder in background.js and popup.js with your API key.

🛡️ Privacy

SafeBrowse does not collect personal data or browsing history.
All unsafe URLs are stored locally, only on the user's device.
