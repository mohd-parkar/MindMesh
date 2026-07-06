import 'dotenv/config';

const getOpenAIAPIResponse = async(message) =>{
     const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // IMP
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message, // IMP ( what user send we pass it to chatgpt api)
        },
      ],
    }),
  };

  try {
    let response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );

    // small validation (optional)
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error(error);
  }
};

export default getOpenAIAPIResponse;