import { InlineKeyboard, Keyboard } from 'grammy'
import { BotType } from '../types/bot'

const commands = (bot: BotType) => {
	// Start command
	bot.command('start', async ctx => {
		await ctx.reply('Привет!')
	})

	// Say_my_name command
	bot.command('say_my_name', async ctx => {
		await ctx.reply(`Тебя зовут ${ctx.from?.first_name}`)
	})

	// Mood command
	bot.command('mood', async ctx => {
		const keyboardButtons = ['Отлично', 'Норм', 'Плохо']
		const rows = keyboardButtons.map(item => Keyboard.text(item))

		const moodKeyboard = Keyboard.from([rows]).resized().oneTime()

		await ctx.reply('Как настроение?', {
			reply_markup: moodKeyboard,
		})
	})

	// Share command
	bot.command('share', async ctx => {
		const shareKeyboard = new Keyboard()
			.requestContact('Контакт')
			.resized()
			.oneTime()

		ctx.reply('Чем хочешь поделиться?', {
			reply_markup: shareKeyboard,
		})
	})

	// Game command
	let hiddenGameNumber: number | null = null

	bot.command('game', async ctx => {
		const inlineKeyboard = new InlineKeyboard()
			.text('1', '1')
			.text('2', '2')
			.row()
			.text('3', '3')
			.text('4', '4')
			.row()
			.text('5', '5')

		hiddenGameNumber = Math.floor(Math.random() * (5 - 1) + 1)

		await ctx.reply('Я загадал одну из этих цифр, попробуй угадать какую', {
			reply_markup: inlineKeyboard,
		})
	})

	bot.on('callback_query:data', async ctx => {
		await ctx.answerCallbackQuery('Вы выбрали цифру!')

		if (hiddenGameNumber === null) {
			await ctx.reply(
				'Ты уже сделал свой выбор... Если хочешь сыграть еще раз, то запусти игру заново'
			)

			return
		}

		if (ctx.callbackQuery.data === hiddenGameNumber?.toString()) {
			await ctx.reply('Ура! Ты угадал загаданную цифру!', {
				reply_markup: { remove_keyboard: true },
			})

			hiddenGameNumber = null
		} else {
			await ctx.reply(
				`Жаль, но ответ неверный. Загаданная цифра была - ${hiddenGameNumber}`,
				{
					reply_markup: { remove_keyboard: true },
				}
			)

			hiddenGameNumber = null
		}
	})

	// tot_samiy command
	bot.command('tot_samiy', async ctx => {
		const inlineKeyboard = new InlineKeyboard().url(
			'ТОТ САМЫЙ МИЛЛИОНЕР',
			'https://t.me/monakhov28'
		)

		await ctx.reply('Тык', {
			reply_markup: inlineKeyboard,
		})
	})
}

export { commands }
