import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export const splitIntoChunks = async (
  text: string
): Promise<string[]> => {
  return splitter.splitText(text);
};