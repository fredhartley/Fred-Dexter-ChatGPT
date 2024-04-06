


const queryForm = document.getElementById("chatgpt-query");
const promptInput = document.getElementById("prompt-input");
const promptHistory = document.getElementById("prompt-history");

const previousMessageHTML = (userInputText, promptHistory, timestamp) => {
    const container = document.createElement("div");
    const userInputContainer = document.createElement("div");
    userInputContainer.classList.add("user-input__container");
    const responseContainer = document.createElement("div");
    responseContainer.classList.add("response__container");

    const userInputTitle = document.createElement("h3");
    userInputTitle.appendChild(document.createTextNode("You"));

    const userInput = document.createElement("p");
    userInput.appendChild(document.createTextNode(userInputText));

    const responseTitle = document.createElement("h3");
    responseTitle.appendChild(document.createTextNode("ChatGPT"));
    
    const responseInput = document.createElement("p");
    responseInput.appendChild(document.createTextNode(promptHistory));

    userInputContainer.append(userInputTitle, userInput);
    responseContainer.append(responseTitle, responseInput);
    
    const date = new Date(timestamp * 1000);
    const dateElem = document.createTextNode(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
    
    const timestampElem = document.createElement("time");
    timestampElem.classList.add("timestamp");
    timestampElem.appendChild(dateElem);

    container.append(userInputContainer, responseContainer, timestampElem);

    return container;
}   


const onRequestComplete = async (req, userInput) => {
    const json = await req.json();
    const choices = json.choices;
    const timestamp = json.created;

    console.log(timestamp)

    // promptHistory.textContent = choices[0].message.content;

    const message = previousMessageHTML(userInput, choices[0].message.content, timestamp);

    promptHistory.appendChild(message);
}

const onRequestFaied = async (error) => {
    promptHistory.textContent = `There has been an error: ${error}`;
}

const onFormSubmit = () => {
    const userInput = promptInput.value;
    // promptHistory.replaceChildren(document.createTextNode(userInput))



    fetch('http://127.0.0.1:3000/chatgpt-request', 
    { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({message: userInput}) 
    })
    .then((req) => {
        onRequestComplete(req, userInput)
    })
    .catch(onRequestFaied)
}

queryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit()
});

