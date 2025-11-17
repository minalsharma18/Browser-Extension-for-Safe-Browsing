// ✅ Google Safe Browsing API key
const API_KEY = "AIzaSyAPpMw_IxdVnj9OBfp9TQ3ckqvnUOAh258";

// ✅ Step 1: Normalize URL correctly
function normalizeUrl(url) {
    try {
        // Add protocol only if missing — use http:// by default (since unsafe sites often use it)
        if (!/^https?:\/\//i.test(url)) {
            url = "http://" + url;
        }

        // Clean up the URL
        const parsed = new URL(url);
        parsed.hash = ""; // remove fragments (#section)
        return parsed.href;
    } catch (e) {
        console.error("❌ Invalid URL:", url);
        return null;
    }
}

// ✅ Step 2: Main URL safety checker
async function checkUrlSafety(url) {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
        console.warn("⚠️ Skipping invalid URL:", url);
        return;
    }

    console.log("🧾 Checking:", normalizedUrl);

    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
    const requestBody = {
        client: {
            clientId: "safe-browsing-extension",
            clientVersion: "1.0.1"
        },
        threatInfo: {
            threatTypes: [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: normalizedUrl }]
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("🔍 Safe Browsing API Response:", data);

        // ✅ Step 3: Handle unsafe sites
        if (data && data.matches && data.matches.length > 0) {
            console.warn("🚨 Unsafe site detected:", normalizedUrl);

            // Save to unsafe history
            chrome.storage.local.get({ unsafeHistory: [] }, (result) => {
                const history = result.unsafeHistory;
                history.push({ url: normalizedUrl, date: new Date().toLocaleString() });
                chrome.storage.local.set({ unsafeHistory: history });
            });

            // Show badge warning
            chrome.action.setBadgeText({ text: "!" });
            chrome.action.setBadgeBackgroundColor({ color: "red" });

            // Show system notification
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icons/icon128.png",
                title: "Unsafe Site Detected!",
                message: `⚠️ The site may be unsafe:\n${normalizedUrl}`,
                priority: 2
            });

            // Open warning page
            chrome.tabs.create({
                url: chrome.runtime.getURL("warning.html") + "?site=" + encodeURIComponent(normalizedUrl)
            });

        } else {
            // ✅ Safe or no match
            console.log("✅ Safe site:", normalizedUrl);
            chrome.action.setBadgeText({ text: "" });
        }

    } catch (error) {
        console.error("❌ Error checking Safe Browsing API:", error);
    }
}

// ✅ Step 4: Automatically check URLs when tabs load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
        checkUrlSafety(tab.url);
    }
});

// ✅ Step 5: Listen for manual URL checks (from popup.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkManualUrl" && message.url) {
        checkUrlSafety(message.url);
        sendResponse({ status: "checking" });
    }
});
