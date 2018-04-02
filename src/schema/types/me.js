const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const MeType = new GraphQLObjectType({
  name: 'Me',
  fields: () => {
    return {
      id: { type: GraphQLNonNull(GraphQLID) },
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      apiKey: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})

module.exports = MeType
