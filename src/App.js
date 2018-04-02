const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const pg = require('pg')

const pgPool = new pg.Pool({ database: 'visitedplaces' })

const app = express()

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: 'development.env' })
}

app.set('port', process.env.PORT || 7000)

const ncSchema = require('./schema')

app.use('/graphql', cors(), (req, res) => {
  graphqlHTTP({
    schema: ncSchema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { pgPool, req }
  })(req, res)
})

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`)
})

module.exports = app
