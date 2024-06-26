// to excecute models
const model = require("../models/taskModel.js");

//create new task If the request body is missing title or description or points, return 400 Bad Request.
module.exports.createNewTasks = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined|| req.body.image == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        title : req.body.title,
        description : req.body.description,
        image : req.body.image,
        points : req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {
            const newtaskId = results.insertId;
            res.status(201).json({
                message: "task created successfully.",
                taskId: newtaskId,
                title: data.title,
                description: data.description,
                image: data.image,
                points:data.points

        });
        };
    };

    model.createNewTasks(data, callback);
};

//read all tasks if successful Status Code: 200 OK 
module.exports.readAllTasks= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllTasks:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.readAllTasks(callback);
}


//read tasks by task id If the requested task_id does not exist, return 404 Not Found. if successful Status code 200 OK
module.exports.readTasksByIds = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.readTasksByIds(data, callback);
}

//update task by id If the requested task_id does not exist, return 404 Not Found.If the request body is missing title or description or points, return 400 Bad Request. 
module.exports.updateTasksByIds = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined ||req.body.image == undefined || req.body.points == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        id: req.params.id,
        title : req.body.title,
        description : req.body.description,
        image : req.body.image,
        points : req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) {
                res.status(404).json({
                    message: "task not found"
                });
            } else {
                res.status(201).json({
                    message: "task updated successfully.",
                    taskid: data.id,
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    points:data.points
                });
            }
        }
    }
    model.updateTasksByIds(data, callback);
};    

//delete task by id If the requested task_id does not exist, return 404 Not Found if ok satatus code 204 no content

module.exports.deleteTasksByIds = (req, res, next) =>
{
    const data = {
        id: req.params.id,
    }

    if(req.params.id !== data.id)
    {
        res.status(400).json({
            message: "task not found."
        });
        return;    
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "task not found."
                });
            }
            else res.status(204).json({
                message: "task deleted."
            });            
        };
    };
    model.deleteTasksByIds(data, callback);
}; 



