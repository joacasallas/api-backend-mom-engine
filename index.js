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
    firstName: 'Joana1 cargue inicial OTRAVEZ desde API',
    lastName: 'Casallas',
    email: 'joacasallas@gmail.com',
    username: 'joacasallas',
    foundationName: 'Proyecta Studio',
    phoneNumber: '3105625314',
    password: 'Holberton123',
    date: '2021',
    vendor: Math.random() > 0.5
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

  if (!note) {
    return response.status(400).json({
      error: 'note is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    firstName: note.firstName,
    lastName: note.lastName,
    email: note.email,
    username: note.username,
    foundationName: note.foundationName,
    password: note.password,
    phoneNumber: note.phone,
    vendor: typeof note.vendor !== 'undefined' ? note.vendor : false,
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

// const PORT = 3001
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port' ${PORT}`)
})
