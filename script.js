const btn = document.getElementById("predictBtn");
const textarea = document.getElementById("jobText");
const resultDiv = document.getElementById("result");
const predictionEl = document.getElementById("prediction");
const confidenceEl = document.getElementById("confidence");

btn.addEventListener("click", async () => {
  const text = textarea.value.trim();

  // ---------- Input validation ----------
  if (text.length < 20) {
    resultDiv.className = "result warning";
    resultDiv.classList.remove("hidden");
    predictionEl.textContent = "Invalid input";
    confidenceEl.textContent =
      "Please enter a meaningful job description (min 20 characters).";
    return;
  }

  // ---------- Loading state ----------
  resultDiv.className = "result info";
  resultDiv.classList.remove("hidden");
  predictionEl.textContent = "Analyzing job posting…";
  confidenceEl.textContent = "This may take a few seconds";

  try {
    const response = await fetch(
      "https://fakejobguard.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job_text: text   // ✅ FIXED
        })
      }
    );

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    // ---------- Safety check ----------
    if (typeof data.confidence !== "number" || isNaN(data.confidence)) {
      throw new Error("Invalid response");
    }

    // ---------- Display result ----------
    predictionEl.textContent = data.prediction;
    confidenceEl.textContent = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;

    resultDiv.className =
      "result " + (data.prediction === "Fake Job" ? "fake" : "real");

  } catch (err) {
    resultDiv.className = "result warning";
    predictionEl.textContent = "Backend is waking up ⏳";
    confidenceEl.textContent =
      "Please wait 20–30 seconds and try again.";
  }
});
