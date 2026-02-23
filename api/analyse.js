export default async function handler(req, res) {
  const { description } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      system:
        'You are a nutrition expert. Return ONLY JSON {"calories":number,"protein":number,"carbs":number,"fats":number,"fibre":number}',
      messages: [{ role: "user", content: description }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
