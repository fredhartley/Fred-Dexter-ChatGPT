


const queryForm = document.getElementById("chatgpt-query");
const promptInput = document.getElementById("prompt-input");
const promptOutput = document.getElementById("prompt-output");

const onRequestComplete = async (req) => {
    const json = await req.json();
    const choices = json.choices;
    promptOutput.textContent = choices[0].message.content;
}

const onRequestFaied = async (error) => {
    promptOutput.textContent = `There has been an error: ${error}`;
}

const onFormSubmit = () => {
    const userInput = promptInput.value;
    // promptOutput.replaceChildren(document.createTextNode(userInput))

    fetch('http://127.0.0.1:3000/chatgpt-request', 
    { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({message: userInput}) 
    })
    .then(onRequestComplete)
    .catch(onRequestFaied)
}

queryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit()
});


