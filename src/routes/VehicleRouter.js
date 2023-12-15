const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')

const router = require('express').Router()

router.post('/register', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('RegisterVehicleController')
    controller.execute(req, res)
})

router.get('/get/:vehicleId', async (req, res) => {
    const controller = req.app.get('GetVehicleDetailsController')
    controller.execute(req, res)
})

router.get('/filter', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('FilterVehiclesController')
    controller.execute(req, res)
})

router.put('/edit', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('EditVehicleController')
    controller.execute(req, res)
})

router.delete('/delete/:vehicleid', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('DeleteVehicleController')
    controller.execute(req, res)
})

router.post('/brands/register', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('RegisterBrandController')
    controller.execute(req, res)
})

router.put('/brands/edit', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('EditBrandController')
    controller.execute(req, res)
})

router.delete('/brands/delete/:brandid', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('DeleteBrandController')
    controller.execute(req, res)
})

router.post('/gastype/register', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('RegisterGasTypeController')
    controller.execute(req, res)
})

router.put('/gastype/edit', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('EditGasTypeController')
    controller.execute(req, res)
})

router.delete('/gastype/delete/:gastypeid', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('DeleteGasTypeController')
    controller.execute(req, res)
})

module.exports = router