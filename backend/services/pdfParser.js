const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const extractTextFromPDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));

  const pdf = await pdfjsLib.getDocument({
    data,
  }).promise;

  const pages = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const textContent = await page.getTextContent();

    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ");

    pages.push({
      pageNumber: pageNum,
      text: pageText,
    });
  }

  return pages;
};

module.exports = {
  extractTextFromPDF,
};