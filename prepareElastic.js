var elastic = require('elasticsearch')

var client = new elastic.Client({ host: 'localhost:9200' })
var index = 'myindex'
var type = 'document'

;(function init() {
  Promise.resolve()
    .then(deleteIndex, handleError)
    .then(createIndex, handleError)
    .then(checkStatus, handleError)
    .then(closeIndex, handleError)
    .then(putSettings, handleError)
    .then(putMapping, handleError)
    .then(openIndex, handleError)
})()

function deleteIndex() {
  console.log('Deleting old index ...')

  return client.indices
    .delete({
      index: index,
      ignore: [404]
    })
    .then(handleResolve)
}

function createIndex() {
  console.log('Creating new index ...')

  return client.indices
    .create({
      index: index,
      body: {
        settings: {
          index: {
            number_of_replicas: 0 // for local development
          }
        }
      }
    })
    .then(handleResolve)
}

// This isn't strictly necessary, but it solves a problem with closing
// the index before it has been created
function checkStatus() {
  console.log('Checking status ...')

  return client.cluster
    .health({
      index: index
    })
    .then(handleResolve)
}

function closeIndex() {
  console.log('Closing index ...')

  return client.indices
    .close({
      index: index
    })
    .then(handleResolve)
}

function putSettings() {
  console.log('Put settings ...')

  return client.indices
    .putSettings({
      index: index,
      type: type,
      body: {
        settings: {
          analysis: {
            analyzer: {
              folding: {
                tokenizer: 'standard',
                filter: ['lowercase', 'asciifolding']
              }
            }
          }
        }
      }
    })
    .then(handleResolve)
}

function putMapping() {
  console.log('Put mapping ...')

  return client.indices
    .putMapping({
      index: index,
      type: type,
      body: {
        properties: {
          body: {
            type: 'string',
            analyzer: 'standard',
            fields: {
              folded: {
                type: 'string',
                analyzer: 'folding'
              }
            }
          }
        }
      }
    })
    .then(handleResolve)
}

function openIndex() {
  console.log('Open index ...')

  return client.indices
    .open({
      index: index
    })
    .then(handleResolve)
}

function handleResolve(body) {
  if (!body.error) {
    console.log('\x1b[32m' + 'Success' + '\x1b[37m')
  } else {
    console.log('\x1b[33m' + 'Failed' + '\x1b[37m')
  }

  return Promise.resolve()
}

function handleError(err) {
  console.error(JSON.stringify(err.body, null, 2))

  return Promise.reject()
}
