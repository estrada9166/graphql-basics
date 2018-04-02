const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const PlacesType = new GraphQLObjectType({
  name: 'Place',
  fields: () => {
    return {
      place: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})

module.exports = PlacesType
