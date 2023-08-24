import { Case } from "./models/Case.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./models/Case.js').Case[]} */

  cases = loadState('cases', [Case])

  // cases = [
  //   new Case(
  //     {
  //       reportBody: "Bigfoot was spotted in the Foothills. He was super hairy and big and a little stinky.",
  //       agency: '🌲'
  //     }),
  //   new Case({
  //     reportBody: "Aliens made contact in the IHOP parking lot. They ordered a shortstack.",
  //     agency: '🥞'
  //   }),
  //   new Case({
  //     reportBody: "Various sightings and encounters with lizard people. They are crawling up from the sewers. Some report even seeing a rat in tow... ",
  //     agency: '🗑️'
  //   })
  // ]

  /** @type {import('./models/Case.js').Case|null} */
  activeCase = null


  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
