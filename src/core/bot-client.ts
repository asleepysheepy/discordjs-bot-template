import { ClientOptions, Client as DiscordJsClient, Intents } from 'discord.js'
import { Event } from '../types'
import { Logger } from './logger'

/**
 * THE™ Winnie_Bot client!
 */
export class BotClient {
  /**
   * The options to be passed into the DiscordJS client instance.
   * See here for more info:
   * https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
   */
  static clientOptions: ClientOptions = {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES
    ],
    partials: [
      'USER',
      'GUILD_MEMBER',
      'MESSAGE',
      'REACTION'
    ]
  }

  /**
   * The DiscordJS client instance
   */
  client: DiscordJsClient

  /**
   * Creates a new instance of the bot client.
   */
  constructor () {
    this.client = new DiscordJsClient(BotClient.clientOptions)
  }

  /**
 * The main function that starts the bot.
 */
  async start (events: Event[]): Promise<void> {
    Logger.info('Welcome to <Bot_Name>!')
    Logger.info('Starting...')

    this.registerEvents(events)

    try {
      await this.login()
      Logger.info('Successfully logged in to Discord.')
    } catch (e) {
      Logger.error('Unable to log in to discord, did you set your bot token?')
      Logger.error(e)
      process.exit()
    }
  }

  /**
   * Attempts to login to Discord using a token provided through the
   * BOT_TOKEN environment variable.
   */
  async login (): Promise<void> {
    await this.client.login(process.env.BOT_TOKEN)
  }

  /**
   * Registers a list of event handlers with the bot
   *
   * @param events the list of events to register
   */
  registerEvents (events: Event[]): void {
    events.forEach((event) => this.client.on(event.eventName, event.handle))
  }
}
