const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const noteRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB',error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', noteRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app





// const express = require('express');
// const cors = require('cors')
// const app = express();

// app.use(express.json())
// //允许跨域
// app.use(cors())

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
// ]
// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }
// app.post('/api/notes', (request, response) => {
//     const body = request.body
//     if (!body.content) {
//         return response.status(400).json({
//             error: "content missing"
//         })
//     }
//     const note = {
//         content: body.content,
//         important: body.important || false,
//         data: new Date(),
//         id: generateId(),
//     }
//     notes = notes.concat(note)
//     response.json(note)
// })

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//     response.json(notes)
// })
// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)
//     if (note) {
//         response.json(note)
//     } else {
//         response.status(404).end()
//     }
// })
// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
//     response.status(204).end()
// })

// const PORT = process.env.PORT || 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
