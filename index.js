import OpenAI from "openai";
import { Parser } from "@json2csv/plainjs";

const keywordsInput = document.querySelector("#keywords");
const idioma = document.querySelector('[name="idioma"]');
const generateButton = document.querySelector("#generate");
const model = document.querySelector('[name="model"]');

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

generateButton.addEventListener("click", async () => {
  const keywordsList = keywordsInput.value.split("\n");
  // const keywordsText = keywordsList.join(", ");
  const idiomaValue = idioma.value;

  let data = [];

  for (let i = 0; i < keywordsList.length; i++) {
    const result = await textGenerator(keywordsList[i], idiomaValue);
    console.log(result);
    data.push(result);
  }

  downloadCSV(data);
});

async function textGenerator(keywordText, idiomaValue) {
  const text = [];
  let cleanedArticle = "";

  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Genera un articulo basado en estas palabras claves: ${keywordText} y en este lenguaje ${idiomaValue} en formato HTML. No incluyas etiquetas img o video.`,
      },
    ],
    model: model.value,
    temperature: 0.7,
    stream: true,
    // max_tokens: 100,
  });

  for await (const part of stream) {
    // console.log(part.choices[0]?.delta?.content);
    text.push(part.choices[0]?.delta?.content);

    const article = document.querySelector("#article");
    const completedText = text.join("");
    cleanedArticle = completedText.replace(/\n/g, " ");
    // cleanedArticle = completedText.replace(/[^<>]+/g, "");
    article.innerHTML = cleanedArticle;
  }

  let descriptionText = [];
  let cleanedDescription = "";
  const descriptionStream = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Genera una meta descripcion para un articulo basado en estas palabras claves: ${keywordText} y en este lenguaje ${idiomaValue} en formato de texto`,
      },
    ],
    model: model.value,
    temperature: 0.7,
    stream: true,
  });

  // console.log(descriptionStream);

  for await (const part of descriptionStream) {
    descriptionText.push(part.choices[0]?.delta?.content);

    const description = document.querySelector("#description");
    const completedText = descriptionText.join("");
    cleanedDescription = completedText.replace(/\n/g, " ");
    description.innerHTML = cleanedDescription;
  }

  return {
    palabra: keywordText,
    articulo: cleanedArticle,
    description: cleanedDescription,
  };
}

function downloadCSV(rows) {
  try {
    const parser = new Parser();
    const csv = parser.parse(rows);

    console.log(csv);

    // download csv file
    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();

    // document.body.removeChild(downloadLink);
  } catch (err) {
    console.error(err);
  }
}
