import { Client, Message } from 'discord.js'
import { CommandService } from '../services'
import { Event } from '../types'

/**
 * Fired when a new message is posted.
 *
 * Used for:
 *  - Responsing to mentions
 */
export const MessageEvent: Event = {
  eventName: 'message',
  handle: async (message: Message, client: Client): Promise<void> => {
    await CommandService.handleDeploy(message, client)
  }
}
