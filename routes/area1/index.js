const express = require('express'),
{ area1: controller } = require('../../controllers');

const router = express.Router();

router.route('/create')
  .post(controller.create);

router.route('/get')
  .post(controller.get);

router.route('/nuke')
  .get(controller.nuke);


module.exports = router;