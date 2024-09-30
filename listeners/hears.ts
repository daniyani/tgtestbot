import { BotType } from '../types/bot'

const hears = (bot: BotType) => {
	bot.hears('Отлично', async ctx => {
		await ctx.reply('Супер!')
	})

	bot.hears([/привет/i, /здарова/i], async ctx => {
		await ctx.reply('Приветствую!')
	})

	bot.hears(/как дела/i, async ctx => {
		await ctx.reply('Все отлично!')
	})
}

export { hears }
