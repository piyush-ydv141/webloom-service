# WebLoom Service Provider - Official Website

A fully functional, animated, full-stack website built for **WebLoom**, a web development agency empowering Indian small businesses to scale online.

## Features
* **Modern UI/UX:** Clean, responsive, and animated frontend designed to convert clients.
* **Full-Stack Form Integration:** Captures client needs, budget, and project details, sending them directly via an Express backend to `official.h2ocean@gmail.com`.
* **LoomBot AI Assistant:** A frontend chatbot to greet users and seamlessly redirect complex queries to WhatsApp or Email.
* **Direct Connect:** Quick access floating buttons for WhatsApp (+91 9506603393).

## Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Email Service:** Nodemailer

## Local Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/webloom-service.git
   cd webloom-service
   \`\`\`

2. Install backend dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Gmail App Password to allow Nodemailer to send emails:
   \`\`\`env
   EMAIL_PASSWORD=your_16_digit_gmail_app_password
   PORT=3000
   \`\`\`
   *(Note: Never push your `.env` file to GitHub. It is excluded via `.gitignore`)*

4. Run the application:
   \`\`\`bash
   npm start
   \`\`\`

5. Open your browser and visit `http://localhost:3000`.