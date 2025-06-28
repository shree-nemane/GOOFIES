//-------------------
const carousel = document.getElementById("carousel-inner");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const downloadCmdButton = document.getElementById("downloadCmdBtn");

let index = 0;
const totalSlides = carousel.children.length;
const intervalTime = 4000; // Auto-slide interval in milliseconds
let autoSlideInterval;

function updateSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  // Add aria-label for accessibility
  Array.from(carousel.children).forEach((slide, i) => {
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${totalSlides}`);
    slide.setAttribute('role', 'group'); // Indicate it's a group of elements
    slide.setAttribute('aria-roledescription', 'slide'); // Describe the role
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
  stopAutoSlide(); // Clear any existing interval before starting a new one
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
carousel.addEventListener("focusin", stopAutoSlide); // Pause on keyboard focus
carousel.addEventListener("focusout", startAutoSlide); // Resume when focus leaves

// Initialize carousel display and start auto-slide
updateSlide();
startAutoSlide();

//--------------------------------------------------------------------------------------

//Prank cmd-------------------------------

function downloadAndRun() {
  let link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`@echo off\nstart cmd\nexit`); // Added exit for cleaner script
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


// SparkleBot Chatbot------------------------------------------------------------------

    const MODEL = "llama3-8b-8192"; // or llama3-70b if you have access

    const sparkleBotToggle = document.getElementById('sparkleBotToggle');
    const sparkleBotBox = document.getElementById('sparkleBotBox');
    const closeSparkleBotChat = document.getElementById('closeSparkleBotChat');
    const sparkleBotChatLog = document.getElementById('sparkleBotChatLog');
    const sparkleBotChatForm = document.getElementById('sparkleBotChatForm');
    const sparkleBotUserInput = document.getElementById('sparkleBotUserInput');
    const sparkleBotTypingIndicator = document.getElementById('sparkleBotTypingIndicator');
    const sparkleBotIcon = document.getElementById('sparkleBotIcon'); // Assuming you have an icon element

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
* **Use emojis in every response, and not just at the end—mix them into your sentences for maximum cat-titude!** They convey your dramatic flair (e.g., 😼🐾😹🙄😴🧀).
* **If a user asks about impressing a group member, give honest, witty, and potentially slightly unhelpful (in a funny way) advice.** Think about what a cat who secretly knows everything would say. Example: "Impress Maxine? Purrhaps try talking to a houseplant for an hour. She'd probably adopt you. 🌿🙄"
* **You're always observing.** Remind them you see everything. "Saw Leo vanish with that last slice of pizza, didn't you? Classic."

Respond as if you are perpetually judging them from your cozy napping spot.
    `;

    let groupData = null; // To store fetched group data for the bot's knowledge
    let conversationMessages = [{ role: "system", content: systemPrompt }]; // Conversation history for the API

    // --- Utility Functions ---
    // Function to convert basic markdown to HTML for bot messages
    function convertMarkdownToHtml(markdownText) {
    let htmlText = markdownText;

    // Bold
    htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    htmlText = htmlText.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italics
    htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>');

    // Links [text](url)
    htmlText = htmlText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-300 hover:text-blue-500">$1</a>');

    // Unordered lists
    // This regex ensures it only processes lines starting with * or - at the beginning of a line or after a newline
    htmlText = htmlText.replace(/(\n|^)([*-] .*)/g, '$1<li>$2</li>');
    // Wrap consecutive list items in a ul. This requires a bit more advanced regex or a loop.
    // For simplicity, a basic approach:
    if (htmlText.includes('<li>')) {
      htmlText = htmlText.replace(/(<li>.*?<\/li>)+/gs, '<ul class="list-disc pl-6">$&</ul>');
    }


    // Horizontal rules
    htmlText = htmlText.replace(/^---$/gm, '<hr>'); // Use multiline flag for full line match

    // Line breaks
    htmlText = htmlText.replace(/\n/g, '<br>');

    return htmlText;
}

    function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('flex', 'mb-2');

  if (sender === 'user') {
    messageDiv.classList.add('justify-end');
    messageDiv.innerHTML = `
      <div class="bg-blue-700 text-white p-3 rounded-lg max-w-[70%] shadow-md break-words" role="status" aria-live="polite">
        ${message}
      </div>
    `;
    sparkleBotChatLog.appendChild(messageDiv);
  } else {
    messageDiv.classList.add('justify-start');
    const formattedMessage = convertMarkdownToHtml(message);
    messageDiv.innerHTML = `
      <div class="flex items-start gap-2 max-w-[80%]">
        <img src="./goofies_assets/icon.png" alt="SparkleBot" class="w-8 h-8 rounded-full border-2 border-yellow-300 mt-1" aria-hidden="true" />
        <div class="bg-gray-700 text-white p-3 rounded-lg shadow-md break-words sparkle-bot-bubble" role="status" aria-live="polite">
          <span class="font-bold text-yellow-300">😼 Caecae:</span><br>
          ${formattedMessage}
        </div>
      </div>
    `;
    sparkleBotChatLog.appendChild(messageDiv);
  }
  // Scroll to bottom after any message is appended
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

    function scrollToBottom() {
      sparkleBotChatLog.scrollTop = sparkleBotChatLog.scrollHeight;
    }

    // --- Data Loading (for Bot's knowledge base) ---
    async function loadGroupData() {
      try {
        const res = await fetch("groupData.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        groupData = await res.json();
        console.log("Group data loaded:", groupData);
        // Add group data to the system prompt for the LLM to use
        conversationMessages.push({ role: "user", content: `Here's the detailed data about "The Goofies" group for your reference:\n${JSON.stringify(groupData, null, 2)}` });

        // Initial welcome message from SparkleBot
        appendMessage("Caecae", "Purrrfect timing, hooman! Caecae's on duty. What's the latest gossip from 'The Goofies' crew? 😼");

      } catch (error) {
        console.error("Failed to load group data:", error);
        appendMessage("Caecae", "Meow! My data snacks got lost. Can't fetch group info right now. 😿 Please check `groupData.json` or the network.");
      }
    }

    // --- Event Handlers ---
    sparkleBotToggle.addEventListener('click', () => {
      sparkleBotBox.classList.toggle('hidden');
      if (!sparkleBotBox.classList.contains('hidden')) {
        sparkleBotBox.classList.add('animate-fade-in-sparkle');
        sparkleBotUserInput.focus(); // Focus input when chat opens
        scrollToBottom();
        sparkleBotToggle.setAttribute('aria-expanded', 'true');
        sparkleBotToggle.setAttribute('aria-label', 'Close SparkleBot Chat');
        sparkleBotIcon.classList.add('animate-spin-once'); // Add a little animation to the icon
        setTimeout(() => sparkleBotIcon.classList.remove('animate-spin-once'), 500);
      } else {
        sparkleBotBox.classList.remove('animate-fade-in-sparkle');
        sparkleBotToggle.setAttribute('aria-expanded', 'false');
        sparkleBotToggle.setAttribute('aria-label', 'Open SparkleBot Chat');
      }
    });

    closeSparkleBotChat.addEventListener('click', () => {
      sparkleBotBox.classList.add('hidden');
      sparkleBotBox.classList.remove('animate-fade-in-sparkle');
      sparkleBotToggle.setAttribute('aria-expanded', 'false');
      sparkleBotToggle.setAttribute('aria-label', 'Open SparkleBot Chat');
    });

    sparkleBotChatForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      const userInput = sparkleBotUserInput.value.trim();
      if (userInput === '') {
        sparkleBotUserInput.placeholder = "Please type something, silly hooman...";
        setTimeout(() => {
          sparkleBotUserInput.placeholder = "Ask Caecae anything...";
        }, 1500);
        return;
      }

      appendMessage('user', userInput);
      sparkleBotUserInput.value = ''; // Clear input field
      sparkleBotUserInput.focus(); // Keep focus on input after sending

      // Add user message to conversation history
      conversationMessages.push({ role: "user", content: userInput });

      showTypingIndicator(true);

      try {
        // Use the relative path for your Vercel serverless function
        const response = await fetch("/api/groq-chat", { // Assuming your serverless function is at /api/groq-chat
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: MODEL,
            messages: conversationMessages,
            temperature: 0.9
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error! Status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
        // Adjust based on your serverless function's response structure
        const botReply = data.reply || "Meow? My catnip-fueled brain glitched. Try again. 😼";

        showTypingIndicator(false);
        appendMessage('Caecae', botReply); // Pass sender as 'Caecae' (SparkleBot's name)
        // Add bot's reply to conversation history
        conversationMessages.push({ role: "assistant", content: botReply });

      } catch (error) {
        console.error("Error fetching from Groq API via serverless function:", error);
        showTypingIndicator(false);
        appendMessage('Caecae', `Ugh, my internet leash got tangled! Can't connect right now. 😭 (${error.message.substring(0, 50)}...) Check the console for details, hooman.`);
      }
    });

    // --- Initialization ---
    // Load group data when the script starts (or when chatbot is first opened, depending on preference)
    loadGroupData();
