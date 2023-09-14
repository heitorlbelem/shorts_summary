import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summary } from "./summary.js"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3333, () => {
  console.log("🚀 Listening on port 3333")
})

app.get("/summary/:id", async (request, response) => {
  const { id } = request.params

  await download(id)
  const result = await transcribe()

  return response.status(200).json({ result })
})

app.post("/summary", async (request, response) => {
  const { text } = request.body.text
  const result = await summary(text)

  return response.status(200).json({ result })
})
