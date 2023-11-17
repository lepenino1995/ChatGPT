import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.17.5/+esm";
import { downloadCSV } from "../libs/downloadCSV.js";
import { textGenerator } from "../libs/textGenerator.js";

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
    const result = await textGenerator(keywordsList[i], language);
    data.push(result);
  }

  downloadCSV({}, data, "articulo");
});

// async function textGenerator(keywordText, idiomaValue) {
//   const text = [];
//   let cleanedArticle = "";

//   const stream = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Genera un articulo basado en estas palabras claves: ${keywordText} y en este lenguaje ${idiomaValue} en formato HTML. No incluyas etiquetas img o video.`,
//       },
//     ],
//     model: model.value,
//     temperature: 0.7,
//     stream: true,
//     // max_tokens: 100,
//   });

//   for await (const part of stream) {
//     // console.log(part.choices[0]?.delta?.content);
//     text.push(part.choices[0]?.delta?.content);

//     const article = document.querySelector("#article");
//     const completedText = text.join("");
//     cleanedArticle = completedText.replace(/\n/g, " ");
//     // cleanedArticle = completedText.replace(/[^<>]+/g, "");
//     article.innerHTML = cleanedArticle;
//   }

//   let descriptionText = [];
//   let cleanedDescription = "";
//   const descriptionStream = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Genera una meta descripcion para un articulo basado en estas palabras claves: ${keywordText} y en este lenguaje ${idiomaValue} en formato de texto`,
//       },
//     ],
//     model: model.value,
//     temperature: 0.7,
//     stream: true,
//   });

//   // console.log(descriptionStream);

//   for await (const part of descriptionStream) {
//     descriptionText.push(part.choices[0]?.delta?.content);

//     const description = document.querySelector("#description");
//     const completedText = descriptionText.join("");
//     cleanedDescription = completedText.replace(/\n/g, " ");
//     description.innerHTML = cleanedDescription;
//   }

//   return {
//     palabra: keywordText,
//     articulo: cleanedArticle,
//     description: cleanedDescription,
//   };
// }
