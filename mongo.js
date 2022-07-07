const mongoose = require('mongoose')
const password = require('./password.js')
const { model, Schema } = mongoose

const connectionString = `mongodb+srv://joacasallas:${password}@cluster0.xgx5c.mongodb.net/MOM1?retryWrites=true&w=majority`

// conexion a MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

const noteSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  foundationName: String,
  phoneNumber: String,
  password: String,
  date: Date,
  vendor: Boolean
})

const Note = model('Note', noteSchema)

const note = new Note({
  firstName: 'Joana1 API con Mongoose',
  lastName: 'Casallas',
  email: 'joacasallas@gmail.com',
  username: 'joacasallas',
  foundationName: 'Proyecta Studio',
  phoneNumber: '3105625314',
  password: 'Holberton123',
  date: '2021',
  vendor: Math.random() > 0.5
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  }).catch(err => {
    console.error(err)
  })
