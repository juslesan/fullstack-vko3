
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
//app.use(express.static('build'))


let persons = [
    {
      id: 1,
      name: 'Arto Hellas',
      number: '0456789123',
    },
    {
      id: 2,
      content: 'Matti Luukkainen',
      date: '05012312313',
    },
    {
      id: 3,
      content: 'Kenkämies',
      date: '04012334124',
    }
  ]
  
  app.get('/info', (req, res) => {
   // res.send(res.Date)
    const date = Date(req.header.date)
    console.log(date)
    res.write('<p> puhelinluettelossa on ' +persons.length+  ' henkilön tiedot</p></br>')
    res.write(date)
    res.send()
    
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(persons.name)

    if (body.name === undefined) {
      return response.status(400).json({ error: 'name is missing' })
    }
    if (body.number === undefined) {
      return response.status(400).json({ error: 'number is missing' })
    }
    const personToFind = persons.find(person => person.name === body.name)
    if (personToFind) {
      return response.status(400).json({ error: 'name must be unique' })
    }
    

  
    const person = {
      name: body.name,
      number: body.number,
      id: Math.random(10000000)
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })