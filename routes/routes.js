const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controllers')

router.get('/', ctrl.getAll)
router.get('/:id/auth', ctrl.getAllAuth)
router.get('/:id', ctrl.getOne)
router.get('/:id/auth/:authId', ctrl.getOneAuth)
router.post('/', ctrl.create)
router.post('/:id', ctrl.createAuth)
router.put('/:id', ctrl.update)
router.put('/:id/auth/:authId', ctrl.updateAuth)
router.delete('/:id', ctrl.deleteOne)
router.delete('/:id/auth/:authId', ctrl.deleteOneAuth)

module.exports = router