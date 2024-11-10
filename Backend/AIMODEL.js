
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

async function run(text) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `
      - RBC (Red Blood Cells) count: 5.2 million cells/µL
      - WBC (White Blood Cells) count: 6.5 thousand cells/µL
      - Platelet count: 270 thousand cells/µL
      - Age: 29 years
      - Gender: Male

      Provide a concise, bullet-pointed analysis of the patient's health based on these details. Compare each parameter to the normal range, identify any concerns, and offer brief recommendations. Format the response using Markdown for readability, aiming for 50 words per parameter and an overall visually appealing structure.
      `
          },
        ],
      },
      {
        "role": "model",
        "parts": [
          {
            "text": `

# Health Analysis

## Red Blood Cell (RBC) Count
- **Value:** 5.2 million cells/µL
- **Normal Range:** 4.7 - 6.1 million cells/µL (Male)
- **Status:** Within normal range; suggests healthy oxygen levels.
\n
## White Blood Cell (WBC) Count
- **Value:** 6.5 thousand cells/µL
- **Normal Range:** 4.5 - 11.0 thousand cells/µL
- **Status:** Normal; immune system appears healthy.
\n
## Platelet Count
- **Value:** 270 thousand cells/µL
- **Normal Range:** 150 - 400 thousand cells/µL
- **Status:** Normal; indicates stable clotting.
\n
## Summary & Recommendations
- **Overall:** Blood parameters are within normal limits, no immediate concerns.
- **Suggestions:**
  - Regular health check-ups, especially post-30.
  - Maintain a balanced lifestyle with exercise, diet, and rest.
\n
> **Note:** This is an analysis based on blood values alone; consult a healthcare provider for a full assessment.
`
          }
        ]
      }
    ],
  });

  const result = await chatSession.sendMessage(text);
  console.log(result.response.text());
  return result.response.text();
}

module.exports = run;
