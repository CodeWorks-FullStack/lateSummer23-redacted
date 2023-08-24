import { generateId } from "../utils/GenerateId.js";

const _classifiedWords = ["aliens", "ihop", "people", "lizard", "rat", "bigfoot", "stinky", "alien"]

export class Case {
    constructor(data) {
        this.id = generateId()
        this.reportBody = data.reportBody || "Please fill out report..."
        this.reportedDate = data.reportedDate ? new Date(data.reportedDate) : new Date()
        //                         ⬆️⬆️ example of a ternary expression
        // condi
        this.agency = data.agency
        this.unlocked = data.unlocked
    }

    get ListTemplate() {
        return /*html*/`   <div class="col-12">
            <div class="d-flex justify-content-between selectable" onclick="app.CasesController.setActive('${this.id}')">
              <span>${this.agency}</span>
              <span>${this.reportedDate.toLocaleDateString()}</span>
              <span>${this.ComputeReportTitle}</span>
            </div>
          </div>`
    }

    get RedactedCaseTemplate() {
        return /*html*/ `          <div class="row">
            <div class="col-12">
              <div>
                <h2>Reported On: ${this.ComputeReportedDateView}</h2>
                <h2>Reporting Agency: ${this.agency}</h2>
                <div class="text-end">
                <button class="btn btn-info" onclick="app.CasesController.unlockCase()">Unlock Case</button>
                </div>
              </div>
              <div class="pt-2">
                <textarea class="w-100" name="reportBody" id="reportBody" cols="30" rows="10">${this.ComputeRedactedReportBody}</textarea>
              </div>
            </div>
          </div>`
    }

    get UnredactedCaseTemplate() {
        return /*html*/ `          <div class="row">
            <div class="col-12">
              <div>
                <h2>Reported On: ${this.ComputeReportedDateView}</h2>
                <h2>Reporting Agency: ${this.agency}</h2>
                 <div class="text-end">
                <button class="btn btn-warning" onclick="app.CasesController.saveCase()">Save Case</button>
                </div>
              </div>
              <div class="pt-2">
                <textarea class="w-100" name="reportBody" id="reportBody" cols="30" rows="10">${this.reportBody}</textarea>
              </div>
            </div>
          </div>`
    }

    get ComputeReportTitle() {
        return this.reportBody.slice(0, 15) + '...'
    }

    get ComputeReportedDateView() {
        let date = this.reportedDate
        return date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    get ComputeRedactedReportBody() {
        // NOTE this is fun but is not relevant for the checkpoint
        let reportArr = this.reportBody.split(' ')

        let redactedArr = reportArr.map(word => {
            if (_classifiedWords.includes(word.toLowerCase())) {
                return '⬛⬛⬛⬛'
            }
            return word
        })
        return redactedArr.join(' ')
    }


}