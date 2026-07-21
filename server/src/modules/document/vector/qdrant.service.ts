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


export const storeEmbedding = async (
  id: string,
  embedding: number[],
  payload: any
) => {
  await qdrant.upsert("documents", {
    wait: true,
    points: [
      {
        id,
        vector: embedding,
        payload,
      },
    ],
  });
};


export const searchEmbeddings = async (
  embedding: number[],
  ownerId: string,
  limit = 5
) => {
  const result = await qdrant.search("documents", {
    vector: embedding,
    limit,
    filter: {
      must: [
        {
          key: "ownerId",
          match: {
            value: ownerId,
          },
        },
      ],
    },
    with_payload: true,
  });

  return result;
};