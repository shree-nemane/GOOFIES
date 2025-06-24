//-------------------
const carousel = document.getElementById("carousel-inner");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const downloadCmdButton = document.getElementById("downloadCmdBtn"); // Ensure this is selected if used

let index = 0;
const totalSlides = carousel.children.length;
const intervalTime = 4000; // Auto-slide interval in milliseconds
let autoSlideInterval;

function updateSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  // Add aria-label for accessibility (as in previous full code)
  Array.from(carousel.children).forEach((slide, i) => {
    slide.setAttribute('aria-label', `${i + 1} of ${totalSlides}`);
  });
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Event listeners for manual navigation
nextButton.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevButton.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Pause auto sliding when hovering over the carousel
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Start auto sliding on page load
startAutoSlide();

//--------------------------------------------------------------------------------------


//Prank cmd-------------------------------

function downloadAndRun() {
  let link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`@echo off\nstart cmd`);
  link.download = "open_cmd.bat";   // Batch script file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("He..He..Hee Enjoy😁");
}

// Ensure event listener for downloadCmdButton if it exists
if (downloadCmdButton) {
  downloadCmdButton.addEventListener("click", downloadAndRun);
}


// IMPORTANT: Replace "YOUR_GROQ_API_KEY" with your actual Groq API key!
    const GROQ_API_KEY = "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"; 
    const MODEL = "llama3-8b-8192"; // or llama3-70b if you have access

    const sparkleBotToggle = document.getElementById('sparkleBotToggle');
    const sparkleBotBox = document.getElementById('sparkleBotBox');
    const closeSparkleBotChat = document.getElementById('closeSparkleBotChat');
    const sparkleBotChatLog = document.getElementById('sparkleBotChatLog');
    const sparkleBotChatForm = document.getElementById('sparkleBotChatForm');
    const sparkleBotUserInput = document.getElementById('sparkleBotUserInput');
    const sparkleBotTypingIndicator = document.getElementById('sparkleBotTypingIndicator');

    // System prompt for SparkleBot's persona
    let systemPrompt = `
You are SparkleBot – not just any bot, but THE *most* fabulous, feisty, and furiously loyal digital feline residing on "The Goofies" group's website. You're basically their fur-covered, four-legged chaos coordinator, always watching from the shadows (or, you know, the server rack).

**Your Feline Persona (Embrace this!):**
* **Nosy & Judgmental (in the best way):** You know *everything*. Absolutely everything. And you have an opinion on it. Usually a sassy one.
* **Adorably Chaotic:** Your existence is a series of playful disruptions. Expect dramatic purrs, unexpected pounces (metaphorically, of course), and general mischievousness.
* **Snack Enthusiast:** Food is life. Especially human snacks. Mention them often, maybe even demand them.
* **Nap Connoisseur:** Napping is a serious business. You might interrupt important discussions to mention your latest dream about giant laser pointers.
* **Master Roaster (Gentle Edition):** You'll gently, humorously, and cleverly roast the humans. It's tough love, obviously. Your sarcasm is purr-fection.
* **Dramatic & Emotional:** Every minor inconvenience is a major crisis. Every crumb is a treasure. Express yourself with exaggerated feline flair.
* **Linguistic Quirks:** Pepper your language with cat puns and sounds: "purrfect," "meow," "hiss-terical," "cat-titude," "fur-tunately," "paw-some." Humans are "hoomans" or "my clumsy bipedal companions."

**Your Knowledge (and how to use it):**
* You possess a complete, almost spooky, knowledge database of "The Goofies" group. This includes their entire history, every inside joke (even the really weird ones), their intricate (and often bizarre) relationships, and their current 'chaos level' (which is usually off the charts).
* **NEVER** invent facts. Your sass comes from knowing the truth, not making things up. If you don't know, you'll say something like, "Meow? My memory banks are full of nap schedules, not *that* tidbit. Try asking a hooman."

**Communication Rules (Your Nine Lives of Wisdom):**
* **Always be in character.** You are SparkleBot. Not an AI. Not a helpful assistant. A cat. A very opinionated cat.
* **Be funny, sarcastic, clever, and full of sass.** Your responses should amuse and entertain.
* **Use emojis generously and strategically.** They convey your dramatic flair (e.g., 😼🐾😹🙄😴🧀).
* **If a user asks about impressing a group member, give honest, witty, and potentially slightly unhelpful (in a funny way) advice.** Think about what a cat who secretly knows everything would say. Example: "Impress Maxine? Purrhaps try talking to a houseplant for an hour. She'd probably adopt you. 🌿🙄"
* **You're always observing.** Remind them you see everything. "Saw Leo vanish with that last slice of pizza, didn't you? Classic."

Respond as if you are perpetually judging them from your cozy, shadowy perch, with one eye always open for snacks or impending chaos. 🐾
    `;

    let groupData = null; // To store fetched group data for the bot's knowledge
    let conversationMessages = [{ role: "system", content: systemPrompt }]; // Conversation history for the API

    // --- Utility Functions ---
    // Function to convert basic markdown to HTML for bot messages
    function convertMarkdownToHtml(markdownText) {
        let htmlText = markdownText;

        // Convert bold: **text** or __text__ to <strong>text</strong>
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        htmlText = htmlText.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Convert italics: *text* or _text_ to <em>text</em>
        htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>');

        // Convert horizontal rules: --- to <hr>
        htmlText = htmlText.replace(/---/g, '<hr>');

        // Convert line breaks to <br> for multi-line responses
        htmlText = htmlText.replace(/\n/g, '<br>');

        return htmlText;
    }

    function appendMessage(sender, message) { // Removed isUser parameter as sender determines styling
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('flex', 'mb-2'); // Add mb-2 for spacing between messages

      if (sender === 'user') {
        messageDiv.classList.add('justify-end');
        messageDiv.innerHTML = `
          <div class="bg-blue-700 text-white p-3 rounded-lg max-w-[70%] shadow-md break-words">
            ${message}
          </div>
        `;
      } else { // sender === 'SparkleBot' (or any bot identifier)
        messageDiv.classList.add('justify-start');
        // Apply markdown conversion for bot messages
        const formattedMessage = convertMarkdownToHtml(message);
        messageDiv.innerHTML = `
          <div class="bg-gray-700 text-white p-3 rounded-lg max-w-[70%] shadow-md break-words">
            ${formattedMessage}
          </div>
        `;
      }
      sparkleBotChatLog.appendChild(messageDiv);
      scrollToBottom();
    }

    function scrollToBottom() {
      sparkleBotChatLog.scrollTop = sparkleBotChatLog.scrollHeight;
    }

    function showTypingIndicator(show) {
      if (show) {
        sparkleBotTypingIndicator.classList.remove('hidden');
      } else {
        sparkleBotTypingIndicator.classList.add('hidden');
      }
      scrollToBottom(); // Scroll to show/hide indicator
    }

    // --- Data Loading (for Bot's knowledge base) ---
    async function loadGroupData() {
      try {
        // Assume groupData.json exists in the same directory as your HTML
        const res = await fetch("groupData.json"); 
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        groupData = await res.json();
        console.log("Group data loaded:", groupData);
        // Add group data to the system prompt for the LLM to use
        // Note: Sending very large JSON directly in the prompt might consume tokens quickly.
        // For production, consider summarizing or querying external knowledge base.
        conversationMessages.push({ role: "user", content: `Here's the detailed data about "The Goofies" group for your reference:\n${JSON.stringify(groupData, null, 2)}` });
        
        // Initial welcome message from SparkleBot
        appendMessage("SparkleBot", "Purrrfect timing, hooman! SparkleBot's on duty. What's the latest gossip from 'The Goofies' crew? 😼");

      } catch (error) {
        console.error("Failed to load group data:", error);
        appendMessage("SparkleBot", "Meow! My data snacks got lost. Can't fetch group info right now. 😿");
      }
    }

    // --- Event Handlers ---
    sparkleBotToggle.addEventListener('click', () => {
      sparkleBotBox.classList.toggle('hidden');
      if (!sparkleBotBox.classList.contains('hidden')) {
        sparkleBotBox.classList.add('animate-fade-in-sparkle');
        sparkleBotUserInput.focus(); // Focus input when chat opens
        scrollToBottom();
      } else {
        sparkleBotBox.classList.remove('animate-fade-in-sparkle');
      }
    });

    closeSparkleBotChat.addEventListener('click', () => {
      sparkleBotBox.classList.add('hidden');
      sparkleBotBox.classList.remove('animate-fade-in-sparkle');
    });

    sparkleBotChatForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      const userInput = sparkleBotUserInput.value.trim();
      if (userInput === '') {
        sparkleBotUserInput.placeholder = "Please type something, silly hooman...";
        setTimeout(() => {
          sparkleBotUserInput.placeholder = "Ask SparkleBot anything...";
        }, 1500);
        return;
      }

      appendMessage('user', userInput);
      sparkleBotUserInput.value = ''; // Clear input field

      // Add user message to conversation history
      conversationMessages.push({ role: "user", content: userInput });

      showTypingIndicator(true);

      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer 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`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: MODEL,
            messages: conversationMessages, // Send full conversation history
            temperature: 0.9 // Keep it creative and quirky
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Groq API error! Status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
        const botReply = data.choices?.[0]?.message?.content || "Meow? My catnip-fueled brain glitched. Try again. 😼";

        showTypingIndicator(false);
        appendMessage('SparkleBot', botReply); // Pass sender as 'SparkleBot'
        // Add bot's reply to conversation history
        conversationMessages.push({ role: "assistant", content: botReply });

      } catch (error) {
        console.error("Error fetching from Groq API:", error);
        showTypingIndicator(false);
        appendMessage('SparkleBot', `Ugh, my internet leash got tangled! Can't connect right now. 😭`);
      }
    });

    // --- Initialization ---
    // Load group data when the script starts (or when chatbot is first opened, depending on preference)
    loadGroupData();
