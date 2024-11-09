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
          {text: "whole procedure requried in steps for detetecting rbcs in human  blood by a lab technician \n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "## Detecting RBCs in Human Blood: A Step-by-Step Guide for Lab Technicians\n\nThis procedure outlines the steps involved in detecting red blood cells (RBCs) in a human blood sample using a standard microscope and a blood smear technique.  \n\n**Materials:**\n\n* Blood sample (fresh or anticoagulated)\n* Microscope slides\n* Coverslips\n* Disposable lancets (for fresh blood samples)\n* Sterile alcohol swabs\n* Antiseptic solution\n* Staining solution (e.g., Wright's stain, Giemsa stain)\n* Microscope\n* Immersion oil (optional)\n* Pipette (optional)\n\n**Safety Precautions:**\n\n* Wear appropriate personal protective equipment (PPE), including gloves, lab coat, and safety goggles.\n* Handle blood samples with caution to avoid contamination and potential exposure.\n* Dispose of all materials properly according to laboratory protocols.\n\n**Procedure:**\n\n**1. Prepare the Blood Smear:**\n\n   a. **Fresh blood sample:** \n      - Clean the fingertip with an alcohol swab.\n      - Prick the fingertip with a sterile lancet.\n      - Gently squeeze the fingertip to release a small drop of blood onto a clean microscope slide. \n   b. **Anticoagulated blood sample:**\n      - Use a pipette to transfer a small drop of blood onto a clean microscope slide.\n\n   c. **Spread the blood:**\n      - Using a second clean slide (the spreader slide), place it at a 45-degree angle to the first slide, touching the drop of blood at the edge.\n      - Push the spreader slide forward along the first slide, creating a thin, even blood smear.\n      - Allow the smear to air-dry completely.\n\n**2. Staining (Optional):**\n\n   a. **Wright's stain:** \n      - Cover the blood smear with Wright's stain solution.\n      - Allow it to sit for 2-3 minutes.\n      - Rinse the slide gently with distilled water.\n      - Allow the slide to air-dry completely. \n\n   b. **Giemsa stain:**\n      - Cover the blood smear with Giemsa stain solution.\n      - Allow it to sit for 15-20 minutes.\n      - Rinse the slide gently with distilled water.\n      - Allow the slide to air-dry completely.\n\n   c. **Unstained smear:** \n      - If you are only looking for RBC presence and not detailed morphology, you can skip the staining step. \n\n**3. Microscopic Examination:**\n\n   a. **Mount the slide:** \n      - Place the dried blood smear on the microscope stage and secure it with the clips.\n\n   b. **Select the objective lens:**\n      - Start with the low-power objective lens (10x) to locate the smear area. \n      - Switch to the high-power objective lens (40x) for a more detailed view.\n      - For even higher magnification, you can use the oil immersion lens (100x) with immersion oil placed on the slide.\n\n   c. **Observe RBC morphology:**\n      - Focus on the smear and observe the RBCs. \n      - Note their shape, size, color, and any abnormalities (e.g., irregular shape, presence of inclusions).\n\n**4. Documentation:**\n\n   a. **Record observations:**\n      - Document the presence, number, and any abnormalities in RBCs.\n      - You can draw a simple diagram of what you observe or take a picture of the smear under the microscope.\n\n   b. **Label the slide:**\n      - Label the slide with the patient's information and the date of the examination.\n\n**Interpretation:**\n\n- **Normal RBCs:** \n   - Appear as round, biconcave discs.\n   -  Are typically 7-8 µm in diameter.\n   - Stain a pale pinkish-red color with Wright's stain.\n- **Abnormal RBCs:**\n   - **Anemia:** Decreased RBC count, pale color, and/or smaller size.\n   - **Thalassemia:** Irregular shape, thin and small, and often pale.\n   - **Sickle cell anemia:**  Sickle-shaped cells, irregular in size, and often pale.\n   - **Spherocytosis:** Spherically shaped cells, smaller and darker than normal.\n   - **Elliptocytosis:** Elliptical-shaped cells.\n\n**Note:** This procedure is a basic method for detecting RBCs. If you need to assess specific abnormalities or perform a complete blood count (CBC), consult a qualified laboratory professional. \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
