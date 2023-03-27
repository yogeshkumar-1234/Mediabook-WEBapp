import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => res.send('Hello to Memories API'))

const PORT = process.env.PORT || 5000
// process.env.CONNECTION_URL
mongoose // https://www.mongodb.com/cloud/atlas
	// .connect('mongodb+srv://Yogesh-Kumar:smHYh70lQqN0Y4bO@cluster0.spgph.mongodb.net/?retryWrites=true&w=majority')
	.connect(process.env.MONGO_URL)
	.then(console.log('Connected to MongoDB Database 🌐'))
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} 🚀`)))
	.catch((error) => console.log(`❎ Server did not connect ⚠️\n${error}`))

// CONFIGURE Connection URL: https://stackoverflow.com/questions/25090524/hide-mongodb-password-using-heroku-so-i-can-also-push-to-public-repo-on-github
// CONFIGURE AUTODEPLOY From Github:
// https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
// https://github.com/timanovsky/subdir-heroku-buildpack
