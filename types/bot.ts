import { Api, Bot, Context, RawApi } from 'grammy'

export type BotType = Bot<Context, Api<RawApi>>
