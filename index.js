// import OpenAI from "openai";
// import { Parser } from "@json2csv/plainjs";

// const keywordsInput = document.querySelector("#keywords");
// const generateButton = document.querySelector("#generate");
// const model = document.querySelector('#model');
// const apiKey = document.querySelector("#api-key");
// const btnApiKey = document.querySelector("#btn-api-key");
// const emailInput = document.querySelector("#email");
// const ipCheckSection = document.getElementById("ip-check-section");

// const apiKeyValue = localStorage.getItem("apiKey");

// if (apiKeyValue) {
//   apiKey.value = apiKeyValue;
// }

// btnApiKey.addEventListener("click", () => {
//   localStorage.setItem("apiKey", apiKey.value);
//   location.reload();
// });

// const openai = new OpenAI({
//   apiKey: apiKeyValue,
//   dangerouslyAllowBrowser: true,
// });

// const allowedEmails = [
//   "lepenino@gmail.com", "carlos_palacios90@hotmail.com", "mvaspiazu@gmail.com",
//   "fabricioycm@gmail.com", "panijos12344@gmail.com", "christianhernandeztristan@gmail.com",
//   "laredo.rlxs@gmail.com", "pandaweb007@gmail.com" ,"hassel95@gmail.com","urielrojasvbm@gmail.com",
//   "robertgomauri@gmail.com", "danimdbr@hotmail.com", "yojanannarvaez2@gmail.com", "juancontrerasb2001@gmail.com","all@gmail.com",
// ];

// function isEmailAllowed(email) {
//   return allowedEmails.includes(email);
// }

// generateButton.addEventListener("click", async () => {
//   const userEmail = emailInput.value;
//   const idiomaValue = document.querySelector('[name="idioma"]:checked').value;

//   if (isEmailAllowed(userEmail)) {
//     const keywordsList = keywordsInput.value.split("\n");
//     let data = [];

//     for (let i = 0; i < keywordsList.length; i++) {
//       const result = await textGenerator(keywordsList[i], idiomaValue);
//       data.push(result);
//     }

//     downloadCSV(data);
//   } else {
//     alert("Tu correo electrónico no está en la lista permitida.");
//   }
// });

// window.onload = function () {
//   ipCheckSection.style.display = "flex";

//   setTimeout(() => {
//     ipCheckSection.style.display = "none";
//   }, 10000);
// };

// async function textGenerator(keywordText, idiomaValue) {
//   const text = [];
//   let cleanedArticle = "";

//   const stream = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Genera un articulo basado en estas palabras claves: ${keywordText}, NO utilices esas palabras mas de 2 veces en todo el articulo y en este lenguaje ${idiomaValue} en formato HTML, que cada parrafo no supere las 200 palabras, con H2 y H3. El articulo debe tener como minimo 400 palabras. No incluyas etiquetas img o video.`,
//       },
//     ],
//     model: model.value,
//     temperature: 0.7,
//     stream: true,
//   });

//   for await (const part of stream) {
//     text.push(part.choices[0]?.delta?.content);
//     const article = document.querySelector("#article");
//     const completedText = text.join("");
//     cleanedArticle = completedText.replace(/\n/g, " ");
//     article.innerHTML = cleanedArticle;
//   }

//   let descriptionText = [];
//   let cleanedDescription = "";
//   const descriptionStream = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Genera una meta descripcion de maximo 19 palabras iniciando por esta palabra: ${keywordText} y en este lenguaje ${idiomaValue} en formato de texto`,
//       },
//     ],
//     model: model.value,
//     temperature: 0.7,
//     stream: true,
//   });

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

// function downloadCSV(rows) {
//   try {
//     const parser = new Parser();
//     const csv = parser.parse(rows);
//     const downloadLink = document.createElement("a");
//     const blob = new Blob(["\ufeff", csv]);
//     const url = URL.createObjectURL(blob);
//     downloadLink.href = url;
//     downloadLink.download = "data.csv";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//   } catch (err) {
//     console.error(err);
//   }
// }
