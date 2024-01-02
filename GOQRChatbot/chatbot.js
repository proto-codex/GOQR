// DOM elements
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

// Variables
let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Function to create a chat <li> element with a given message and className
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">Qr_Code_Scanner</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

// Function to generate a response based on user messages
const generateResponse = (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");

    // Custom logic for generating responses based on user messages
    let response = "";
    switch (userMessage.toLowerCase()) {
        case "hello":
        case "hi":
            response = "Hi there! You can give me a projected number of potential subscribers, and I can show you an estimate based on that.";
            break;

        case "help":
        case "how":
        case "how can you help":
        case "services":
        case "what services do you offer":
        case "what services do you offer?":
            response = "I'm here to assist you! If you have specific questions about any service, feel free to ask! (i.e pricing, contact) or give me a projected number of your potential subscribers and I will give you a GOQR estimate on it.)";
            break;

        case "pricing":
        case "cost":
        case "what are your prices":
        case "what are your prices?":
        case "how much does it cost":
        case "how much does it cost?":
            response = "For detailed pricing information, you can visit our pricing page on the website. There you will find specifics about prices.";
            break;

        case "contact":
        case "how can I contact you":
        case "how can I contact you?":
        case "info":
        case "information":
            response = "You can reach us through our contact footer at the bottom of the page. We'll get back to you as soon as possible! For quick assistance, ask me for help.";
            break;

        case "account":
        case "how do I create an account":
            response = "To create an account, click on the 'Get Started' link on the top right corner of our website.";
            break;

        case "bye":
        case "goodbye":
            response = "Goodbye!👋 We hope to hear back from you soon!"
            break;

        default:
            // Use a regular expression to extract the number from the user's message
            const match = userMessage.match(/\b\d+\b/);

            // Check if a number is found in the user's message
            if (match) {
                const userNumber = parseInt(match[0]);
                const timeSavedPer100 = 10;
                const timeSaved = Math.floor(userNumber / 100) * timeSavedPer100;
                response = `For a subscriber count of ${userNumber} - Monthly time saved is ${timeSaved} minutes, and you can expect a 30% increase in your monthly revenue`;
            } else {
                response = "I'm sorry, I couldn't find a valid number in your message. Can you please provide a valid number for a more accurate estimate?";
            }
            break;
    }

    // Set the generated response as paragraph text
    messageElement.textContent = response;

    // Scroll to the bottom of the chatbox
    chatElement.scrollTo(0, chatElement.scrollHeight);
}

// Function to handle user input and generate responses
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi, userMessage);;
    }, 600);
}

// Event listeners
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
