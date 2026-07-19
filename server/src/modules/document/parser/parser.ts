import path from "path";

import { parsePdf } from "./pdf.parser";
import { parseDocx } from "./docx.parser";

export const parseDocument = async (
  filePath: string
): Promise<string> => {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".pdf":
      return parsePdf(filePath);

    case ".docx":
      return parseDocx(filePath);

    default:
      throw new Error("Unsupported document type");
  }
};