import dotenv from 'dotenv'
import { Bot } from 'grammy'
import { hears } from './listeners/hears'
import { commands } from './listeners/commands'
import { errorHandlers } from './utils/error-handlers'
import { onHandlers } from './listeners/on'

dotenv.config()

const bot = new Bot(process.env.BOT_API_KEY || '')

bot.api.setMyCommands([
	{ command: 'start', description: 'Запуск бота' },
	{ command: 'say_my_name', description: 'Попросить бота сказать свое имя' },
	{ command: 'mood', description: 'Узнать как настроение' },
	{ command: 'share', description: 'Поделиться личными данными' },
	{ command: 'game', description: 'Угадай цифру' },
	{
		command: 'tot_samiy',
		description: 'Перейти в тг канал того самого миллионера...',
	},
])

commands(bot)
hears(bot)
onHandlers(bot)

errorHandlers(bot)

bot.start()
