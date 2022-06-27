const express = require('express')
const cors = require('cors')
// const http = require('http') //commun js
// import http from 'http' // ecmascript moduls
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    firstName: 'Joana1 cargue inicial desde API',
    lastName: 'Casallas',
    email: 'joacasallas@gmail.com',
    userName: 'joacasallas',
    foundationName: 'Proyecta Studio',
    phoneNumber: '3105625314',
    password: 'Holberton123',
    date: '2021',
    important: Math.random() > 0.5
  }
]

/*
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'application/json'})
    response.end(JSON.stringify(notes))
})
*/

app.get('/', (request, response) => {
  response.send('<h1>Mom Engine API</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)
  // notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port' ${PORT}`)
})
