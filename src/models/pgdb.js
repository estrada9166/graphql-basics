const { signToken } = require('../utils')

module.exports = pgPool => {
  return {
    addNewUser ({ username, email }) {
      return pgPool.query(`
        insert into users (username, email) values ($1, $2) returning *
      `, [username, email])
        .then(res => {
          const user = res.rows[0]
          user.apiKey = signToken(user)
          return user
        })
    },

    addNewVisitedPlace ({ userId, place }) {
      return pgPool.query(`
        insert into visitedplaces (user_id, place) values ($1, $2) returning *
      `, [userId, place])
        .then(res => {
          return res.rows[0]
        })
    },

    getUserById (userId) {
      return pgPool.query(`
        select * from users where id = $1
      `, [userId])
        .then(res => {
          return res.rows[0]
        })
    },

    getVisitedPlaces (userId) {
      return pgPool.query(`
        select place from visitedplaces where user_id = $1
      `, [userId])
        .then(res => {
          return res.rows
        })
    }
  }
}
