
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./Models/person')


app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))


const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}
  app.get('/info', (req, res) => {
   // res.send(res.Date)
    const date = Date(req.header.date)
    let count = 0

    Person
    .find({})
    .then(result => {
      result.forEach(person => {
      //  console.log(person)
        count++
        console.log(count)
      })
      console.log(date)
    res.write('<p> puhelinluettelossa on ' + count +  ' henkilön tiedot</p></br>')
    res.write(date)
    res.send()
    })    
  })
  

  app.get('/api/persons/:id', (request, response) => {
    Person
    .findById(request.params.id)
    .then(person => {
      response.json(formatPerson(person))
    })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({ error: 'name is missing' })
    }
    if (body.number === undefined) {
      return response.status(400).json({ error: 'number is missing' })
    }
    /*
    const personToFind = Person.find({}).find(person => person.name === body.name)
    if (personToFind) {
      return response.status(400).json({ error: 'name must be unique' })
    }
*/
    const person = new Person ({
      name: body.name,
      number: body.number,
    })
    person
    .save()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  })

  app.put('/api/persons/:id', (request, response) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number
    }
  
    Person
      .findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(formatPerson(updatedPerson))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
  })

  app.get('/api/persons', (req, res) => {
    Person
    .find({})
    .then(persons => {
      res.json(persons.map(formatPerson))
    })
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })