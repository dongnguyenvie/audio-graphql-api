import { ApolloError } from 'apollo-server'
import model from '../models'
import helper from '../helper/model'
import bcrypt from 'bcrypt'
import Seeder from '../modules/seeder'
import elastic from '../plugins/elasticsearch'
import _ from 'lodash'
const _models = model;

/**
 * @Main
 */
export default class DatabaseSeeder extends Seeder {
  constructor() {
    super()
    this.run()
  }
  async run() {
    let count = 0
    const seedWoker = setInterval(async () => {
      console.log('>>> Stared worker')
      count++
      if (_models.user.find) {
        clearInterval(seedWoker) // End worker
        await new RoleSeeder(_models, 'RoleSeeder').run()
        await new UserSeeder(_models, 'UserSeeder').run()
        await new BlogSeeder(_models, 'BlogSeeder').run()
        await new PostSeeder(_models, 'PostSeeder').run()
        await new syncDataToElasticsearch(_models, 'SyncData to elasticsearch').run()
        console.log('>>> Finished worker')
      }
      if (count > 10) {
        clearInterval(seedWoker) // End worker
        console.log('>>> end worker:: erorrs')
      }
    }, 1000)
  }
}

class RoleSeeder extends Seeder {
  async run() {
    const _roles = []
    const ROLES = [{ permission: 'ADMIN' }, { permission: 'USER' }, { permission: 'MANAGE' }, { permission: 'REVIEWER' }]
    ROLES.forEach(role => {
      _roles.push({ name: role.permission, permission: role.permission })
    })
    return initData(_roles, this.models.role, 'name')
  }
}

class UserSeeder extends Seeder {
  async run() {
    const _user = {
      username: 'dong.nguyen',
      fullName: 'nguyen quy dong',
      avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      email: 'dongnguyenvie@gmail.com',
      phone: '0347884884',
      password: '123',
      roles: []
    }
    const adminRole = await helper.findOne(this.models.role, { permission: 'ADMIN' }, { projection: 'id' }, { defaultDocsFlg: true })
    const adminUser = await helper.findOne(this.models.role, { permission: 'USER' }, { projection: 'id' }, { defaultDocsFlg: true })
    const adminManage = await helper.findOne(this.models.role, { permission: 'MANAGE' }, { projection: 'id' }, { defaultDocsFlg: true })
    const _roles = [adminRole, adminUser, adminManage].map(role => role._id)
    _user.roles = _roles
    _user.password = bcrypt.hashSync(_user.password, 12)
    return initData([_user], this.models.user, 'username')
  }
}
class BlogSeeder extends Seeder {
  async run() {
    const blogOfDong = {
      title: 'Blog of Dong Nguyen',
      content: 'This is content blog',
      metaData: '5de746abda0a9b005f69a937', // Hard
      user: null
    }
    const dongUser = await helper.findOne(this.models.user, { username: 'dong.nguyen' }, { projection: 'id' }, { defaultDocsFlg: true })
    blogOfDong.user = dongUser._id
    return initData([blogOfDong], this.models.blog, 'title')
  }
}

class PostSeeder extends Seeder {
  async run() {
    const _posts = []
    const dongUser = await helper.findOne(this.models.user, { username: 'dong.nguyen' }, { projection: 'id' }, { defaultDocsFlg: true })
    const dongBlog = await helper.findOne(this.models.blog, { user: dongUser._id }, { projection: 'id' }, { defaultDocsFlg: true })
    while (_posts.length < 5) {
      const _index = _posts.length
      _posts.push({
        title: `title ${_index}`,
        content: `content ${_index}`,
        categories: ['5e1439fa94b2a5047f29d5f4'], // HARD
        tags: ['tien_hiep'],
        user: dongUser._id,
        blog: dongBlog._id
      })
    }
    return initData(_posts, this.models.post)
  }
}

class syncDataToElasticsearch extends Seeder {
  async run() {
    await elastic.deleteIndex()
    const perPage = 1000
    const getRecords = (model, fields, options) => {
      return model.find({}, fields, options)
    }

    const asyncData = async (model, key, fields, page = 0) => {
      let _page = Math.max(0, page)
      const _perPage = perPage
      const _options = {
        limit: _perPage,
        skip: _perPage * _page
      }
      const _records = await getRecords(model, fields, _options)
      const _pickKey = [...fields.split(' '), 'id']
      const _bulkData = _records.flatMap(_record => [{ index: { _index: 'audiovyvy', _type: '_doc' } }, { [key]: _.pick(_record, _pickKey) }])
      elastic.bulk(_bulkData)

      setTimeout(() => {
        if (_records.length === perPage) {
          _page++
          asyncData(model, key, fields, _page)
        }
      }, 1000)
    }

    asyncData(this.models.post, 'posts', 'title content categories user blog id metaData')
  }
}

function initData(list, model, field) {
  return new Promise(async resolve => {
    const existingDocs = await model.find()
    const existingDocNames = existingDocs.map(doc => doc[field])
    const newDocs = list.filter(doc => !existingDocNames.includes(doc[field]))
    if (newDocs.length) {
      const docsCreated = await model.insertMany(newDocs)

      if (!docsCreated) {
        resolve(true)
        throw new ApolloError('Init data sync failed!', '500')
      }
      resolve(true)
    }
    resolve(true)
  })
}
