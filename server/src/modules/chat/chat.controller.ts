import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/ApiResponse";
import { retrieveContext } from "./chat.service";

export const search = asyncHandler(async (req, res) => {
  const { question } = req.body;

  const answer = await retrieveContext(
    question,
    req.user!.id
  );

  return res.json(
    new ApiResponse(
      200,
      answer,
      "Relevant chunks found"
    )
  );
});