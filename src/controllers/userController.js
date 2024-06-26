const model = require("../models/userModel.js");


// read all users return Status Code: 200 OK if get successfully
module.exports.readAllUsers= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllTasks:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAllUsers(callback);
}


// read user by id If the requested user_id does not exist, return 404 Not Found.
module.exports.readUsersById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByIds(data, callback);
}

// update user by id If the requested user_id does not exist, return 404 Not Found. 
module.exports.updateUsersUsernamesByIds = (req, res, next) =>
{
    if(req.body.username == undefined || req.params.user_id == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        username : req.body.username,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id:data.user_id,
                username:data.username,

            }); 
        }
    }
    model.updateUsernameByIds(data, callback);
}    

module.exports.updateUsersEmailByIds = (req, res, next) =>
{
    if(req.body.email == undefined || req.params.user_id == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        email : req.body.email,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUsersEmailByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id:data.user_id,
                email:data.email,
            }); 
        }
    }
    model.updateEmailByIds(data, callback);
}    


module.exports.updateUsersBioByIds = (req, res, next) =>
{
    if(req.body.bio == undefined || req.params.user_id == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        bio : req.body.bio
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUsersBioByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id:data.user_id,
                bio:data.bio,
            }); 
        }
    }
    model.updateBioByIds(data, callback);
}    
module.exports.updateUsersPictureByIds = (req, res, next) =>
{
    if(req.body.profile_picture == undefined || req.params.user_id == undefined )
    {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        profile_picture : req.body.profile_picture
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUsersPictureByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id:data.user_id,
                Picture:data.profile_picture,
            }); 
        }
    }
    model.updatePictureByIds(data, callback);
}  

module.exports.setNewPassword = (req, res, next) =>
{
    if(res.locals.hash == undefined )
    {
        res.status(400).json({
            message: "Miiissing required data."
        });
        return;
    }
    if(res.locals.user_id == undefined )
    {
        res.status(400).json({
            message: "Missiiisisissng required data."
        });
        return;
    }

    const data = {
        user_id: res.locals.user_id,
        hash : res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUsersPasswordByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                user_id:data.user_id,
                password:data.password,
            }); 
        }
    }
    model.setNewPassword(data, callback);
}  

// delete user by user_id If the requested user_id does not exist, return 404 Not Found.
module.exports.deleteUsersByIds = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found."
                });
            }
            else res.status(200).json({
                message: "User deleted."
            });            
        }
    };
    model.deleteByIds(data, callback);
};

//Check if email exists middleware (If the provided email is already associated with another user, return 409 Conflict.)
module.exports.checkUsernamesExists = (req, res, next) => {
    const data = {
        username: req.body.username
    }


    const callback=(error, results,fields) => {
        if (error) {
            console.error("Error checking username existence:", error);
            return res.status(500).json({
                message: "Internal server error.",
                error
        });
        } else {
            const usernameExists = results[0].count > 0;

            if (usernameExists) {
                return res.status(409).json({
                    message: "Conflict: Username already exists."
                });
            }

            next();
        }
    
    };
    model.checkUsernamesExists(data,callback)
};
//check if username exists If the provided username or email is already associated with another user, return 409 Conflict.
module.exports.checkEmailsExists = (req, res, next) => {
    const data = {
        email : req.body.email
    }

    const callback=(error, results,fields) => {
        if (error) {
            console.error("Error checking email existence:", error);
            return res.status(500).json({
                message: "Internal server error.",
                error
        });
        } else {
            const emailExists = results[0].count > 0;

            if (emailExists) {
                return res.status(409).json({
                    message: "Conflict: Email already exists."
                });
            }

            next();
        }
    
    };
    model.checkEmailsExists(data,callback)
};

module.exports.login = (req, res, next) => {
    if (req.body.email == undefined || req.body.password == undefined) {
      res.status(400).json({
        message: "Error: email or password is undefined",
      });
      return;
    }
  
    const data = {
      email: req.body.email
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error login:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else {
          res.locals.user_id = results[0].user_id;
          res.locals.username = results[0].username;
          res.locals.hash = results[0].password;
          res.locals.message = "User " + req.body.email +  " logged in successfully.";  
          next();
        }
      }
    };
  
    model.selectUserByEmail(data, callback);
  };
  
  //////////////////////////////////////////////////////
  // CONTROLLER FOR REGISTER
  //////////////////////////////////////////////////////
  module.exports.register = (req, res, next) => {
    if (
      req.body.username == undefined ||
      req.body.email == undefined ||
      req.body.new_password == undefined
    ) {
      res.status(400).send("Error: username is undefined");
      return;
    }
  
    const data = {
      username: req.body.username,
      email: req.body.email,
      new_password: res.locals.hash,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error register:", error);
        res.status(500).json(error);
      } else {
        res.locals.user_id = results.insertId;
        res.locals.username = req.body.username;
        res.locals.message = "User " + req.body.username + " created successfully.";
        next();
      }
    };
  
    model.insertUsers(data, callback);
  };

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
if (req.body.username == undefined || req.body.email == undefined) {
    res.status(400).send("Error: Username or email is undefined");
    return;
}

const data = { 
    username: req.body.username, 
    email: req.body.email
}

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error createNewUser:", error);
        res.status(500).json(error);
    } else {
        if (results.affectedRows == 0) {
            res.status(400).json({ message: "User not found" })
        }
        else if (results.length > 0) {
            res.status(409).json({ message: "Username or email already exists" })
        }
        else next()
    }
}

model.checkUserNameOrEmail(data, callback);
}

module.exports.getPasswordwithUserID = (req, res, next) => {
    if (req.body.user_id == undefined) {
        res.status(400).send("Error: user_id is undefined");
        return;
    }


    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPasswordwithUserID:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.locals.hash = results[0].password;
                next();
            }
        }

    } 
    model.getPasswordwithUserID(data, callback);
};

module.exports.setNewPasswordPassword = (req, res, next) => {
    if (req.body.password == undefined) {
        res.status(400).send("Error: password is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        new_password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error setNewPassword:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({ message: "User not found" })
            }
            else res.status(200).json({ message: "Password changed successfully" })
        }
    }

    model.updatePasswordByIds(data, callback);
}