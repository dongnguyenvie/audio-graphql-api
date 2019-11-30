export default {
    User: {
        posts: async ({ id }, args, { models }, info) => {
            const posts = await models.post.find({ author: id }).exec();
            return posts;
        },
    },
}