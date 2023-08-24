import { AppState } from "../AppState.js";
import { Case } from "../models/Case.js";
import { saveState } from "../utils/Store.js";

function _saveCases() {
    saveState('cases', AppState.cases)
}

class CasesService {

    setActive(caseId) {
        let foundCase = AppState.cases.find(caseObj => caseObj.id == caseId)
        // console.log('setting active', foundCase)
        AppState.activeCase = foundCase
    }

    unlockCase() {
        let active = AppState.activeCase
        active.unlocked = true
        // active.unlocked = !active.unlocked // NOTE: if you want to do a toggle instead
        console.log('unlocking', AppState.activeCase)
        AppState.emit('activeCase')
    }

    saveCase(updatedBody) {
        let active = AppState.activeCase
        active.reportBody = updatedBody // NOTE save changes to appstate

        active.unlocked = false
        AppState.emit('activeCase')

        _saveCases() // NOTE save changes to local storage
    }

    createCase(formData) {
        let newCase = new Case(formData)
        AppState.cases.push(newCase)
        console.log(newCase);
        AppState.emit('cases')

        newCase.unlocked = true
        AppState.activeCase = newCase

        _saveCases()
    }



}

export const casesService = new CasesService()