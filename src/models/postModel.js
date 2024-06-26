const pool = require('../services/db');

// allows user to read all posts
module.exports.readAllPosts = (callback)=>{
    const SQLSTATEMENT =`
    SELECT Post.*, Sender.username AS sender_username, Recipient.username AS recipient_username
    FROM Post
    LEFT JOIN User AS Sender ON Post.user_id = Sender.user_id
    LEFT JOIN User AS Recipient ON Post.recepient_id = Recipient.user_id;`;
    pool.query(SQLSTATEMENT,callback);
}

module.exports.updatePostsByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE Post
    SET content = ?
    WHERE post_id = ?;
    `;
const VALUES = [data.content, data.post_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.deletePostsByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE FROM Post 
    WHERE post_id = ?;
    `;
const VALUES = [data.post_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

// allows user to create new post
module.exports.createNewPosts = (data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO POST (user_id,content,recepient_id)
    VALUES(?,?,?);
    `
    const VALUES = [data.user_id,data.content,data.recepient_id];

    pool.query(SQLSTATEMENT, VALUES, callback); 
}