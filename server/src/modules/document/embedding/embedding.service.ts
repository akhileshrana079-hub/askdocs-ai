import { OllamaEmbeddingService } from "./ollama.service";

const provider = new OllamaEmbeddingService();

export const createEmbedding = async (
  text: string
): Promise<number[]> => {
  return provider.createEmbedding(text);
};