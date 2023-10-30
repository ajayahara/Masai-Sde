require('dotenv').config();
const {createChat}=require('completions')

const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
        function: async ({ location }) => {
          let res_single = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric&sys=unix`);
              let data= await res_single.json();
            return {
              location: data.name,
              temperature: data.main.temp,
              humidity:data.main.humidity,
              explain:'Explain all these in your way',
              unit: "celsius",
            };
        },
      },
    ],
    functionCall: "auto",
  });

  module.exports={
    chat
  }