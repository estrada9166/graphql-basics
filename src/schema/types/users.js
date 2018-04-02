const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const { verifyJwt } = require('../../utils')

const pgdb = require('../../models/pgdb')

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => {
    const PlacesType = require('./places')
    return {
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      visitedPlaces: {
        type: new GraphQLList(PlacesType),
        resolve: async (obj, args, { pgPool, req }) => {
          try {
            await verifyJwt(req)
            return pgdb(pgPool).getVisitedPlaces(obj.id)
          } catch (err) {
            return []
          }
        }
      }
    }
  }
})

module.exports = UsersType
