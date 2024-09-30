import { BotType } from '../types/bot'

const onHandlers = (bot: BotType) => {
	bot.on(':contact', async ctx => {
		await ctx.reply('Спасибо за контакт!')
	})
}

export { onHandlers }
