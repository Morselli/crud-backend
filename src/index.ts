import 'reflect-metadata'
import express = require('express')
import cors = require('cors')
import { router } from './routes/'
import { AppDataSource } from './database/data-source'

AppDataSource.initialize().then(() => {
    const app = express()
    const port = 3333

    app.use(cors())
    app.use(express.json())

    app.use('/api/v1', router)

    app.listen(port, () => console.log(`Server listening on port ${port}`))
})
