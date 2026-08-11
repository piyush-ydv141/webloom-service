// --- LoomBot Logic ---
let chatActive = false;
const chatbotContainer = document.getElementById('chatbot');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
let messageCount = 0;

// Toggle chatbot open/close
function toggleChat() {
    chatActive = !chatActive;
    if (chatActive) {
        chatbotContainer.classList.add('active');
        chatInput.focus();
    } else {
        chatbotContainer.classList.remove('active');
    }
}

// Allow pressing 'Enter' to send a message
function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Handle Quick Chip Replies
function sendQuickReply(option) {
    if (option === 'Pricing') {
        appendMessage('Tell me about your pricing plans.', 'user');
        respondToBot('price');
    } else if (option === 'Services') {
        appendMessage('What services do you offer?', 'user');
        respondToBot('service');
    } else if (option === 'Contact') {
        appendMessage('How can I contact you?', 'user');
        respondToBot('contact');
    }
}

// Handle sending user input
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatInput.value = '';
    respondToBot(text.toLowerCase());
}

// LoomBot Auto Response Generator
function respondToBot(input) {
    setTimeout(() => {
        messageCount++;
        let botReply = "";

        if (input.includes("price") || input.includes("cost") || input.includes("plan")) {
            botReply = "Our web plans start at just ₹4,999! We offer Starter, Business Scale, and Enterprise packages tailored for Indian businesses.";
        } else if (input.includes("service") || input.includes("build") || input.includes("make")) {
            botReply = "We build E-commerce stores, Hotel/Restaurant sites, Portfolios, and Custom Web Apps with modern UI/UX.";
        } else if (input.includes("contact") || input.includes("phone") || input.includes("email")) {
            botReply = "You can instantly message us on WhatsApp (+91 9506603393) or email official.h2ocean@gmail.com!";
        } else {
            if (messageCount === 1) {
                botReply = "That's great! WebLoom specializes in taking local businesses online and scaling them rapidly.";
            } else {
                botReply = "I am a greeting assistant! 🤖 For custom quotes, click WhatsApp (+91 9506603393) or email official.h2ocean@gmail.com to chat with our team directly.";
            }
        }
        
        appendMessage(botReply, 'bot');
    }, 700);
}

// Helper function to render message bubbles
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    
    // Auto-scroll to bottom
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
    
    // Web3Forms Access Key
    formData.append("access_key", "ca1bb421-fde3-4c74-89f7-aa2974bcc833");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            statusText.style.color = "green";
            statusText.innerText = "Success! Project details sent to official.h2ocean@gmail.com";
            e.target.reset();
        } else {
            throw new Error(result.message || "Web3Forms submission failed");
        }
    } catch (error) {
        statusText.style.color = "red";
        statusText.innerText = "Submission failed. Please contact us via WhatsApp (+91 9506603393).";
    } finally {
        submitBtn.innerText = 'Submit Project Details';
        submitBtn.disabled = false;
    }
});
