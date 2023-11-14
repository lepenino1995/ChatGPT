import { Parser } from "@json2csv/plainjs";

export function downloadCSV(rows, name = "data") {
  try {
    const parser = new Parser();
    const csv = parser.parse(rows);
    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${name}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
  } catch (err) {
    console.error(err);
  }
}
