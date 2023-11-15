import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.17.5/+esm";
import { generatePolicy } from "../libs/generatePolicy.js";
import { downloadCSV } from "../libs/downloadCSV.js";
import { textGenerator } from "../libs/textGenerator.js";

const keywordInput = document.querySelector("#keywords");
const keywordsGenerated = document.querySelector("#keywords-generated");
const generateButton = document.querySelector("#generate");
const model = document.querySelector("#model");
const apiKeyValue = localStorage.getItem("openaiApiKey");
const cantidadPalabras = document.querySelector("#cantidad");

const companyName = document.querySelector("#companyName");
const companyEmail = document.querySelector("#companyEmail");
const websiteName = document.querySelector("#websiteName");
const websiteUrl = document.querySelector("#websiteURL");
const country = document.querySelector("#country");

const openai = new OpenAI({
  apiKey: apiKeyValue,
  dangerouslyAllowBrowser: true,
});

window.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/ChatGPT/data/countries.json");
  const data = await res.json();
  console.log(data);

  const countries = data.map((country) => {
    return `<option value="${country.name}">${country.name}</option>`;
  });

  country.innerHTML = countries.join("");
});

const allowedEmails = [
  "lepenino@gmail.com",
  "carlos_palacios90@hotmail.com",
  "mvaspiazu@gmail.com",
  "fabricioycm@gmail.com",
  "panijos12344@gmail.com",
  "christianhernandeztristan@gmail.com",
  "laredo.rlxs@gmail.com",
  "pandaweb007@gmail.com",
  "hassel95@gmail.com",
  "urielrojasvbm@gmail.com",
  "robertgomauri@gmail.com",
  "danimdbr@hotmail.com",
  "yojanannarvaez2@gmail.com",
  "juancontrerasb2001@gmail.com",
  "all@gmail.com",
];

function isEmailAllowed(email) {
  return allowedEmails.includes(email);
}

generateButton.addEventListener("click", async () => {
  const lang = document.querySelector('[name="idioma"]:checked').value;

  // Generate Policy
  const conditions = await generatePolicy("conditions", companyName.value);
  const cookies = await generatePolicy("cookies", companyName.value);
  const privacy = await generatePolicy("privacy", companyName.value);

  const policyTitle = lang === "es" ? "Politicas" : "Policies";
  const cookiesTitle = lang === "es" ? "Cookies" : "Cookies";
  const privacyTitle = lang === "es" ? "Privacidad" : "Privacy";

  const language = lang === "es" ? "español" : "english";

  const opts = { fields: ["content", "value"] };

  downloadCSV(
    opts,
    [
      {
        content: policyTitle,
        value: conditions,
      },
      {
        content: cookiesTitle,
        value: cookies,
      },
      {
        content: privacyTitle,
        value: privacy,
      },
    ],
    "politicas"
  );

  // Generate Articles
  const quantityWords = parseInt(cantidadPalabras.value);

  const keyword = keywordInput.value;

  let data = [];

  // Generate words
  const result = await generateWords(quantityWords, keyword, language);
  keywordsGenerated.innerHTML = result;

  const keywordsList = result.split(",");

  for (let i = 0; i < keywordsList.length; i++) {
    const result = await textGenerator(keywordsList[i], language);
    console.log(result);
    data.push(result);
  }

  console.log(data);

  downloadCSV({}, data, "articulos");
});

// window.onload = function () {
//   ipCheckSection.style.display = "flex";

//   setTimeout(() => {
//     ipCheckSection.style.display = "none";
//   }, 10000);
// };

async function generateWords(quantity, topic, language = "español") {
  const text = [];
  let cleanedArticle = "";
  const prompt = `Genera una lista de ${quantity} palabras clave para un articulo sobre ${topic} separado por comas, y escrito en el lenguaje ${language}`;
  // const prompt = `Genera un un palabra aleatoria para un articulo sobre ${topic}`;

  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: model.value,
    temperature: 0.7,
    stream: true,
  });

  for await (const part of stream) {
    text.push(part.choices[0]?.delta?.content);
    const completedText = text.join("");
    cleanedArticle = completedText.replace(/\n/g, " ");
  }

  console.log(cleanedArticle);
  return cleanedArticle;
}
