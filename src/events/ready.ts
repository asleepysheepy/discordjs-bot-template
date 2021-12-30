import { DatabaseService } from '../services'
import { Client } from 'discord.js'
import { Event } from '../types'

/**
 * Fired when the bot's "ready" event is triggered.
 *
 * Used for:
 *  - Establishing a database conntection.
 *  - Setting the bot's activity.
 */
export const ReadyEvent: Event = {
  eventName: 'ready',
  handle: async (client: Client) => {
    // Establish database connection
    await DatabaseService.establishConnection()

    // Set the bot's activity
    client.user?.setActivity('pwease change me 🥺', { type: 'LISTENING' })
  }
}
