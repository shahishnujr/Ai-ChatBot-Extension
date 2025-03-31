(function () {
    if (window.chatbotInjected) return; // Prevent multiple injections
    window.chatbotInjected = true; // Mark as injected

    let chatbot = document.createElement("div");
    chatbot.id = "chatbot-widget";
    chatbot.style.display = "none"; 
    chatbot.innerHTML = `
        <style>
            /* Chatbot Main Container */
            #chatbot-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 450px;
                background: white;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                font-family: Arial, sans-serif;
                z-index: 100000;
                overflow: hidden;
                border: 1px solid #ddd;
                transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            }

            /* Hidden State (For Smooth Toggle) */
            #chatbot-widget.hidden {
                transform: scale(0.9);
                opacity: 0;
                pointer-events: none;
            }

            /* Header Styling */
            #chatbot-header {
                background: #007bff;
                color: white;
                padding: 14px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
            }
            #chatbot-header::before {
                content: "💬";
                margin-right: 8px;
            }

            /* Chatbot Messages */
            #chatbot-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                font-size: 14px;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: black;
                scroll-behavior: smooth;
            }

            /* User & Bot Messages */
            .chatbot-message {
                padding: 10px;
                border-radius: 8px;
                max-width: 80%;
                word-wrap: break-word;
                font-size: 14px;
            }
            .user-message {
                align-self: flex-end;
                background: #007bff;
                color: white;
                border-radius: 15px 15px 0px 15px;
            }
            .bot-message {
                align-self: flex-start;
                background: #e9ecef;
                color: black;
                border-radius: 15px 15px 15px 0px;
            }

            /* Input Field */
            #chatbot-input {
                width: 88%;
                padding: 12px;
                margin: 10px auto;
                border: 1px solid #ccc;
                border-radius: 20px;
                display: block;
                font-size: 14px;
                box-sizing: border-box;
                outline: none;
                transition: border 0.2s ease-in-out;
                background: white;
                color: black;
            }
            #chatbot-input:focus {
                border: 2px solid #007bff;
            }

            /* Send Button */
            #chatbot-send {
                width: 92%;
                padding: 12px;
                background: #007bff;
                color: white;
                border: none;
                margin: 5px auto 15px auto;
                cursor: pointer;
                border-radius: 20px;
                display: block;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                transition: background 0.3s ease-in-out;
            }
            #chatbot-send:hover {
                background: #0056b3;
            }
        </style>

        <div id="chatbot-header">AI Chatbot</div>
        <div id="chatbot-body">Ask me about this website!</div>
        <input id="chatbot-input" type="text" placeholder="Type your question...">
        <button id="chatbot-send">Ask</button>
    `;

    document.body.appendChild(chatbot);

    const chatbotBody = document.getElementById("chatbot-body");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");

    //  Function to show/hide chatbot smoothly
    window.toggleChatbot = function () {
        if (chatbot.style.display === "none") {
            chatbot.style.display = "flex";
            setTimeout(() => chatbot.classList.remove("hidden"), 10);
        } else {
            chatbot.classList.add("hidden");
            setTimeout(() => chatbot.style.display = "none", 300);
        }
    };

    // Auto-scroll to latest message
    function scrollToBottom() {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    // Function to send message
    async function sendMessage() {
        let question = chatbotInput.value.trim();
        if (!question) return;

        let website = window.location.href;
        let content = document.body.innerText.slice(0, 5000);

        chatbotBody.innerHTML += `<p class="chatbot-message user-message"><strong>You:</strong> ${question}</p>`;
        scrollToBottom();

        try {
            let response = await fetch("http://localhost:5000/api/chat", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, website, content })
            });

            let data = await response.json();
            chatbotBody.innerHTML += `<p class="chatbot-message bot-message"><strong>Bot:</strong> ${data.answer || "Sorry, I couldn't understand that."}</p>`;
        } catch (error) {
            chatbotBody.innerHTML += `<p class="chatbot-message bot-message"><strong>Bot:</strong> Error connecting to the server.</p>`;
        }

        chatbotInput.value = "";
        scrollToBottom();
    }

    // Allow Enter Key to Send Message
    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Click Button to Send Message
    chatbotSend.addEventListener("click", sendMessage);
})();
