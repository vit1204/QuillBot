// node --version # Should be >= 18
// npm install @google/generative-ai

import {
    GoogleGenerativeAI,
    // HarmCategory,
    // HarmBlockThreshold,
} from "@google/generative-ai"


const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = 'AIzaSyAnnPjRoUUICvS1WUVe95GanxtX0JIZ_cw'

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// const generationConfig = {
//     temperature: 1,
//     topK: 0,
//     topP: 0.95,
//     maxOutputTokens: 2048,
// };

// const safetySettings = [
//     {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
// ];

const OpenAi = {
    async getParaphraseFullContent( fullContent: string,language:string) {
        try {
            
            const prompt = `You are a helpful paraphraser.
            You should return the matching language of the original text.
            You should not change the meaning of the text
            You must only reply to the paraphrased text without any extra comments or explanations.
            You should convert with the same language ${language} and replace words with similar expressions
            Note: If the original language is English, respond in English; if it is Vietnamese, respond in Vietnamese, and similarly for other languages.
            For example: Mèo là loài rất dễ thương -> Mèo là loài rất đáng yêu
            For another example: Cats are very cute animals -> Cats are adorable animals
            Now please paraphrase this: ${fullContent}`
            
            const result = await model.generateContent(prompt)
            const response = result.response;
            console.log(response.text())
            return response.text();
        } catch (error) {
            return ''
        }  
    },

    // async getParaphraseText(content:string, fullContent: string) {
    //     try {
    //         const chat = model.startChat({
    //             generationConfig,
    //             safetySettings,
    //             history: [
    //                 {
    //                     role: "user",
    //                     parts: [{ text: "You are a helpful paraphraser. You should " }],
    //                 },
    //                 {
    //                     role: "model",
    //                     parts: [{ text: "The quick brown fox jumps over the lazy dog. -> A quick brown fox jumped over a lazy dog." }],
    //                 },
    //             ],

    //         }); 
    //     } catch (error) {
    //         return ''
    //     }

    // }
}

export default OpenAi