// --experimental-json-modules
import database from "./database.json"
import Person from "./person.js"
import TerminalController from "./terminalController.js"
import { save } from "./repository.js"

const DEFAULT_LANG = "pt-BR"
const STOP_TERMINAL = ":q"

const terminalControlller = new TerminalController()
terminalControlller.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalControlller.question("What?")

    if (answer === STOP_TERMINAL) {
      terminalControlller.closeTerminal()
      console.log('process finished!')

      return
    }

    const person = Person.generateInstanceFromString(answer)
    terminalControlller.updateTable(person.formatted(DEFAULT_LANG))

    await save(person)

    return mainLoop()
  } catch (error) {
    console.error("Something went wrong: ", error)
    return mainLoop()
  }
}

// --experimental-top-level-await
await mainLoop()
