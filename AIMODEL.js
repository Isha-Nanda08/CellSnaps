const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyBLzMWZyZVhHxqDtJpK1TDJ0lBDIYZU3JY"
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "- RBC (Red Blood Cells) count: 5.2 million cells/µL\n- WBC (White Blood Cells) count: 6.5 thousand cells/µL\n- Platelet count: 270 thousand cells/µL\n- Age: 29 years\n- Gender: Male\n\nGiven these details, provide an analysis of the patient's health. Consider normal ranges for these blood parameters and offer any potential concerns or recommendations based on the counts provided, along with age and gender. If the values are abnormal, suggest possible medical conditions that might require further investigation."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "## Analysis of Blood Counts:\n\n**Red Blood Cell (RBC) Count:** 5.2 million cells/µL\n\n* **Normal Range:** 4.7 - 6.1 million cells/µL for males\n* **Analysis:** The patient's RBC count is within the normal range for his age and gender. This indicates healthy oxygen-carrying capacity of the blood.\n\n**White Blood Cell (WBC) Count:** 6.5 thousand cells/µL\n\n* **Normal Range:** 4.5 - 11.0 thousand cells/µL for males\n* **Analysis:** The patient's WBC count is also within the normal range. This suggests that his immune system is functioning normally.\n\n**Platelet Count:** 270 thousand cells/µL\n\n* **Normal Range:** 150 - 400 thousand cells/µL \n* **Analysis:** The platelet count is within the normal range. This indicates normal blood clotting ability.\n\n**Overall Interpretation:**\n\nBased on these blood count values, the patient appears to have normal hematological parameters. There are no immediate concerns raised by the provided information. \n\n**Potential Recommendations:**\n\n* **Regular Check-ups:** As part of general health maintenance, it is always advisable to undergo regular blood tests and check-ups, especially after the age of 30. This can help identify any potential health issues early on.\n* **Lifestyle Factors:** Maintaining a healthy lifestyle with regular exercise, a balanced diet, and adequate sleep can help contribute to overall health and well-being.\n* **Further Investigations:** If the patient experiences any symptoms such as fatigue, weakness, bruising, or bleeding, further investigations may be warranted.\n\n**Important Note:** This analysis is based solely on the provided blood count values and cannot be considered a definitive medical diagnosis. It is crucial to consult with a healthcare professional for a comprehensive evaluation and interpretation of any health concerns. \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
