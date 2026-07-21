import { createEmbedding } from "../document/embedding/embedding.service";
import { searchEmbeddings } from "../document/vector/qdrant.service";

export const retrieveContext = async (
  question: string,
  ownerId: string
) => {
  const embedding = await createEmbedding(question);

  const results = await searchEmbeddings(
    embedding,
    ownerId
  );

  return results;
};