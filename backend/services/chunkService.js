const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

async function splitText(pages) {
  const allChunks = [];

  let chunkIndex = 0;

  for (const page of pages) {
    if (!page.text.trim()) continue;

    const docs = await splitter.createDocuments([page.text]);

    docs.forEach((doc) => {
      allChunks.push({
        text: doc.pageContent,
        pageNumber: page.pageNumber,
        chunkIndex: chunkIndex++,
      });
    });
  }

  return allChunks;
}

module.exports = {
  splitText,
};