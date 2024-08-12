import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    console.log("SEARCHING PROMPT",params)
    const prompt = await Prompt.findById(params.promptId).populate("creator");
    if (!prompt) {

        return new Response("Prompt not found!", { status: 404 });
    }else{
        return new Response(JSON.stringify(prompt), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
export const PATCH = async (req,{params})=>{
    const {prompt,tag} = await req.json()
    console.log("UPDATE PROMPT",params)
    try {
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.promptId);
        if(!existingPrompt){
            return new Response("Prompt not found!",{status:404})
        }else{
            existingPrompt.prompt = prompt
            existingPrompt.tag = tag
            await existingPrompt.save()
            return new Response(JSON.stringify(existingPrompt),{status:200})
        }
    } catch (error) {
            return new Response("Failed to update prompt", { status: 500 });
    }
}
export const DELETE = async (req,{params})=>{
    console.log("DELETE PROMPT",params)
    try {
        await connectToDB()
        const existingPrompt = await Prompt.findByIdAndDelete(params.promptId);
        if(!existingPrompt){
            return new Response("Prompt not found!",{status:404})
        }else{
            return new Response("Prompt Deleted Successfully",{status:200})
        }

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}