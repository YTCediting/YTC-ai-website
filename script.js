// Enhanced AI Assistant with Memory and Image Support
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    
    // AI Configuration
    const AI_NAME = "YTC AI";
    const USER_NAME = "You";
    const TYPING_DELAY = 800; // ms
    
    // Enhanced Responses Database
    const smartResponses = {
        greetings: {
            patterns: ["hi", "hello", "hey", "namaste"],
            responses: [
                "Yo bhai! Kaise ho? 😎", 
                "Namaste dost! Kya chal raha hai?",
                "Hey there! How can I help?"
            ]
        },
        feelings: {
            patterns: ["how are you", "kaisa hai", "kya haal hai"],
            responses: [
                "Mai to mast hoon! Tera sunao?",
                "Zindagi jhandwa fir bhi ghamandwa! 😂",
                "Badhiya bhai! Tu bata?"
            ]
        },
        images: {
            patterns: ["image", "photo", "picture", "tasveer"],
            responses: [
                "Here's an image for you:",
                "I found this:",
                "Check this out:"
            ]
        },
        default: [
            "Bhai, thoda clear pucho!",
            "Samjha nahi, phir se try karo",
            "Ye mujhe seekhna padega"
        ]
    };

    // Chat History
    let conversationHistory = [];

    // Event Listeners
    sendBtn.addEventListener('click', processMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') processMessage();
    });

    // Main Processing Function
    async function processMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show typing indicator
        showTyping();
        
        // Process after delay to simulate thinking
        setTimeout(async () => {
            hideTyping();
            
            // Check if question is repeated
            const previousResponse = checkHistory(message);
            if (previousResponse) {
                addMessage(previousResponse, 'ai');
                return;
            }
            
            // Get AI response
            const response = await generateResponse(message);
            
            // Add to history
            conversationHistory.push({
                question: message,
                answer: response
            });
            
            // Display response
            addMessage(response, 'ai');
        }, TYPING_DELAY);
    }

    // Message Display Function
    function addMessage(content, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        
        if (typeof content === 'object' && content.type === 'image') {
            msgDiv.innerHTML = `
                <strong>${AI_NAME}:</strong> ${content.text}
                <img src="${content.url}" alt="${content.prompt}" class="ai-image">
            `;
        } else {
            const prefix = sender === 'user' ? USER_NAME : AI_NAME;
            msgDiv.innerHTML = `<strong>${prefix}:</strong> ${content}`;
        }
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Typing Indicators
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <strong>${AI_NAME}:</strong> 
            <span class="typing">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </span>
        `;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    // Response Generation
    async function generateResponse(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        // Check for image requests
        if (containsAny(lowerPrompt, smartResponses.images.patterns)) {
            const imagePrompt = prompt.replace(/image|photo|picture|tasveer/gi, '').trim();
            if (imagePrompt) {
                const imageResponse = await generateImage(imagePrompt);
                return {
                    type: 'image',
                    text: getRandomResponse(smartResponses.images.responses),
                    url: `https://source.unsplash.com/random/400x300/?${encodeURIComponent(imagePrompt)}`,
                    prompt: imagePrompt
                };
            }
        }
        
        // Check other response types
        for (const [category, data] of Object.entries(smartResponses)) {
            if (category !== 'default' && containsAny(lowerPrompt, data.patterns)) {
                return getRandomResponse(data.responses);
            }
        }
        
        // Default response
        return getRandomResponse(smartResponses.default);
    }

    // Helper Functions
    function checkHistory(question) {
        return conversationHistory.find(item => 
            item.question.toLowerCase() === question.toLowerCase()
        )?.answer;
    }

    function containsAny(str, substrings) {
        return substrings.some(sub => str.includes(sub));
    }

    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Image Generation (Mock)
    async function generateImage(prompt) {
        // In a real implementation, this would call an API
        return {
            type: 'image',
            text: getRandomResponse(smartResponses.images.responses),
            url: `https://source.unsplash.com/random/400x300/?${encodeURIComponent(prompt)}`,
            prompt: prompt
        };
    }
});
