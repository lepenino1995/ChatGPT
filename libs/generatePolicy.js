export async function generatePolicy(
  fileName,
  { companyName, webName, webURL, companyCountry, companyEmail }
) {
  const lang = document.querySelector('[name="idioma"]:checked').value;

  const res = await fetch(`/ChatGPT/templates/${lang}/${fileName}.txt`);
  const data = await res.text();

  return data
    .replace(/{{companyName}}/g, companyName)
    .replace(/{{webName}}/g, webName)
    .replace(/{{webURL}}/g, webURL)
    .replace(/{{companyCountry}}/g, companyCountry)
    .replace(/{{companyEmail}}/g, companyEmail);
}
