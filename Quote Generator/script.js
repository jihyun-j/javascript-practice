const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
let apiQuotes = [];

// Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  loading();
  // Pick rancom quote for api
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);

  // Check author name and replace it
  if (quote.author === null) {
    authorText.innerHTML = "Unknown";
  } else {
    authorText.innerHTML = quote.author;
  }

  // Check quote length
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Add new quote and complete loading
  quoteText.innerHTML = quote.text;
  complete();
}

// Get quote from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
    // console.log(apiQuotes);
  } catch (err) {
    // Catch Error
    console.log("Error", err);
  }
}

// Twitter button
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${authorText.innerHTML}`;
  window.open(twitterUrl, "_blank");
}

//On load
getQuotes();
// loading();

// Event Listner
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
