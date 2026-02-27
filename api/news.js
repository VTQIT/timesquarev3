import axios from "axios"

export default async function handler(req, res) {
  try {
    const { category = "general", page = 1 } = req.query

    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          category,
          pageSize: 10,
          page,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    )

    const formatted = response.data.articles.map(a => ({
      headline: a.title,
      summary: a.description,
      image: a.urlToImage,
      source: a.source?.name || "Unknown",
      url: a.url,
      category
    }))

    res.status(200).json(formatted)

  } catch (error) {
    res.status(500).json({ error: "News fetch failed" })
  }
}