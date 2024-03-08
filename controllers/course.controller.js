import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';




const getAllCourses = async function(req, res, next){
try {
     const courses = await Course.find({}).select('-lectures');
    
        res.status(200).json({
            success: true,
            message: 'All courses',                     
            courses,
        });
} catch(e) {
    return next(
        new AppError(e.message, 500)
      )
    }
}


const getLecturesByCourseId = async function(req, res, next){
    try {
        const {id} = req.params;
        //console.log('Course Id >',id);
        const course = await Course.findById(id);
        //console.log('Course Details',course);
        if(!course){
            return next(
                new AppError('Invalid Course id >', 400)
              )
        }

        res.status(200).json({
            success: true,
            message: 'Course lecture fetched successfully',
            lecture: course.lectures
        });
    } catch (e) {
        return next(
            new AppError(e.message, 500)
          )
    }
}

const createCourse = async(req, res, next)=>{
    const {title, description, category, createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(
            new AppError('All fields are required', 400)
          )
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id:'Dummy' ,
            secure_url: 'Dummy',
        },
    });

    if(!course){
        return next(
            new AppError('Course could not created, please try again', 500)
          )
    }
  
    if(req.file){
        try{

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'EduWave', // Save files in a folder named EduWave
            });
            console.log( JSON.stringify (result));
            if(result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
    
            fs.rm(`uploads/${req.file.filename}`);
        }catch(e){
            return next(
                new AppError(e.message, 500)
                )
        }
    }

   await course.save();  // Save the course to the database

   res.status(200).json({
         success: true,
         message: 'Course created successfully',
         course,
    });
   
}
const updateCourse = async(req, res, next)=>{
      try{
            const {id} = req.params;
            const course = await Course.findByIdAndUpdate(
                id, 
                {
                    $set: req.body,  // Update the course with the request body
                },
                {
                    runValidators: true,  // Validate the request body
                }
            );

            if(!course){
                return next(
                    new AppError('Course with given id does not exist', 500)
                  )
            }
            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                course,
            });

      }catch(e){
          return next(
              new AppError(e.message, 500)
            )
      }
}

const removeCourse = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Course with given id does not exist', 500)
              )
        }

        await Course.findByIdAndDelete(id); // Remove the course from the database
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
        });

    }catch(e){
        return next(
            new AppError(e.message, 500)
          )
    }
}

const addLectureToCourseById = async(req, res, next)=>{

    try{

        
    const {title, description} = req.body;
    const {id} = req.params;

    if(!title || !description){
        return next(
            new AppError('All fields are required', 400)
          )
    }

    const course = await Course.findById(id);

    if(!course){
        return next(
            new AppError('Course with given id does not exist', 500)
          )
    }

    const lectureData = {
        title,
        description,
        lecture:{}
    
    };

    if(req.file){
        try{

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'EduWave', // Save files in a folder named EduWave
            });
            console.log( JSON.stringify (result));

            // If the file is uploaded to cloudinary, save the public_id and secure_url to the lectureData
            if(result){
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            }
    
            fs.rm(`uploads/${req.file.filename}`);
        }catch(e){
            return next(
                new AppError(e.message, 500)
            )
        }
    }

    console.log('lecture >', JSON.stringify(lectureData));
    course.lectures.push(lectureData); // Add the lecture to the course

    course.numberOfLectures = course.lectures.length; // Update the number of lectures in the course

    await course.save(); // Save the course to the database

    res.status(200).json({
        success: true,
        message: 'Lecture added to course successfully',
        course,  // Return the updated course
    });

    }catch(e){
        return next(
            new AppError(e.message, 500)
        )
    }
}


export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
}