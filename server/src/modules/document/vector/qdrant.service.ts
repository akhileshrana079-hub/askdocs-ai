import qdrant from "../../../config/qdrant";

export const createCollection = async () => {
  try {
    await qdrant.getCollection("documents");
    console.log("Collection already exists");
  } catch {
    await qdrant.createCollection("documents", {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });

    console.log("Collection created");
  }
};