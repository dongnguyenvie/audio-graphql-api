import { AuthenticationError } from 'apollo-server'

export default {
  Query: {
    post: async (parent, { id }, { models, me }, info) => {
      const post = await models.post.findById({ _id: id }).exec()
      return post
    },
    posts: async (parent, args, { models, me }, info) => {
      const posts = await models.post.find({ author: me.id }).exec()
      return posts
    }
  },
  Mutation: {
    createPost: async (parent, { title, content }, { models, me }, info) => {
      const post = await models.post.create({ title, content, author: me.id })
      return post
    }
  }
}
