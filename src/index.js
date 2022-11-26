const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const rootCollectionRouter = require('./routers/rootcollection')
const collectionRouter = require('./routers/collection')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(rootCollectionRouter)
app.use(collectionRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})