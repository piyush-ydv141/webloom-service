// --- LoomBot Logic ---
let chatActive = false;
const chatbotContainer = document.getElementById('chatbot');
const chatToggleIcon = document.getElementById('chatToggleIcon');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

let messageCount = 0;

// Toggle chatbot open/close
function toggleChat() {
    chatActive = !chatActive;
    if (chatActive) {
        chatbotContainer.classList.add('active');
        chatToggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    } else {
        chatbotContainer.classList.remove('active');
        chatToggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
}

// Allow pressing 'Enter' to send a message
function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Handle sending and receiving messages
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add User Message to Chat
    appendMessage(text, 'user');
    chatInput.value = '';

    // 2. Bot Response Logic
    setTimeout(() => {
        messageCount++;
        let botReply = "";

        const lowerText = text.toLowerCase();

        // Basic keyword detection for attraction
        if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("budget")) {
            botReply = "Our pricing is tailored specifically for Indian small business budgets! It's highly affordable based on your exact needs.";
        } else if (lowerText.includes("service") || lowerText.includes("build") || lowerText.includes("make")) {
            botReply = "We specialize in Full-stack development, E-commerce platforms, and beautiful UI/UX designed to scale your business.";
        } else {
            if (messageCount === 1) {
                botReply = "That sounds exciting! WebLoom is all about taking physical businesses and giving them a massive online presence.";
            } else {
                botReply = "I'm just a simple greeting assistant! 🤖 For custom quotes or technical discussions, please connect with our human experts directly on WhatsApp (+91 9506603393) or via email (official.h2ocean@gmail.com).";
            }
        }
        
        appendMessage(botReply, 'bot');
    }, 800);
}

// Helper function to render message bubbles
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    
    // Auto-scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- Form Submission Logic (Web3Forms) ---
document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const statusText = document.getElementById('formStatus');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.innerText = 'Sending Details...';
    submitBtn.disabled = true;
    statusText.innerText = '';

    const formData = new FormData(e.target);
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY"); // Replace with your Web3Forms Key

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            statusText.style.color = "green";
            statusText.innerText = "Success! Project details sent to official.h2ocean@gmail.com";
            e.target.reset();
        } else {
            throw new Error("Web3Forms submission failed");
        }
    } catch (error) {
        statusText.style.color = "red";
        statusText.innerText = "Submission failed. Please contact us via WhatsApp (+91 9506603393).";
    } finally {
        submitBtn.innerText = 'Submit Project Details';
        submitBtn.disabled = false;
    }
});