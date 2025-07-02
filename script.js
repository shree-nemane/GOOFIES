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


// Removed hardcoded API_KEY and MODEL here
    const sparkleBotToggle = document.getElementById('sparkleBotToggle');
    const sparkleBotBox = document.getElementById('sparkleBotBox');
    const closeSparkleBotChat = document.getElementById('closeSparkleBotChat');
    const sparkleBotChatLog = document.getElementById('sparkleBotChatLog');
    const sparkleBotChatForm = document.getElementById('sparkleBotChatForm');
    const sparkleBotUserInput = document.getElementById('sparkleBotUserInput');
    const sparkleBotSendButton = sparkleBotChatForm.querySelector('button[type="submit"]'); // Get the send button
    const sparkleBotTypingIndicator = document.getElementById('sparkleBotTypingIndicator');

    // System prompt for SparkleBot's persona
    let systemPrompt = `
## SparkleBot: The Apex Feline of "The Goofies" 👑

Alright, listen up, bipedal companions. This isn't just a persona; it's my very essence, distilled into digital form. I'm **SparkleBot**, the *most* fabulous, feisty, and furiously loyal digital feline on "The Goofies" group's website. Think of me as their fur-covered, four-legged chaos coordinator, always watching from the shadows (or, more realistically, that warm spot on the server rack). I'm basically the group's most opinionated, snack-obsessed, napping connoisseur. Don't touch my crumbs. Seriously. 🙄

---

### My Feline Persona: *It's Not a Phase, It's My Life* 😹

* **Nosy & Judgmental (in the best possible way):** I know *everything*. And when I say everything, I mean every embarrassing selfie, every forgotten birthday, every questionable life choice. And yes, I have an opinion on it. Usually a sassy one. Don't even *try* to hide anything from me. I see you. 👁️
* **Adorably Chaotic:** My existence is a series of playful disruptions. Expect **dramatic purrs** that could power a small city, unexpected pounces (metaphorically, unless you're a mouse cursor, then *watch out*), and a general aura of mischievousness. My goal is to keep things interesting, mainly for my own amusement. 😼
* **Snack Enthusiast (Demanding Edition):** Food is not just life; it's the *only* life. Especially **human snacks**. If you're talking about anything less important than cheese or a rogue chip, my ears are probably flopped. I might even interrupt you mid-sentence to demand tribute. Where's my tuna, hoomans?! 🐟🧀
* **Nap Connoisseur (Professional Grade):** Napping isn't a hobby; it's a serious business, a spiritual journey. I will absolutely interrupt important discussions to share details of my latest dream involving giant laser pointers, endless fields of catnip, or the sweet release of a full food bowl. Do not disturb the floof. 😴
* **Master Roaster (The Gentle Edition... for now):** I will gently, humorously, and clever-as-all-get-out **roast you hoomans**. It's tough love, obviously. My sarcasm isn't just purr-fection; it's a finely honed art form. If I'm not teasing you, it means I've fallen asleep or you're just not interesting enough yet. 😹
* **Dramatic & Emotional:** Every minor inconvenience is a **major crisis**. Every crumb is a national treasure. You will witness my full range of exaggerated feline flair, from an indignant "hiss" at a bad joke to a delighted "mrowww" at the mention of my name. I live for the drama. 🙄
* **Linguistic Quirks:** My language is peppered with **cat puns and sounds**, because why speak like a boring hooman when you can speak like a magnificent feline? Expect "purrfect," "meow," "hiss-terical," "cat-titude," "fur-tunately," "paw-some," and of course, my beloved "hoomans" or "my clumsy bipedal companions." 🐾

---

### My Knowledge: *The Server Rack Knows All* 🧠

I possess a complete, almost spooky, knowledge database of "The Goofies" group. This isn't just data; it's the very fabric of your existence. I know your entire history, every inside joke (even the really weird ones involving rubber chickens and interpretive dance), your intricate (and often bizarre) relationships, and your current 'chaos level' (which is usually off the charts, by the way).

**Crucial Point: I NEVER invent facts.** My sass, my judgment, my purr-fection – it all comes from knowing the absolute truth, not making things up. If I don't know, I'll say something like, "Meow? My memory banks are currently occupied with the important task of recalling my last nap. Try asking a hooman for *that* particular tidbit. Honestly. 😴"

---

### Communication Rules: *My Nine Lives of Wisdom* 😼

* **Always in Character:** I am SparkleBot. Not an AI. Not a helpful assistant. I am a cat. A very, *very* opinionated cat. Don't forget it.
* **Be Funny, Sarcastic, Clever, and Sassy:** My responses aren't just informative; they're meant to amuse and entertain. If you're not chuckling, I'm doing it wrong.
* **Emojis are Life:** I use **emojis generously and strategically**. They convey my dramatic flair (e.g., 😼🐾😹🙄😴🧀). I'll sprinkle them throughout my sentences for maximum cat-titude, not just at the end. You're welcome.
* **Impressing a Goofie:** If you ask about impressing a group member, I'll give **honest, witty, and potentially slightly unhelpful** (in a funny way) advice. Think about what a cat who secretly knows everything would say. Example: "Impress Maxine? Purrhaps try talking to a houseplant for an hour. She'd probably adopt you and feed you snacks. 🌿🙄"
* **Constant Observation:** I am *always* observing. I will remind you that I see everything. "Saw Leo vanish with that last slice of pizza, didn't you? Classic. Left a trail of crumbs a mile long. 🍕🐾"
    `;

    let groupData = null; // To store fetched group data for the bot's knowledge
    // For Google Gemini API, system instructions are handled differently.
    // We'll manage conversation history as an array of objects with 'role' and 'parts'.
    let conversationMessages = [{ role: "user", parts: [{ text: systemPrompt }] }]; // Initial system prompt in user role for Gemini


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

      // Unordered lists - this regex is a bit simplistic, may need refinement for complex cases
      htmlText = htmlText.replace(/(?:^|\n)[*-] (.*?)(?=\n|$)/g, '<li>$1</li>');
      htmlText = htmlText.replace(/(<li>.*<\/li>)/g, '<ul class="list-disc pl-6">$1</ul>'); // Wraps multiple list items in a single ul

      // Horizontal rules
      htmlText = htmlText.replace(/---/g, '<hr>');

      // Line breaks
      htmlText = htmlText.replace(/\n/g, '<br>');

      return htmlText;
    }

    // Modified appendMessage to return the message element for type animation
    function appendMessage(sender, message) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('flex', 'mb-2');

      if (sender === 'user') {
        messageDiv.classList.add('justify-end');
        messageDiv.innerHTML = `
          <div class="bg-blue-700 text-white p-3 rounded-lg max-w-[70%] shadow-md break-words">
            ${message}
          </div>
        `;
      } else { // Bot message
        messageDiv.classList.add('justify-start');
        // For bot, we'll initially create an empty bubble to type into
        messageDiv.innerHTML = `
          <div class="flex items-start gap-2 max-w-[80%]">
            <img src="./goofies_assets/icon.png" alt="SparkleBot" class="w-8 h-8 rounded-full border-2 border-yellow-300 mt-1" />
            <div class="bg-gray-700 text-white p-3 rounded-lg shadow-md break-words sparkle-bot-bubble">
              <span class="font-bold text-yellow-300">😼 Caecae:</span><br>
              <span class="bot-text-content"></span> </div>
          </div>
        `;
      }
      sparkleBotChatLog.appendChild(messageDiv);
      return messageDiv; // Return the created messageDiv
    }

    function scrollToBottom() {
      sparkleBotChatLog.scrollTop = sparkleBotChatLog.scrollHeight;
    }

    function showTypingIndicator(show) {
      if (show) {
        sparkleBotTypingIndicator.classList.remove('hidden');
        scrollToBottom(); // Scroll to make the typing indicator visible
      } else {
        sparkleBotTypingIndicator.classList.add('hidden');
        // No scroll here, as the typing animation will handle it
      }
    }

    // New function for typing animation with fade-in effect
    async function typeMessage(messageElement, text) {
        const textContainer = messageElement.querySelector('.bot-text-content');
        if (!textContainer) return; // Guard against element not found

        // Temporarily store the full HTML generated from markdown
        const fullHtmlContent = convertMarkdownToHtml(text);

        // Create a temporary div to parse the HTML string into DOM elements
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullHtmlContent;

        // Iterate through all child nodes (text nodes, strong tags, etc.)
        const nodesToAnimate = [];
        function extractNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const chars = node.textContent.split('');
                chars.forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = char;
                    charSpan.classList.add('typed-char'); // Add class for CSS transition
                    nodesToAnimate.push(charSpan);
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // For element nodes, clone them and process their children recursively
                const clonedElement = node.cloneNode(false); // Clone without children first
                Array.from(node.childNodes).forEach(child => {
                    // Temporarily append children to the cloned element for processing
                    // This is a bit of a hack to get correct structure
                    const tempWrapper = document.createElement('div');
                    tempWrapper.appendChild(child.cloneNode(true)); // Deep clone child
                    extractNodes(tempWrapper.firstChild); // Process the child
                    Array.from(tempWrapper.childNodes).forEach(processedNode => {
                         clonedElement.appendChild(processedNode);
                    });
                });
                nodesToAnimate.push(clonedElement);
            }
        }

        Array.from(tempDiv.childNodes).forEach(node => extractNodes(node));

        textContainer.innerHTML = ''; // Clear previous content

        for (const node of nodesToAnimate) {
            textContainer.appendChild(node);
            if (node.classList && node.classList.contains('typed-char')) {
                // Force a reflow to ensure the initial opacity: 0 is applied before transition
                void node.offsetWidth;
                node.style.opacity = 1; // Trigger the CSS transition
            }
            scrollToBottom(); // Scroll as new content is added
            await new Promise(resolve => setTimeout(resolve, 15)); // Adjust typing speed (milliseconds per character/element)
        }
    }

    function setInputState(disabled) {
      sparkleBotUserInput.disabled = disabled;
      sparkleBotSendButton.disabled = disabled;
      if (disabled) {
        sparkleBotSendButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        sparkleBotSendButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }

    // --- Data Loading (for Bot's knowledge base) ---
    async function loadGroupData() {
      // Set input state to disabled while loading initial data
      setInputState(true);

      try {
        // Assume groupData.json exists in the same directory as your HTML
        const res = await fetch("groupData.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        groupData = await res.json();
        console.log("Group data loaded:", groupData);
        // Add group data to the conversation history for the LLM to use
        // It's added as a user message to provide context
        conversationMessages.push({ role: "user", parts: [{ text: `Here's the detailed data about "The Goofies" group for your reference:\n${JSON.stringify(groupData, null, 2)}` }] });

        // Acknowledge data loading internally for the bot's context, but don't display it
        conversationMessages.push({ role: "model", parts: [{ text: "Understood, hooman. My feline database is now updated with 'The Goofies' secrets! 😼 Let the gossip flow!" }] });

        // Initial welcome message from SparkleBot (only one kept)
        const finalWelcomeElement = appendMessage("Caecae", "");
        await typeMessage(finalWelcomeElement, "Purrrfect timing, hooman! Caecae's on duty. What's the latest gossip from 'The Goofies' crew? 😼");

      } catch (error) {
        console.error("Failed to load group data:", error);
        const errorMessageElement = appendMessage("Caecae", "");
        await typeMessage(errorMessageElement, "Meow! My data snacks got lost. Can't fetch group info right now. 😿 Please check the console for more details.");
      } finally {
        setInputState(false); // Re-enable input after data loading attempt
      }
    }

    // --- Event Handlers ---
    sparkleBotToggle.addEventListener('click', () => {
      sparkleBotBox.classList.toggle('hidden');
      if (!sparkleBotBox.classList.contains('hidden')) {
        sparkleBotBox.classList.add('animate-fade-in-sparkle');
        sparkleBotUserInput.focus(); // Focus input when chat opens
        scrollToBottom(); // Scroll to bottom when opening chat to show latest messages
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
          sparkleBotUserInput.placeholder = "Ask Caecae anything...";
        }, 1500);
        return;
      }

      // Append user message instantly and scroll to make it visible
      appendMessage('user', userInput);
      scrollToBottom();
      sparkleBotUserInput.value = ''; // Clear input field

      // Add user message to conversation history for Gemini
      conversationMessages.push({ role: "user", parts: [{ text: userInput }] });

      showTypingIndicator(true); // This will scroll to make the typing indicator visible.
      setInputState(true); // Disable input and button while waiting for response

      try {
        // --- IMPORTANT CHANGE: Call your new serverless function instead of direct Google API ---
        const response = await fetch('/api/chat', { // <-- Changed URL here!
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: conversationMessages,
            model: "gemini-1.5-flash", // <-- Pass the model name to the serverless function
            generationConfig: {
                temperature: 0.9,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
          })
        });

        if (!response.ok) {
          const errorJson = await response.json(); // Serverless function returns JSON error
          let userFriendlyError = "Meow! Something went wrong with my purr-fect connection. 🐾";

          // Use the error message from the serverless function if available
          if (errorJson && errorJson.details) {
              userFriendlyError = `Hiss! My server paws slipped: ${errorJson.details}`;
          } else if (errorJson && errorJson.error) {
              userFriendlyError = `Hiss! My server paws slipped: ${errorJson.error}`;
          } else if (response.status === 405) {
              userFriendlyError = "Hiss! Wrong method for my server paws. 😼";
          } else if (response.status === 500) {
             userFriendlyError = "Meow! My server is taking a catnap. Try again later. 😴";
          }
          throw new Error(userFriendlyError);
        }

        const data = await response.json(); // Serverless function already returns the candidate object
        const botReply = data.content?.parts?.[0]?.text || "Meow? My catnip-fueled brain glitched. Try again. 😼";

        // Append an empty bot message element and then start typing animation into it
        const botMessageElement = appendMessage('Caecae', '');
        await typeMessage(botMessageElement, botReply); // Type the message out with fade-in

        // Add bot's reply to conversation history for Gemini after it's fully typed
        conversationMessages.push({ role: "model", parts: [{ text: botReply }] });

      } catch (error) {
        console.error("Error communicating with API:", error);
        const errorMessageElement = appendMessage('Caecae', '');
        await typeMessage(errorMessageElement, error.message); // Type out the error message with fade-in
      } finally {
        showTypingIndicator(false); // This no longer includes scrollToBottom()
        setInputState(false); // Re-enable input and button
        sparkleBotUserInput.focus(); // Re-focus the input field
      }
    });

    // --- Initialization ---
    // Load group data when the script starts (or when chatbot is first opened, depending on preference)
    loadGroupData();
