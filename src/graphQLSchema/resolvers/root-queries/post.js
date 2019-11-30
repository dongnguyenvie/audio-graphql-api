export default {
    Post: {
        author: async ({ author}, args, { models }, info) => {
            const user = await models.user.findById({ _id: author }).exec();
            return user;
        },
    },
}