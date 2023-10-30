import {createChat} from 'completions';
import dotenv from 'dotenv';
dotenv.config();
const chat=createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo-0613",
    functions:[
       {
        name:'sum_of_two_number',
        description:'Calculating sum of two number.',
        parameters:{
            type:'object',
            properties: {
                firstNumber: {
                  type: "integer",
                  description: "The first integer",
                },
                secondNumber: {
                  type: "integer",
                  description: "The second integer",
                },
            },
            required: ["firstNumber", "secondNumber"],
        },
        function:({firstNumber,secondNumber})=>{
            return {
                result:firstNumber+secondNumber,
                explain:'Explain this sum to a 3 year child'
            }
        }
       }
    ],
    functionCall:'auto'
});
const main=async ()=>{
    const res=await chat.sendMessage('What is the sum of 12 and 13');
    console.log(res.content);
}
main();



