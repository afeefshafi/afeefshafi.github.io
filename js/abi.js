
/* =========================================
   ABI AI CHATBOT - REAL AI INTEGRATION
   Gemini API + Cloudflare Worker
   Languages: English, Tamil, Sinhala
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const API_URL =
        "https://abi-ai-backend.afeefshafii.workers.dev/";

    const launcher = document.getElementById("abiLauncher");
    const windowBox = document.getElementById("abiWindow");
    const closeBtn = document.getElementById("abiClose");

    const messages = document.getElementById("abiMessages");
    const form = document.getElementById("abiForm");
    const input = document.getElementById("abiInput");
    const sendBtn = document.getElementById("abiSend");

    const welcomeTitle = document.getElementById("abiWelcomeTitle");
    const welcomeText = document.getElementById("abiWelcomeText");
    const suggestions = document.getElementById("abiSuggestions");

    if (!launcher || !windowBox || !form) {
        console.error("Abi chatbot HTML elements not found.");
        return;
    }

    let currentLanguage = "en";
    let isSending = false;

    // Stores previous user and AI conversations
    let conversationHistory = [];

    /* LANGUAGE CONTENT */

    const translations = {

        en: {
            title: "Hi! I'm Abi 👋",
            welcome: "Your AI portfolio assistant. Ask me anything about Afeef.",
            placeholder: "Ask me anything...",
            error: "Sorry, something went wrong. Please try again.",
            suggestions: [
                "About Afeef",
                "Technical Skills",
                "Projects",
                "Contact"
            ],
            questions: [
                "Tell me about Afeef",
                "What are Afeef's technical skills?",
                "Tell me about Afeef's projects",
                "How can I contact Afeef?"
            ]
        },

        ta: {
            title: "வணக்கம்! நான் Abi 👋",
            welcome: "நான் Afeef-இன் AI Portfolio Assistant. அவரைப் பற்றி என்னிடம் கேளுங்கள்.",
            placeholder: "உங்கள் கேள்வியை கேளுங்கள்...",
            error: "மன்னிக்கவும், ஏதோ தவறு ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்.",
            suggestions: [
                "Afeef பற்றி",
                "தொழில்நுட்ப திறன்கள்",
                "Projects",
                "தொடர்பு"
            ],
            questions: [
                "Afeef பற்றி சொல்லுங்கள்",
                "Afeef-இன் technical skills என்ன?",
                "Afeef-இன் projects பற்றி சொல்லுங்கள்",
                "Afeef-ஐ எப்படி தொடர்பு கொள்வது?"
            ]
        },

        si: {
            title: "ආයුබෝවන්! මම Abi 👋",
            welcome: "මම Afeef ගේ AI Portfolio Assistant. ඔහු ගැන ඕනෑම දෙයක් මගෙන් අසන්න.",
            placeholder: "ඔබේ ප්‍රශ්නය අසන්න...",
            error: "සමාවන්න, දෝෂයක් සිදුවී ඇත. නැවත උත්සාහ කරන්න.",
            suggestions: [
                "Afeef ගැන",
                "තාක්ෂණික කුසලතා",
                "ව්‍යාපෘති",
                "සම්බන්ධ වන්න"
            ],
            questions: [
                "Afeef ගැන කියන්න",
                "Afeef ගේ තාක්ෂණික කුසලතා මොනවාද?",
                "Afeef ගේ projects ගැන කියන්න",
                "Afeef සම්බන්ධ කරගන්නේ කෙසේද?"
            ]
        }

    };

    /* OPEN CHAT */

    launcher.addEventListener("click", () => {

        windowBox.classList.add("abi-active");
        launcher.style.display = "none";

        input.focus();

    });

    /* CLOSE CHAT */

    closeBtn.addEventListener("click", () => {

        windowBox.classList.remove("abi-active");
        launcher.style.display = "flex";

    });

    /* ADD MESSAGE */

    function addMessage(text, sender) {

        const message = document.createElement("div");

        message.className = `abi-message ${sender}`;

        if (sender === "bot") {

            const avatar = document.createElement("img");

            avatar.src = "assets/images/abi.jpg";
            avatar.alt = "Abi";
            avatar.className = "abi-message-avatar";

            message.appendChild(avatar);

        }

        const content = document.createElement("div");

        content.className = "abi-message-content";
        content.textContent = text;

        message.appendChild(content);

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;

    }

    /* TYPING INDICATOR */

    function showTyping() {

        const typing = document.createElement("div");

        typing.className = "abi-message bot";
        typing.id = "abiTyping";

        const avatar = document.createElement("img");

        avatar.src = "assets/images/abi.jpg";
        avatar.alt = "Abi";
        avatar.className = "abi-message-avatar";

        const content = document.createElement("div");

        content.className = "abi-message-content";

        const dots = document.createElement("div");

        dots.className = "abi-typing";

        for (let i = 0; i < 3; i++) {

            dots.appendChild(document.createElement("span"));

        }

        content.appendChild(dots);

        typing.appendChild(avatar);
        typing.appendChild(content);

        messages.appendChild(typing);

        messages.scrollTop = messages.scrollHeight;

        return typing;

    }

    /* LANGUAGE SWITCHING */

    document.querySelectorAll(".abi-language button").forEach(button => {

        button.addEventListener("click", () => {

            const selectedLanguage = button.dataset.lang;

            if (!translations[selectedLanguage]) return;

            currentLanguage = selectedLanguage;

            document.querySelectorAll(".abi-language button")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const language = translations[currentLanguage];

            welcomeTitle.textContent = language.title;
            welcomeText.textContent = language.welcome;
            input.placeholder = language.placeholder;

            updateSuggestions();

        });

    });

    /* UPDATE SUGGESTIONS */

    function updateSuggestions() {

        const language = translations[currentLanguage];

        suggestions.innerHTML = "";

        language.suggestions.forEach((label, index) => {

            const button = document.createElement("button");

            button.textContent = label;
            button.type = "button";

            button.addEventListener("click", () => {

                sendMessage(language.questions[index]);

            });

            suggestions.appendChild(button);

        });

    }

    /* REAL AI MESSAGE */

    async function sendMessage(text) {

        const userMessage = text.trim();

        if (!userMessage || isSending) return;

        if (userMessage.length > 2000) {

            addMessage(
                "Please keep your message under 2000 characters.",
                "bot"
            );

            return;

        }

        isSending = true;
        sendBtn.disabled = true;

        addMessage(userMessage, "user");

        suggestions.style.display = "none";

        input.value = "";

        const typing = showTyping();

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    message: userMessage,

                    history: conversationHistory.slice(-10)

                })

            });

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.error || "AI service unavailable"
                );

            }

            if (!data.reply || typeof data.reply !== "string") {

                throw new Error("Invalid AI response");

            }

            // Save both messages for future conversation context
            conversationHistory.push(
                {
                    role: "user",
                    text: userMessage
                },
                {
                    role: "model",
                    text: data.reply
                }
            );

            // Keep only the latest 10 conversation messages
            conversationHistory =
                conversationHistory.slice(-10);

            typing.remove();

            addMessage(data.reply, "bot");

        } catch (error) {

            console.error("Abi AI Error:", error);

            typing.remove();

            addMessage(
                translations[currentLanguage].error,
                "bot"
            );

        } finally {

            isSending = false;

            sendBtn.disabled = false;

            input.focus();

        }

    }

    /* FORM SUBMISSION */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        sendMessage(input.value);

    });

    /* INITIALIZE */

    updateSuggestions();

    console.log("Abi AI Chatbot initialized successfully!");

});
