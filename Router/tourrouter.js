const express = require('express');
const tourController = require('./../dev-data/Controller/tourcontroller')
/*app.get('/api/v1/tours/:id', getTour );

app.post('/api/v1/tours', createTour);

app.patch('/api/v1/tours', updateTour);

app.delete('/api/v1/tours', deleteTour);*/

const router = express.Router();
//router.param('id', tourController.checkID);

router.route('/top-five-tours').get(tourController.aliasTopFive,tourController.getAllTour)

router.route('/').post(tourController.createTour).delete(tourController.deleteTour).get(tourController.getAllTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour);

module.exports = router;
