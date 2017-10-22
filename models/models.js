const uuid = require('uuid/v4')
const _ = require('lodash')
const fs = require('fs')
let books = []

function getAll(){
    readFile()
    return books
}

function getAllAuth(id){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) errors = { status: 404, message: 'Could not find the book.' }
    if (errors) {
        response = { errors } 
    } else {
        response = book.authors
    }
    return response
}

function getOne(id){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) errors = { status: 404, message: 'Could not find the book.' }
    if (errors) {
        response = { errors } 
    } else {
        response = book
    }
    return response
}

function getOneAuth(id, authId){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) {
        errors = {status: 404, message: "Book not found"}
        return { errors }
    }
    const auth = book.authors.find(auth => auth.id === authId)
    if (!auth){
        errors = {status: 404, message: "Author not found"}
        return { errors }
    }
    return auth
}

function create (body) {
    readFile()
    let errors
    const name = body.name
    const borrowed = body.borrowed
    const description = body.description || ''
    const authors = []
    let response
    if (!name || borrowed == undefined) {
        errors = {status: 404, message: "All fields are required."}
        response = { errors }
    } else {
    const book = { id: uuid(), name, borrowed, description, authors }
        books.push(book)
        response = book
    }
    writeFile()
    return response
}

function createAuth (bookId, body) {
    readFile()
    let errors
    const firstName = body.firstName
    const lastName = body.lastName
    let response
    const idNum = {id: bookId}
    const findBook = _.find(books, idNum)

    if (!findBook) {
        errors = { status: 404, message: 'Could not find the book.' }
        response = { errors }
        return response
    }

    if (!firstName || !lastName) {
        errors = { status: 400, message: 'All fields are required'}
        response = { errors }
    } else {
        const auth = { id: uuid(), firstName, lastName }
        findBook.authors.push(auth)
        response = auth
    }
    writeFile()
    return response
}

function update (id, body){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) {
        errors = { status: 404, message: 'Could not find the book.' }
        response = { errors }
        return response
    } else {
        if (body.name) book.name = body.name
        if (body.borrowed) book.borrowed = body.borrowed
        if (body.description) book.description = body.description
        if (body.authors) book.authors = body.authors
    }
    response = book
    writeFile()
    return response
}

function updateAuth (id, authId, body){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) {
        errors = {status: 404, message: "Book not found"}
        return { errors }
    }
    const auth = book.authors.find(auth => auth.id === authId)
    if (!auth){
        errors = {status: 404, message: "Author not found"}
        return { errors }
    } else {
        if (body.firstName) auth.firstName = body.firstName
        if (body.lastName) auth.lastName = body.lastName
    }
    writeFile()
    return auth
}

function deleteOne(id){
    readFile()
    let errors
    let response
    const book = books.find(book => book.id === id)
    if (!book) {
        errors = {status: 404, message: "Book not found"}
        return { errors }
    }
    response = book
    const index = books.indexOf(book)
    books.splice(index, 1)
    writeFile()
    return response
}

function deleteOneAuth (id, authId){
    readFile()
    let errors
    const book = books.find(book => book.id === id)
    if (!book) {
        errors = {status: 404, message: "Book not found"}
        return { errors }
    }
    const auth = book.authors.find(auth => auth.id === authId)
    if (!auth){
        errors = {status: 404, message: "Author not found"}
        return { errors }
    }
    const index = book.authors.indexOf(auth)
    book.authors.splice(index, 1)
    writeFile()
    return auth
}

function readFile(){
    const current = JSON.parse(fs.readFileSync('storage.json', 'utf-8'))
    books = current.books
}

function writeFile(){
    let jsonContent = JSON.stringify({books})
    fs.writeFileSync('storage.json', jsonContent)
}

module.exports = { getAll, getAllAuth, getOne, getOneAuth, create, createAuth, update, updateAuth, deleteOne, deleteOneAuth, readFile, writeFile }