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
                content: `Eres un experto SEO. 
                Debes crear un articulo con estas palabras claves: ${keywordText} y en este idioma: ${idiomaValue}. Sigue este formato:
                1: Un H1 llamativo 
                2: Un parrafo basado en el H1
                3: Genera 5 H2 y sus parrafos
                4: Una conclusion
                5: En formato HTML
                6: No incluyas etiquetas img o video`,
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