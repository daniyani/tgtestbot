import { GrammyError, HttpError } from 'grammy'
import { BotType } from '../types/bot'

const errorHandlers = (bot: BotType) => {
	bot.catch(err => {
		const ctx = err.ctx
		const e = err.error

		console.error(`Error while handling update ${ctx.update.update_id}:`)

		if (e instanceof GrammyError) {
			console.error(`Error in request:${e.description}`)
		} else if (e instanceof HttpError) {
			console.error(`Could not contact Telegram: ${e}`)
		} else {
			console.error(`Unknown error: ${e}`)
		}
	})
}

export { errorHandlers }
