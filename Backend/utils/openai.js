import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    // Debugging ke liye log
    console.log("OpenAI API response:", data);

    // Agar API ne koi error diya
    if (data.error) {
      return `⚠️ OpenAI API Error: ${data.error.message}`;
    }

    // Agar choices array empty ho
    if (!data.choices || !data.choices[0]?.message?.content) {
      return "⚠️ No reply received from OpenAI API.";
    }

    // Normal case → reply return karo
    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI fetch error:", err);
    return "⚠️ Failed to connect to OpenAI API.";
  }
};

export default getOpenAIAPIResponse;
