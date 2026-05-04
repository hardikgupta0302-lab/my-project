async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    
    if (userInput.value.trim() === '') return;
    
    // Display user message
    const userMessage = userInput.value;
    addMessageToChat(userMessage, 'user');
    userInput.value = '';
    
    try {
        // Send to backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        addMessageToChat(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = message;
    
    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Welcome message
window.addEventListener('load', () => {
    addMessageToChat('Hello! I\'m BuddyBot, your AI health assistant. How can I help you today?', 'bot');
});
