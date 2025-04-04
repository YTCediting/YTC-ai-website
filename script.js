// Simple AI Responses (No API needed)
const responses = {
    english: {
        "hi": "Hey bro! What's up? 😎",
        "how are you": "I'm lit like YTC edits! 🔥",
        "default": "Sorry, I'm still learning!"
    },
    hindi: {
        "नमस्ते": "अरे भाई! कैसे हो? 😊",
        "क्या हाल है": "मस्ती कर रहा हूँ यार!",
        "default": "मुझे अभी सीखना बाकी है!"
    },
    hinglish: {
        "hi bhai": "Arre yaar! Kaise ho? 😁",
        "kya chal raha hai": "Bas, YTC ke edits dekh raha tha! 🔥",
        "default": "Abhi thoda confused hoon!"
    }
};

function detectLanguage(text) {
    if (/[\u0900-\u097F]/.test(text)) return "hindi";
    if (text.includes("hai") || text.includes("ho")) return "hinglish";
    return "english";
}

function getAIResponse(text) {
    const lang = detectLanguage(text);
    const langResponses = responses[lang];
    
    text = text.toLowerCase();
    for (const [key, value] of Object.entries(langResponses)) {
        if (text.includes(key)) return value;
    }
    return langResponses["default"];
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p class="user-message"><strong>Tum:</strong> ${userInput}</p>`;
    
    // Simulate AI thinking
    setTimeout(() => {
        const aiResponse = getAIResponse(userInput);
        chatBox.innerHTML += `<p class="ai-message"><strong>YTC AI:</strong> ${aiResponse}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);

    document.getElementById("userInput").value = "";
}
