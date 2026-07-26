require("dotenv").config();

const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");

async function test() {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-embedding-001",
    });

    const result = await embeddings.embedQuery("Hello world");

    console.log("Success!");
    console.log(result.length);
  } catch (err) {
    console.error(err);
  }
}

test();