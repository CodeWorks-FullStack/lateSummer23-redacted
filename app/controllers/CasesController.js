import { AppState } from "../AppState.js";
import { casesService } from "../services/CasesService.js";
import { Case } from "../models/Case.js";
import { setHTML } from "../utils/Writer.js";
import { getFormData } from "../utils/FormHandler.js";

function _drawCases() {
    console.log('drawing cases')
    let cases = AppState.cases
    let content = ''
    cases.forEach(caseObj => content += caseObj.ListTemplate)
    setHTML('case-list', content)
}

function _drawActive() {
    console.log('drawing active')
    let active = AppState.activeCase
    if (active.unlocked == true) {
        setHTML('active-case', active.UnredactedCaseTemplate)
    } else {
        setHTML('active-case', active.RedactedCaseTemplate)
    }
}

export class CasesController {
    constructor() {
        // console.log('cases controller', AppState.cases)
        _drawCases()
        AppState.on('activeCase', _drawActive)
        AppState.on('cases', _drawCases)
    }

    setActive(caseId) {
        casesService.setActive(caseId)
    }

    unlockCase() {
        console.log('unlocking case')
        casesService.unlockCase()
    }

    saveCase() {
        let textAreaElem = document.querySelector('textarea')
        let updatedBody = textAreaElem.value
        console.log('saving', updatedBody)

        casesService.saveCase(updatedBody)
    }

    createCase() {
        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log('creating', formData)

        casesService.createCase(formData)
    }

}