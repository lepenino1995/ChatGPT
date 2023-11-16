import OpenAI from 'https://cdn.jsdelivr.net/npm/openai@4.17.5/+esm'

const apiKeyValue = localStorage.getItem("openaiApiKey");

const openai = new OpenAI({
    apiKey: apiKeyValue,
    dangerouslyAllowBrowser: true,
});

export async function textGenerator(keywordText, idiomaValue) {
    const text = [];
    let cleanedArticle = "";

    const stream = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Genera un articulo basado en estas palabras claves: ${keywordText}, NO utilices esas palabras mas de 2 veces en todo el articulo y el texto tiene que estar escrito en el lenguaje ${idiomaValue} y en formato HTML, que cada parrafo no supere las 200 palabras, con H2 y H3. El articulo debe tener como minimo 400 palabras. No incluyas etiquetas img o video.`,
            },
        ],
        model: model.value,
        temperature: 0.7,
        stream: true,
    });

    for await (const part of stream) {
        text.push(part.choices[0]?.delta?.content);
        const article = document.querySelector("#article");
        const completedText = text.join("");
        cleanedArticle = completedText.replace(/\n/g, " ");
        console.log(cleanedArticle);
        article.innerHTML = cleanedArticle;
    }

    let descriptionText = [];
    let cleanedDescription = "";
    const descriptionStream = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Genera una meta descripcion de maximo 19 palabras iniciando por esta palabra: ${keywordText} y en este lenguaje ${idiomaValue} en formato de texto`,
            },
        ],
        model: model.value,
        temperature: 0.7,
        stream: true,
    });

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