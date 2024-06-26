const pool = require('../services/db');

module.exports.insertUsers = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.username, data.email, data.new_password];

pool.query(SQLSTATEMENT, VALUES, callback);    
}


// DEFINE SELECT ALL OPERATIONS FOR User

module.exports.selectAllUsers = (callback)=>{
    const SQLSTATEMENT =`
    SELECT User.*, Leaderboard.*, follower_count, followed_count, Wallet.spendable_points
    FROM User
    LEFT JOIN Leaderboard ON User.user_id = Leaderboard.user_id
    LEFT JOIN Wallet ON User.user_id = Wallet.user_id
    LEFT JOIN (
        SELECT followed, COUNT(*) as follower_count
        FROM Follow
        GROUP BY followed
    ) as FollowerCount ON User.user_id = FollowerCount.followed
    LEFT JOIN (
        SELECT follower, COUNT(*) as followed_count
        FROM Follow
        GROUP BY follower
    ) as FollowedCount ON User.user_id = FollowedCount.follower;`;
    pool.query(SQLSTATEMENT,callback);
}

// DEFINE SELECT BY ID OPERATIONS FOR User
module.exports.selectByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT *
    FROM User
    LEFT JOIN Leaderboard ON User.user_id = Leaderboard.user_id
    LEFT JOIN Follow ON User.user_id = Follow.followed
    LEFT JOIN Wallet ON User.user_id = Wallet.user_id
    WHERE User.user_id=?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

// DEFINE UPDATE OPERATIONS FOR User
module.exports.updateUsernameByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET username = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.username, data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.updateEmailByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET email = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.email,data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
module.exports.updateBioByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET bio = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.bio,data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
module.exports.updatePictureByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User
    SET profile_picture = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.profile_picture,data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
 

// DEFINE DELETE OPERATIONS FOR User
module.exports.deleteByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
   

    DELETE FROM TaskProgress
    WHERE user_id =?;


    DELETE FROM Leaderboard
    WHERE user_id =?;


    DELETE FROM Follow
    WHERE follower =?;


    DELETE FROM Follow
    WHERE followed =?;


    DELETE FROM Post
    WHERE user_id =?;


    DELETE FROM Wallet
    WHERE user_id =?;


    DELETE FROM Items
    WHERE user_id =?;


    DELETE FROM User 
    WHERE user_id = ?;


    `;
const VALUES = [data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
// check if username or email already exists
module.exports.checkUsernamesExists = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT COUNT(*) as count FROM User 
    WHERE username = ?;
    `;
    const VALUES=[data.username]
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkEmailsExists = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT COUNT(*) as count FROM User 
    WHERE email = ?;
    `;
    const VALUES=[data.email]
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectUserByEmail = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM User WHERE email = ?`;
    const VALUES = [data.email];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };

module.exports.getPasswordwithUserID = (data, callback) => {
    const SQLSTATEMENT = `SELECT password FROM User WHERE user_id = ?`;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkUserNameOrEmail = (data, callback) => {
    const SQL_STATEMENT = `
        SELECT * FROM User 
        WHERE username = ? OR email=?;
    `;
    const VALUES = [data.username, data.email];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
  
module.exports.setNewPassword=(data, callback) => {

    const SQL_STATEMENT = `
    UPDATE User
    SET password = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.hash, data.user_id];
  
    pool.query(SQL_STATEMENT, VALUES, callback);
}