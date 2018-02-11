const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekret@ds229388.mlab.com:29388/fullstack-vko3'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

Note
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })



const note = new Note({
  content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
  date: new Date(),
  important: false
})
note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
