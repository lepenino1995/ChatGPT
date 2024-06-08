import OpenAI from 'https://cdn.jsdelivr.net/npm/openai@4.17.5/+esm'

const apiKeyValue = localStorage.getItem("openaiApiKey");

const openai = new OpenAI({
    apiKey: apiKeyValue,
    dangerouslyAllowBrowser: true,
});

export async function textGeneratornewall(keywordText, idiomaValue) {
    const text = [];
    let cleanedArticle = "";

    const stream = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Redacta un artículo titulado: "${keywordText}", con este idioma ${idiomaValue}.
                Será un artículo extenso, en el que adoptarás el rol de una persona llamada Leandro, que a partir de su experiencia explica de qué trata el tema "Nombre del articulo"
                El artículo debe utilizar un tono desenfadado, pero manifestando gran autoridad, pues la persona habla a partir de su experiencia y análisis.
                La extensión ha de ser de al menos 2500 palabras.
                Optimiza el artículo a nível de SEO para que en los encabezados y en el texto aparezcan los términos claves: "Nombre del articulo", así como sus sinónimos, o términos que la gente puede utilizar para conocer la diferencia entre ellos y cuál es mejor. Busca enlaces con contenido relacionado e incorpóralos en el articulo
                Optimiza los títulares de las secciones para el SEO (añade palabras clave en las metas
                H2, H3, etc)
                Consulta Internet para conocer la competencia que hable igual de este nicho, e incluye esta información en el artículo.`,
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