// to link to sql
const pool = require('../services/db');


module.exports.createNewTasks = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO Task (title, description, image, points)
    VALUES (?, ?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.image, data.points];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
//read all tasks
module.exports.readAllTasks = (callback)=>{
    const SQLSTATEMENT =`SELECT * FROM Task;`;
    pool.query(SQLSTATEMENT,callback);
}

//read tasks by ids
module.exports.readTasksByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}


//update tasks by id
module.exports.updateTasksByIds = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE Task
    SET title = ?, description = ?, image = ?, points = ?
    WHERE task_id = ?;
    `;
const VALUES = [data.title, data.description,data.image,data.points,data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}

//delete tasks by ids
module.exports.deleteTasksByIds = (data, callback) =>
{
    const SQLSTATEMENT = `

    DELETE FROM TaskProgress
    WHERE task_id = ?;

    DELETE FROM Task
    WHERE task_id = ?;
    `;
const VALUES = [data.id,data.id];

pool.query(SQLSTATEMENT, VALUES, callback);    
}
