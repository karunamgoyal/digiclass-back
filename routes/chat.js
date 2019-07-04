const router = require('express').Router();
const auth = require('../middlewares/auth');
const handle = require('../handlers')
router
    .route('/:id')
    .get(auth,handle.getChat)
    .post(auth,handle.postChat);

    module.exports = router;
