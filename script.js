const quoteContainer = document.getElementById('quoute-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-qoute');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading 

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading 

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}




function newQuote() {
    // Pick a random quotes from apiQuotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if Author field is blank and replace it with 'unknowm' 

    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling 

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

//Set Quote, Hide Loader 
    //authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();
}


//Get qoutes from API 

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
        
        //Catch error here
    }
}


//tweet qoute 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners 

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);




//On load
getQuotes();
