import { server } from "./server.js"

const form = document.getElementById("form")
const input = document.getElementById("video-url")
const content = document.getElementById("content")

form.addEventListener("submit", async (e) => {
  content.classList.add("placeholder")

  e.preventDefault()

  const url = input.value
  if (!url.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um Short.")
  }

  const [_, params] = url.split("/shorts/")
  const [videoId] = params.split("?")

  content.textContent = "Obtendo transcrição do vídeo..."
  const transcriptionResponse = await server.get(`/summary/${videoId}`)
  const transcription = transcriptionResponse.data.result

  content.textContent = "Gerando o resumo do vídeo..."
  const summaryResponse = await server.post("/summary", { text: transcription })
  const summary = summaryResponse.data.result
  content.textContent = summary
  content.classList.remove("placeholder")
})
