document.getElementById("toggleChatbot").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleChatbot
        });
    });
});

function toggleChatbot() {
    let chatbot = document.getElementById("chatbot-widget");
    if (chatbot) {
        chatbot.style.display = chatbot.style.display === "none" ? "flex" : "none";
    } else {
        let script = document.createElement("script");
        script.src = chrome.runtime.getURL("content.js");
        document.body.appendChild(script);
    }
}
