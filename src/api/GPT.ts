import { Configuration, OpenAIApi } from "openai"
import { GPTKey } from "../private/token.json"
const configuration = new Configuration({
	apiKey: GPTKey,
})
const openai = new OpenAIApi(configuration)

export async function promptEngine(prompt: any) {
	const res = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 400,
	})

	return res.data.choices[0].text
}
