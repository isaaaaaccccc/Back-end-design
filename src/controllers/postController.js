const model = require("../models/postModel.js");

module.exports.readAllPosts= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllPosts:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.readAllPosts(callback);
}

module.exports.createNewPosts = (req, res, next) =>
{
    if(req.params.user_id == undefined || req.body.content==undefined||req.body.recepient_id==undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id : req.params.user_id,
        content:req.body.content,
        recepient_id:req.body.recepient_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPost:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {
            res.status(201).json({
                message: "Post added successfully.",
                user_id:data.user_id,
                content:req.body.content,
                recepient_id:req.body.recepient_id,
        });
        }
    }

    model.createNewPosts(data, callback);
}

module.exports.updatePostsByIds = (req, res, next) =>
{
    if(req.body.content == undefined)
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        post_id : req.params.post_id,
        content : req.body.content
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePostsById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Post not found"
                });
            }
            else {
               
                res.status(200).json({
                    post_id:data.post_id,
                    content:data.content
                });
            }; 
        };
    };
    model.updatePostsByIds(data, callback);
};    

//delete post by id successful: Status Code: 204 No Content


module.exports.deletePostsByIds = (req, res, next) =>
{
    const data = {
        post_id: req.params.post_id,
    }


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePostById:", error);
            console.error("Error deletePostById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Post not found."
                });
            }
            else res.status(204).json({
                message: "Post deleted."
            });            
        };
    };
    model.deletePostsByIds(data, callback);
};