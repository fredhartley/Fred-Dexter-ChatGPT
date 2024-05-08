import { displayUserInput } from "./displayUserInput.js";
import { displayChatgptResponse } from "./displayChatgptResponse.js";

const queryForm = document.getElementById("chatgpt-query");
const promptInput = document.getElementById("prompt-input");
const promptHistory = document.getElementById("prompt-history");

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
