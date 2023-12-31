// import { Parser } from "@json2csv/plainjs";

import {
  Parser
} from 'https://cdn.jsdelivr.net/npm/@json2csv/plainjs@7.0.3/+esm'


export function downloadCSV(opts = {}, rows, name = "data") {
  try {
    const parser = new Parser(opts);
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
