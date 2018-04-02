const { GraphQLID, GraphQLNonNull } = require('graphql')
const UserType = require('../types/users')

const pgdb = require('../../models/pgdb')

module.exports = {
  type: UserType,
  description: 'This query will search for a user with a specific userId',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (obj, { userId }, { pgPool }) {
    return pgdb(pgPool).getUserById(userId)
  }
}
