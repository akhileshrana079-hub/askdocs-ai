import { createEmbedding } from "../document/embedding/embedding.service";
import { searchEmbeddings } from "../document/vector/qdrant.service";
import { generateAnswer } from "./llm.service";

export const retrieveContext = async (
  question: string,
  ownerId: string
) => {
  const embedding = await createEmbedding(question);

  const results = await searchEmbeddings(
    embedding,
    ownerId
  );

  const context = results
  .map((item) => item.payload?.text)
  .join("\n\n");

  const answer = await generateAnswer(
  question,
  context
);

return answer;
};