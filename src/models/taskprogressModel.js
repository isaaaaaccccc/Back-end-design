const pool = require('../services/db');

//create new task progress
module.exports.createNewTaskProgresses = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO Taskprogress (user_id, task_id, notes)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.user_id, data.task_id, data.notes];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
//read all task progress
module.exports.readAllTaskprogresses = (callback)=>{
    const SQLSTATEMENT =`
    SELECT * FROM Taskprogress
    LEFT JOIN User ON Taskprogress.user_id = User.user_id
    LEFT JOIN Task ON Taskprogress.task_id = Task.task_id;`;

    pool.query(SQLSTATEMENT,callback);
}

// read taskproogress by id
module.exports.readTaskprogressesByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * 
    FROM Taskprogress
    LEFT JOIN User ON Taskprogress.user_id = User.user_id
    LEFT JOIN Task ON Taskprogress.task_id = Task.task_id
    WHERE Taskprogress.progress_id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.readTaskprogressesByUserIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * 
    FROM Taskprogress
    LEFT JOIN User ON Taskprogress.user_id = User.user_id
    LEFT JOIN Task ON Taskprogress.task_id = Task.task_id
    WHERE Taskprogress.user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

//update taskprogress by id
module.exports.updateTaskprogressesByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE Taskprogress
    SET notes=?
    WHERE progress_id = ?;
    `;
const VALUES = [data.notes,data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
//delete task progress by id
module.exports.deleteTaskprogressesByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE FROM Taskprogress 
    WHERE progress_id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
//check userid exist middleware
module.exports.checkUserIdsExists=(data,callback)=>
{
    const SQLSTATEMENT=`
    SELECT COUNT(*) as count FROM User 
    WHERE user_id = ?;
    `;
    const VALUES=[data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}
//check taskid exists middleware
module.exports.checkTaskIdsExists=(data,callback)=>
{
    const SQLSTATEMENT=`
    SELECT COUNT(*) as count FROM Task 
    WHERE task_id = ?;
    `;
    const VALUES=[data.task_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}