const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');
router
    .route('/')
    .get(handle.showCourses)
    .post(auth,handle.createCourse);

router
    .route('/usercourse')
    .get(auth,handle.userCourses);

router
    .route('/:id')
    .get(handle.getCourse)
    .post(auth,handle.post);

router
    .route('/enroll/:id')
    .post(auth,handle.enroll);
module.exports= router;
