import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import schema from './schema/schema.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

mongoose.connect(
	'mongodb+srv://Ramon:X4YJjX6Tlaw4vonN@cluster-ql.yon4db6.mongodb.net/?retryWrites=true&w=majority'
)

mongoose.connection.once('open', () => {
	console.log('Connected to database')
})

app.use(cors())

app.use(
	'/graphql',
	createHandler({
		schema
	})
)

app.listen(4000, () => {
	console.log('Server is running on port 4000')
})
