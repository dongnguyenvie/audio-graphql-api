const { Client } = require('@elastic/elasticsearch')
import config from '../../../config'
import axios from 'axios'
import url from 'url'
import _ from 'lodash'

const _ELASTICSEARCH_URI = config.ELASTICSEARCH_URI || 'http://localhost:9200'
const _ELASTICSEARCH_UPDATE_INDEX = config.ELASTICSEARCH_UPDATE_INDEX || false
const client = new Client({ node: _ELASTICSEARCH_URI })
const _INDEX = 'audiovyvy'

export default class Elasticsearch {
  static index(body, options = {}) {
    if (!body) {
      return null
    }
    return client.index({
      index: _INDEX,
      body,
      ...options
    })
  }

  static bulk(body, options = {}) {
    if (!body) {
      return null
    }
    return client.bulk({
      index: _INDEX,
      body,
      ...options
    })
  }

  static search(body, options) {
    if (!body) {
      return null
    }
    return client.search({
      index: _INDEX,
      body,
      ...options
    })
  }

  static async syncData(data, key, fields = '', options = {}) {
    let _data = await data
    _data = _.get(_data, 'result')
    const _fields = [...fields.split(' '), 'id']
    const _index = _.pick(_data, _fields)
    this.index({ [key]: _index }, options)
  }

  static deleteIndex() {
    return new Promise(async resolve => {
      if (!_ELASTICSEARCH_UPDATE_INDEX) {
        resolve(true)
      }
      try {
        resolve(await axios.delete(url.resolve(_ELASTICSEARCH_URI, _INDEX)))
      } catch (error) {
        resolve(true)
      }
    })
  }

  static getAllFieldNm() {
    return axios.get(url.resolve(_ELASTICSEARCH_URI, _INDEX + '/_mapping?pretty'))
  }
}
