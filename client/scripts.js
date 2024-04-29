const queryForm = document.getElementById("chatgpt-query");
const promptInput = document.getElementById("prompt-input");
const promptHistory = document.getElementById("prompt-history");

const displayUserInput = (userInputText) => {
  const userInputContainer = document.createElement("div");
  userInputContainer.classList.add("user-input__container");

  const userInputTitle = document.createElement("h3");
  userInputTitle.appendChild(document.createTextNode("You"));

  const userInput = document.createElement("p");
  userInput.appendChild(document.createTextNode(userInputText));

  userInputContainer.append(userInputTitle, userInput);

  return userInputContainer;
};

const displayChatgptResponse = (promptHistory, timestamp) => {
  const responseContainer = document.createElement("div");
  responseContainer.classList.add("response__container");

  const responseTitle = document.createElement("h3");
  responseTitle.appendChild(document.createTextNode("ChatGPT"));

  const responseInput = document.createElement("p");
  responseInput.appendChild(document.createTextNode(promptHistory));
  responseContainer.append(responseTitle, responseInput);

  const date = new Date(timestamp * 1000);
  const dateElem = document.createTextNode(
    `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  );

  const timestampElem = document.createElement("time");
  timestampElem.classList.add("timestamp");
  timestampElem.appendChild(dateElem);

  responseContainer.appendChild(timestampElem);

  // container.append(userInputContainer, responseContainer, timestampElem);

  return responseContainer;
};

const onRequestComplete = async (req, container) => {
  const json = await req.json();
  const choices = json.choices;
  const timestamp = json.created;

  container.appendChild(
    displayChatgptResponse(choices[0].message.content, timestamp)
  );
};

const onRequestFaied = async (error) => {
  promptHistory.textContent = `There has been an error: ${error}`;
};

const onFormSubmit = () => {
  const userInput = promptInput.value;

  if (userInput == "") {
    return;
  }

  promptInput.value = "";

  const container = document.createElement("div");
  container.appendChild(displayUserInput(userInput));
  promptHistory.appendChild(container);

  fetch("http://127.0.0.1:3000/chatgpt-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then((req) => {
      onRequestComplete(req, container);
    })
    .catch(onRequestFaied);
};

queryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onFormSubmit();
});

promptInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && !e.shiftKey) {
    e.preventDefault();
    onFormSubmit();
  }
});
