import { Events } from './events'
import { Logger, BotClient } from './core'

function onSuccessfulStartUp (): void { }

function onFailedStartUp (error: any): void {
  const errorMessage: string = error.toString()
  Logger.error(`Unable to start Bot.\n${errorMessage}`)
  process.exit()
}

(new BotClient())
  .start(Events.eventsList)
  .then(onSuccessfulStartUp)
  .catch(onFailedStartUp)
