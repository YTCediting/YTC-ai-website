// Free APIs
const FREE_AI_API = "https://api-inference.huggingface.co/models/gpt2";
const RUNWAY_API = "https://api.runwayml.com/v1/text-to-image"; // Mock - use actual if available

// Chat memory
let conversationHistory = [];

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    document.getElementById('userInput').value = '';
    showTyping();

    // Check if question is repeated
    const repeatedQ = conversationHistory.find(item => item.question === userInput);
    if (repeatedQ) {
        addMessage(repeatedQ.answer, 'ai');
        return;
    }

    // Get AI response
    let response;
    if (userInput.toLowerCase().includes('image') || 
        userInput.toLowerCase().includes('photo') || 
        userInput.toLowerCase().includes('picture')) {
        response = await generateImage(userInput);
    } else {
        response = await getAIResponse(userInput);
    }

    // Add to history
    conversationHistory.push({
        question: userInput,
        answer: response
    });

    hideTyping();
    addMessage(response, 'ai');
}

function addMessage(content, sender) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    
    if (typeof content === 'object' && content.type === 'image') {
        msgDiv.innerHTML = `
            <strong>YTC AI:</strong> Here's your image:
            <img src="${content.url}" alt="${content.prompt}" class="ai-image">
        `;
    } else {
        msgDiv.innerHTML = sender === 'user' 
            ? `<strong>You:</strong> ${content}`
            : `<strong>YTC AI:</strong> ${content}`;
    }
    
    chatBox.appendChild
