import { Router } from 'express';
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse} from '../controllers/course.controller.js';
import { authorizeRole, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizeRole('ADMIN'),
        upload.single('thumbnail'),
        createCourse
        );
  //  .put(updateCourse)
  //  .delete(removeCourse)

router.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(
        isLoggedIn,
        authorizeRole('ADMIN'),
        updateCourse
        )
    .delete(
        isLoggedIn,
        authorizeRole('ADMIN'), 
        removeCourse
        )
    .post(
        isLoggedIn,
        authorizeRole('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById
        );

export default router;