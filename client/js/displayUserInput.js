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

export { displayUserInput };
