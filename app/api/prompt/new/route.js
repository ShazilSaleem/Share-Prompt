import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  try {
    const { userId, prompt, tag } = await req.json();
    console.log("Received request:", { userId, prompt, tag });
    await connectToDB();
    console.log("Database connection successful");
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();
    console.log("Prompt saved successfully:", newPrompt);
    return new Response(JSON.stringify(newPrompt), { status: 201 });

  } catch (error) {
    console.error("Error occurred while creating new prompt:", error);
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
