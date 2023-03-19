import { Configuration, OpenAIApi } from "openai"
import { GPTKey } from "../private/token.json"
const configuration = new Configuration({
	// organization: "org-D4eQrRtITyR5KHRrRSqDUMlq",
	apiKey: GPTKey,
})
const openai = new OpenAIApi(configuration)

async function getResponse() {
	const res = await openai.listEngines()
	console.log(res.data.data)
}
// const response = await openai.listEngines()

// getResponse()

export async function promptEngine(prompt: string) {
	const res = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 400,
	})
	console.log(res.data.choices[0].text)
}

promptEngine("write a poem about a hairy boy named aboudat")
