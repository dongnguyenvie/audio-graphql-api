import uuid from 'uuid'

/**
 * @module modules/seeder.js
 */

export default class Seeder {
    constructor(models, SeederNm) {
        this.models = models ? models : null
        this.uuid = uuid();
        if (SeederNm) {
            this.SeederNm = SeederNm
            this.log()
        }
    }
    run() {
        throw new Error('You do not implement it yet')
    }
    log() {
        console.log(`Seeded: ${this.SeederNm}::${this.uuid}`)
    }
}