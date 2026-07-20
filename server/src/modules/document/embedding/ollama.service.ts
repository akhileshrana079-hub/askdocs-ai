import ollama from "ollama";
import { EmbeddingProvider } from "./embedding.interface";

export class OllamaEmbeddingService implements EmbeddingProvider {
  async createEmbedding(text: string): Promise<number[]> {
    const response = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: text,
    });

    return response.embedding;
  }
}