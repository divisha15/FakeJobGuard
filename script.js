const btn = document.getElementById("predictBtn");
const textarea = document.getElementById("jobText");
const resultDiv = document.getElementById("result");
const predictionEl = document.getElementById("prediction");
const confidenceEl = document.getElementById("confidence");

btn.addEventListener("click", async () => {
  const text = textarea.value.trim();

  if (!text) {
    alert("Please paste a job description.");
    return;
  }

  predictionEl.textContent = "Analyzing...";
  confidenceEl.textContent = "";
  resultDiv.className = "result";
  resultDiv.classList.remove("hidden");

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ job_text: text })
    });

    const data = await response.json();

    predictionEl.textContent = data.prediction;
    confidenceEl.textContent = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;

    resultDiv.classList.add(
      data.prediction === "Fake Job" ? "fake" : "real"
    );

  } catch (err) {
    predictionEl.textContent = "Backend not reachable";
    confidenceEl.textContent = "";
  }
});
