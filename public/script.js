const randomQuoteButton = document.querySelector("#random-quote-button");
const allQuoteButton = document.querySelector("#all-quote-button");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const quotesList = document.querySelector("#quotes-list");

// Add an event listener to the all-quote button
allQuoteButton.addEventListener("click", () => {
  quotesList.innerHTML = "";
  fetch("/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      quotes.map((quote) => {
        const li = document.createElement("li");
        li.textContent = `${quote.quote} - ${quote.author}`;
        quotesList.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
});

// Add an event listener to the random quote button
randomQuoteButton.addEventListener("click", () => {
  quotesList.innerHTML = "";
  fetch("/quotes/random")
    .then((response) => response.json())
    .then((quote) => {
      const li = document.createElement("li");
      li.textContent = `${quote.quote} - ${quote.author}`;
      quotesList.appendChild(li);
    })
    .catch((error) => console.error(error));
});

// Add an event listener to the search button
searchButton.addEventListener("click", async () => {
  quotesList.innerHTML = "";
  const searchTerm = searchInput.value;
  if (searchTerm) {
    fetch(`/quotes/search?term=${searchTerm}`)
      .then((response) => response.json())
      .then((quotes) => {
        quotes.map((quote) => {
          const li = document.createElement("li");
          li.textContent = `${quote.quote} - ${quote.author}`;
          quotesList.appendChild(li);
        });
      })

      .catch((error) => console.error(error));
  }
});
