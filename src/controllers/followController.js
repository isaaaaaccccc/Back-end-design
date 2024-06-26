const model = require("../models/followModel.js");

// vonntroller to add a new follower following Pairs, 
// followed is the number of followers you have follower is the number of peeople you follow

module.exports.createNewFollows = (req, res, next) =>
{
    if(req.params.follower == undefined || req.body.followed == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }
    if(req.params.follower==req.body.followed){
        res.status(1136).json({
            message: "follower cannot be following."
        });
        return;

    }

    const data = {
        follower : req.params.follower,
        followed : req.body.followed,
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewFollow:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {
            res.status(201).json({
                message: "Followed successfully.",
        });
        }
    }

    model.createNewFollows(data, callback);
};

module.exports.readAllFollows= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllFollows:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.readAllFollows(callback);
};

module.exports.readFollowsByIds = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readFollowById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Follow not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.readFollowsByIds(data, callback);
};

module.exports.deleteFollowsByIds= (req, res, next) => {
    const data = {
        follower: req.params.follower,
        followed: req.body.followed,
    }

    if(req.params.id !== data.id)
    {
        res.status(400).json({
            message: "Follow not found."
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
                    message: "Follow not found."
                });
            }
            else res.status(204).json({
                message: "Follow deleted."
            });            
        }
    }
    model.deleteFollowsByIds(data, callback);
} 


module.exports.checkPairsExists = (req, res, next) => {
    const data = {
        follower : req.params.follower,
        followed : req.body.followed
    }
    if(req.params.follower == undefined || req.body.followed == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }


    const callback=(error, results,fields) => {
        if (error) {
            console.error("Error deleting follower followed Pairs", error);
            return res.status(500).json({
                message: "Internal server error.",
                error
        });
        } else {
            const PairsExists = results[0].count > 0;
                
            if (PairsExists) {
                return res.status(409).json({
                    message: "Conflict: follower followed Pairs already exists."
                });
            }

            next();
        }
    
    };
    model.checkPairsExists(data,callback)
};