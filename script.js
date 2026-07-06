const button = document.querySelector("button");
const textarea = document.getElementById("userInput");
const response = document.getElementById("response");

button.addEventListener("click", async () => {
  const question = textarea.value.trim();

  if (question === "") {
    response.innerHTML = "⚠️ Please enter a question.";
    return;
  }

  response.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("http://localhost:3002/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    response.innerHTML = `
      <strong>You asked:</strong><br>
      ${question}
      <br><br>
      <strong>Gemini Answer:</strong><br>
      ${data.answer}
    `;
  } catch (error) {
    console.error(error);
    response.innerHTML = "❌ Error connecting to AI server.";
  }
});