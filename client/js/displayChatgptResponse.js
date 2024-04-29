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

export { displayChatgptResponse };
