import ollama from "ollama";

export const generateAnswer = async (
  question: string,
  context: string
) => {
  const prompt = `
You are an AI assistant.

Answer ONLY using the context below.

If the answer is not present, say:
"I couldn't find that information in the uploaded document."

Context:
${context}

Question:
${question}

Answer:
`;

  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.message.content;
};