const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const rootCollectionRouter = require('./routers/rootcollection')
const collectionRouter = require('./routers/collection')
const itemRouter = require('./routers/item')
const attributeRouter = require('./routers/attribute')
const valueRouter = require('./routers/value')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(rootCollectionRouter)
app.use(collectionRouter)
app.use(itemRouter)
app.use(attributeRouter)
app.use(valueRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})