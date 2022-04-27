const express = require( 'express' ),

area1 = require( './area1/index' );
area2 = require( './area2/index' );
area3 = require( './area3/index' );

const router = express.Router();

router.use( '/area1', area1 );
router.use( '/area2', area2 );
router.use( '/area3', area3 );

module.exports = router;