require("dotenv").config();

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

async function test() {
  try {
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-2.0-flash",
      temperature: 0,
    });

    const response = await llm.invoke("Say hello.");

    console.log(response.content);
  } catch (err) {
    console.error(err);
  }
}

test();