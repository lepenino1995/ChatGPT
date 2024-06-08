import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.17.5/+esm";
import { downloadCSV } from "../libs/downloadCSV.js";
import { textGeneratornewall } from "../libs/textGeneratornewall.js";

const keywordsInput = document.querySelector("#keywords");
const generateButton = document.querySelector("#generate");
const model = document.querySelector("#model");

const apiKeyValue = localStorage.getItem("openaiApiKey");

const openai = new OpenAI({
  apiKey: apiKeyValue,
  dangerouslyAllowBrowser: true,
});

generateButton.addEventListener("click", async () => {
  const keywordsList = keywordsInput.value.split("\n");
  // const keywordsText = keywordsList.join(", ");
  // get of checkbox
  const idioma = document.querySelector('input[name="idioma"]:checked');

  const idiomaValue = idioma.value;
  console.log(idiomaValue);

  const language = idiomaValue === "es" ? "español" : "ingles";
  console.log(language);

  let data = [];

  for (let i = 0; i < keywordsList.length; i++) {
    const result = await textGeneratornewall(keywordsList[i], language);
    data.push(result);
  }

  downloadCSV({}, data, "articulo");
});
