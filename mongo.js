
const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekret@ds229388.mlab.com:29388/fullstack-vko3'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {

  name: String,
  number: String
})

Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })