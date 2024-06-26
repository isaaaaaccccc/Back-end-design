const pool = require('../services/db');

// create new follows insert follower followed and message
module.exports.createNewFollows= (data,callback)=>{
    const SQLSTATEMENT = `
    INSERT INTO Follow (follower,followed)
    VALUES (?, ?);
    `;

    const VALUES = [data.follower, data.followed];

    pool.query(SQLSTATEMENT,VALUES,callback);
}
// finds out how many followers each user has
module.exports.readAllFollows = (callback)=>{
    const SQLSTATEMENT =`

    SELECT User.user_id, COALESCE(COUNT(Follow.follower), 0) AS follower_count
    FROM User 
    LEFT JOIN Follow ON User.user_id = Follow.followed
    GROUP BY User.user_id;
    `;
    pool.query(SQLSTATEMENT,callback);
}

// read follows by ids tells user who follows them
module.exports.readFollowsByIds=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM Follow 
    WHERE follower=?;
    `

    const VALUES=[data.id]

    pool.query(SQLSTATEMENT,VALUES,callback)
}

// delete follows by id allows user to unfollow
module.exports.deleteFollowsByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE FROM Follow 
    WHERE follower = ? AND followed = ?;

    ALTER TABLE Follow AUTO_INCREMENT = 1;
    `;
const VALUES = [data.follower,data.followed];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

// check pair exists checks to see if follower following pair already exists to prevent doublle following with a single pair
module.exports.checkPairsExists = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT COUNT(*) FROM Follow WHERE follower = ? AND followed = ? 
    `;
    const VALUES=[data.follower,data.followed]
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};