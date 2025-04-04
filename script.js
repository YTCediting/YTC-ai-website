// Memory for repeated questions
const memory = {};

// Google Custom Search API (Replace with your API key)
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";
const CX = "YOUR_CUSTOM_SEARCH_ENGINE_ID";

async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chatBox");
    
    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user-message";
    userMsg.innerHTML = `<strong>Tum:</strong> ${userInput}`;
    chatBox.appendChild(userMsg);

    // Clear input
    document.getElementById("userInput").value = "";

    // Check memory first
    if (memory[userInput]) {
        addAiResponse(memory[userInput]);
        return;
    }

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message ai-message";
    typingIndicator.innerHTML = "<i>YTC AI soch raha hai...</i>";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Decide response type
    let response;
    if (userInput.toLowerCase().includes("image") || userInput.toLowerCase().includes("photo")) {
        response = await getGoogleImage(userInput);
    } else {
        response = await getSmartResponse(userInput);
    }

    // Remove typing indicator
    chatBox.removeChild(typingIndicator);

    // Add AI response
    addAiResponse(response);
    
    // Store in memory
    memory[userInput] = response;
}

function addAiResponse(response) {
    const chatBox = document.getElementById("chatBox");
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai-message";
    
    if (typeof response === "string") {
        aiMsg.innerHTML = `<strong>YTC AI:</strong> ${response}`;
    } else {
        // For image responses
        aiMsg.innerHTML = `<strong>YTC AI:</strong> Here's what I found:`;
        const img = document.createElement("img");
        img.src = response.url;
        img.alt = response.title;
        img.className = "ai-image";
        aiMsg.appendChild(img);
    }
    
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getSmartResponse(query) {
    // Simple AI responses
    const simpleResponses = {
        "hi": "Yo bhai! Kaise ho? 😎",
        "kaisa hai": "Mai to mast hoon! Tera bata?",
        "kya haal hai": "Zindagi jhandwa fir bhi ghamandwa! 😂",
        "default": "Samjha nahi bhai, thoda clear pucho!"
    };

    // Check for simple responses first
    query = query.toLowerCase();
    for (const [key, value] of Object.entries(simpleResponses)) {
        if (query.includes(key)) return value;
    }

    // For other questions, use a mock "smart" response
    return `Bhai, "${query}" ka jawab mujhe pata nahi. Google se poochta hoon...`;
}

async function getGoogleImage(query) {
    try {
        // Remove "image" from query
        const searchQuery = query.replace(/image|photo|picture/gi, "").trim();
        
        // Mock response (replace with actual API call)
        return {
            url: "https://via.placeholder.com/400x300?text=YTC+AI+Image",
            title: searchQuery
        };
        
        /* Actual API code (uncomment when you have API keys)
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}&cx=${CX}&searchType=image`
        );
        const data = await response.json();
        return {
            url: data.items[0].link,
            title: data.items[0].title
        };
        */
    } catch (error) {
        return "Bhai, image nahi mili. Kuch aur poocho!";
    }
}
