const model = require('../models/models')

function getAll (req, res, next) {
  const result = model.getAll()
  res.json({ data: result })
}

function getAllAuth (req, res, next) {
  const result = model.getAllAuth(req.params.id)
  if (result.errors) return next(result.errors)
  res.json({ data: result })
}

function getOne (req, res, next) {
  const result = model.getOne(req.params.id)
  if (result.errors) return next(result.errors)
  res.json({ data: result })
}

function getOneAuth (req, res, next) {
  const result = model.getOneAuth(req.params.id, req.params.authId)
  if (result.errors) return next(result.errors)
  res.json({ data: result })
}

function create (req, res, next) {
  const result = model.create(req.body)
  if (result.errors) return next(result.errors)
  res.status(201).json({ data: result })
}

function createAuth (req, res, next) {
  const result = model.createAuth(req.params.id, req.body)
  if (result.errors) return next(result.errors)
  res.status(201).json({ data: result })
}

function update (req, res, next) {
  const result = model.update(req.params.id, req.body)
  if (result.errors) return next(result.errors)
  if (!req.body.name || req.body.borrowed == undefined) return next({ status: 400, message: `Fields name and borrowed are required` })
  res.status(200).json({ data: result })
}

function updateAuth (req, res, next) {
  const result = model.updateAuth(req.params.id, req.params.authId, req.body)
  if (result.errors) return next(result.errors)
  if (!req.body.firstName || !req.body.lastName) return next({ status: 400, message: `Field first name and last name are required` })

  res.status(200).json({ data: result })
}

function deleteOne (req, res, next) {
  const result = model.deleteOne(req.params.id)
  if (result.errors) return next(result.errors)
  res.status(204).json()
}

function deleteOneAuth (req, res, next) {
  const result = model.deleteOneAuth(req.params.id, req.params.authId)
  if (result.errors) return next(result.errors)
  res.status(200).json({ data: result })
}

module.exports = { getAll, getAllAuth, getOne, getOneAuth, create, createAuth, update, updateAuth, deleteOne, deleteOneAuth }