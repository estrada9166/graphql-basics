const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const { verifyJwt } = require('../../utils')

const pgdb = require('../../models/pgdb')
const UsersType = require('../types/users')

const VisitedInputType = new GraphQLInputObjectType({
  name: 'VisitedInput',
  fields: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    place: { type: GraphQLNonNull(GraphQLString) }
  }
})

module.exports = {
  type: UsersType,
  description: 'This mutation will add a new visited place',
  args: {
    input: { type: new GraphQLNonNull(VisitedInputType) }
  },
  resolve: async (obj, { input }, { pgPool, req }) => {
    await verifyJwt(req)
    await pgdb(pgPool).addNewVisitedPlace(input)
    return pgdb(pgPool).getUserById(input.userId)
  }
}
