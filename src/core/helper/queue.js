import queues from '../plugins/kue';
import modelHelpers from './model'

class JobHelpers {

    constructor() {
        queues.process('model_findOne', async (job, done) => {
            this.execJob('findOne', job.data.args, done)
        });
        queues.process('model_findAll', async (job, done) => {
            this.execJob('findAll', job.data.args, done)
        });
        queues.process('model_create', async (job, done) => {
            this.execJob('create', job.data.args, done)
        });
        queues.process('model_update', async (job, done) => {
            this.execJob('update', job.data.args, done)
        });
        queues.process('model_delete', async (job, done) => {
            this.execJob('delete', job.data.args, done)
        });
        queues.process('model_deleteMany', async (job, done) => {
            this.execJob('deleteMany', job.data.args, done)
        });
        queues.process('model_softDelete', async (job, done) => {
            this.execJob('softDelete', job.data.args, done)
        });
        queues.process('model_hardDelete', async (job, done) => {
            this.execJob('hardDelete', job.data.args, done)
        });
        queues.process('model_recover', async (job, done) => {
            this.execJob('recover', job.data.args, done)
        });
    }

    static async handleQueue(jobNm, args) {
        let job = queues.create(jobNm, {
            args
        })
        return job;
    }

    static execJob(methodNm, args, done) {
        try {
            const result = await modelHelpers[methodNm](...args);
            done && done(null, result);
        } catch (error) {
            done && done(new Error(`${methodNm} __job error`));
        }
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api.html#model_Model.findOne}
     * @param {Schema} model The Schema instance
     * @param {Object} conditions Conditions
     * @param {Object} populateSchema  Optional fields to return, see Query.prototype.select()
     * @param {Object} options Optional see Query.prototype.setOptions()
     * @param {Boolean} options.defaultDocsFlg if default reponse then docsFlg = true
     * @returns {Promise} docs
     */
    findOne(...args) {
        let job = handleQueue('model_findOne', args);
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.find}
     * @param {*} model
     * @param {*} conditions
     * @param {*} populateSchema
     * @param {*} options
     */
    static async findAll(...args) {
        return modelHelpers.findAll(...args)
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api.html#model_Model.create}
     * @param {*} model
     * @param {*} docs
     * @param {*} populateSchema
     * @param {*} options
     */
    static async create(...args) {
        return modelHelpers.create(...args)
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate}
     * @param {*} model
     * @param {*} conditions
     * @param {*} update
     * @param {*} options
     */
    static async update(...args) {
        return modelHelpers.update(...args)
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete}
     * @param {*} model
     * @param {*} conditions
     * @param {*} options
     */
    static async delete(...args) {
        return modelHelpers.update(...args)
    }

    /**
     * @see {@link https://mongoosejs.com/docs/api/query.html#query_Query-deleteMany}
     * @param {*} model
     * @param {*} conditions filter
     * @param {*} options
     */
    static async deleteMany(...args) {
        return modelHelpers.deleteMany(...args)
    }

    /**
     *
     * @param {*} model
     * @param {*} conditions
     * @param {*} options
     */
    static async softDelete(...args) {
        return modelHelpers.softDelete(...args)
    }

    /**
     *
     * @param {*} model
     * @param {*} conditions
     * @param {*} options
     */
    static async hardDelete(...args) {
        return modelHelpers.softDelete(...args)
    }

    /**
     *
     * @param {*} model
     * @param {*} conditions
     * @param {*} options
     */
    static async recover(...args) {
        return modelHelpers.recover(...args)
    }

}

export default JobHelpers;