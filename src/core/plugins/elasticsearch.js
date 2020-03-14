const { Client } = require('@elastic/elasticsearch')
import config from '../../../config'
import axios from 'axios'
import url from 'url'

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
      // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
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
      // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
      body,
      ...options
    })
  }

  static deleteIndex() {
    if (!_ELASTICSEARCH_UPDATE_INDEX) {
      return
    }
    return axios.delete(url.resolve(_ELASTICSEARCH_URI, _INDEX))
  }

  static getAllFieldNm() {
    return axios.get(url.resolve(_ELASTICSEARCH_URI, _INDEX + '/_mapping?pretty'))
  }
}
