const model = require("../models/taskprogressModel.js");

//create new taskprogress  If the request body is missing completion_date, return 400 Bad Request.

module.exports.createNewTaskProgresses = (req, res, next) =>
{
    if(req.body.user_id == undefined || req.body.task_id == undefined || req.body.notes == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    };

    const data = {
        user_id : req.body.user_id,
        task_id : req.body.task_id,
        notes : req.body.notes
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addProgress:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {
            const newProgressId = results.insertId;
            res.status(201).json({
                ProgressId: newProgressId,
                user_id : req.body.user_id,
                task_id : req.body.task_id,
                notes : req.body.notes
        });
        };
    };

    model.createNewTaskProgresses(data, callback);
};


// read all task progress
module.exports.readAllTaskProgresses = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        } else {

            res.status(200).json(results);
        };
    };

    model.readAllTaskprogresses(callback);
};

//read task progress by id if does not exist return 404 not found
module.exports.readTaskProgressesByIds = (req, res, next) =>
{
    const data = {
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "taskprogress not found"
                });
            }
            else {
                res.status(200).json(results);
                }
    

        };
    };

    model.readTaskprogressesByIds(data, callback);
};

module.exports.readTaskProgressesByUserIds = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "taskprogress not found"
                });
            }
            else {
                res.status(200).json(results);
                }
    

        };
    };

    model.readTaskprogressesByUserIds(data, callback);
};

//update taskprogress by id If the requested progress_id does not exist, return 404 Not Found.If the request body is missing notes, return 400 Bad Request.
module.exports.updateTaskprogressesByIds = (req, res, next) =>
{
    if(req.body.notes == undefined || req.params.id == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        id : req.params.id,
        notes : req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskprogressById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "taskprogress not found"
                });
            }
            else {
               
                res.status(200).json({
                    progress_id:data.id,
                    notes:data.notes
                });
            }; 
        };
    };
    model.updateTaskprogressesByIds(data, callback);
};    

//delete task progress by id successful: Status Code: 204 No Content
//delete task progress by id successful: Status Code: 204 No Content

module.exports.deleteTaskprogressesByIds = (req, res, next) =>
{
    const data = {
        id: req.params.id,
    }



    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskprogressById:", error);
            console.error("Error deleteTaskprogressById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "taskprogress not found."
                });
            }
            else res.status(204).json({
                message: "taskprogress deleted."
            });            
        };
    };
    model.deleteTaskprogressesByIds(data, callback);
};

//check task and user id exists middleware If the requested user_id or task_id does not exist, return 404 Not Found.

module.exports.checkUserIdsExists = (req, res, next) => {
    const data = {
        user_id : req.body.user_id
    }

    const callback=(error, results,fields) => {
        if (error) {
            console.error("Error checking user_id existence:", error);
            return res.status(500).json({
                message: "Internal server error.",
                error
        });
        } else {
            const useriddontexist = results[0].count == 0;

            if (useriddontexist) {
                return res.status(404).json({
                    message: "Error 404, userid not found"
                });
            }

            next();
        }
    
    };
    model.checkUserIdsExists(data,callback)
};

module.exports.checkTaskIdsExists = (req, res, next) => {
    const data = {
        task_id : req.body.task_id
    }

    const callback=(error, results,fields) => {
        if (error) {
            console.error("Error checking task_id existence:", error);
            return res.status(500).json({
                message: "Internal server error.",
                error
        });
        } else {
            const task_iddontexist = results[0].count == 0;

            if (task_iddontexist) {
                return res.status(404).json({
                    message: "Error 404, taskid not found"
                });
            }

            next();
        }
    
    };
    model.checkTaskIdsExists(data,callback)
};