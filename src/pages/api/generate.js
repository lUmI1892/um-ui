const API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_API_KEY = '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'

export default async function handler (req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  const { prompt, languaje, framework } = req.query

  if (!prompt) return res.status(400).json({ error: 'Promt is required' })
  if (!languaje) return res.status(400).json({ error: 'Languaje is required' })
  if (!framework) return res.status(400).json({ error: 'Framework is required' })

  // 3 roles
  // -user: Como si el usuario estuviese escribiendo
  // -assistant: Como si el ChatGpt nos contestase
  // -system: Como si el ROOT estuviese escribiendo

  const messages = [
    { role: 'system', content: 'You are a system that generates code for UI components. The user describe you a component and only generate the code for it.' },
    { role: 'user', content: "Genera un boton con el logo de Twitch que aparezca el texto 'Sigueme en Twitch' con HTML y  Tailwind" },
    { role: 'assistant', content: "<button>'Sigueme en Twitch'</button>" }
  ]

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [...messages, { role: 'user', content: prompt }],
      stream: false
    })
  })

  if (!response.ok) return res.status(500).json({ error: 'Something went wrong' })

  const { choices } = await response.json()
  const { content } = choices[0]?.message

  return res.status(200).json({ content })
}
