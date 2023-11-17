import { downloadCSV } from "../libs/downloadCSV.js";
import { generatePolicy } from "../libs/generatePolicy.js";

const btnGenerate = document.querySelector("#btnGenerate");

window.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/ChatGPT/data/countries.json");
  const data = await res.json();
  console.log(data);

  const countries = data.map((country) => {
    return `<option value="${country.name}">${country.name}</option>`;
  });

  country.innerHTML = countries.join("");
});

btnGenerate.addEventListener("click", async () => {
  const lang = document.querySelector('[name="idioma"]:checked').value;

  const companyName = document.querySelector("#companyName").value;
  const websiteURL = document.querySelector("#websiteURL").value;
  const websiteName = document.querySelector("#websiteName").value;
  const companyEmail = document.querySelector("#companyEmail").value;

  console.log(companyName, websiteURL, websiteName, companyEmail);

  // Generate Policy
  const conditions = await generatePolicy("conditions", {
    companyName,
    webName: websiteName,
    webURL: websiteURL,
    companyEmail,
  });
  const cookies = await generatePolicy("cookies", {
    companyName,
    webName: websiteName,
    webURL: websiteURL,
    companyEmail,
  });
  const privacy = await generatePolicy("privacy", {
    companyName,
    webName: websiteName,
    webURL: websiteURL,
    companyEmail,
  });

  const policyTitle = lang === "es" ? "Politicas" : "Policies";
  const cookiesTitle = lang === "es" ? "Cookies" : "Cookies";
  const privacyTitle = lang === "es" ? "Privacidad" : "Privacy";

  downloadCSV(
    {},
    {
      [policyTitle]: conditions,
      [cookiesTitle]: cookies,
      [privacyTitle]: privacy,
    },
    "politicas"
  );
});
