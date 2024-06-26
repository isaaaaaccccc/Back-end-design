const pool = require('../services/db');

// allows user to read all content of shops
module.exports.readAllShops = (callback)=>{
    const SQLSTATEMENT =`
    SELECT * FROM Shop;`;
    pool.query(SQLSTATEMENT,callback);
}


// allows user to purchase item
module.exports.createNewShops = (data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Items(user_id,shop_id)
    VALUES(?,?);
    `
    const VALUES = [data.user_id, data.shop_id];

    pool.query(SQLSTATEMENT, VALUES, callback); 
}

// read shop items by user id to find out what a user owns
module.exports.readItemsbyIds= (data,callback)=>{
    const SQLSTATEMENT=`
    SELECT Items.user_id,Items.item_id,Items.shop_id,Shop.item_description,Shop.cost,Shop.image
    FROM
        Items
    JOIN
        Shop ON Items.shop_id = Shop.shop_id
    WHERE
    Items.user_id = ?;
    `
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.readWalletBalancebyIds= (data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM Wallet
    WHERE user_id = ?;

    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.PricecheckQuery = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Wallet
      SET spendable_points = available_points - COALESCE(
          (
              SELECT
                  SUM(Shop.cost) AS total_cost
              FROM
                  Items
              JOIN
                  Shop ON Items.shop_id = Shop.shop_id
              WHERE Items.user_id = ?
              GROUP BY
                  Items.user_id
          ),
          0
      )
    `;
    const VALUES = [data.user_id, data.shop_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  }


module.exports.attackByIds= (data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Attack(attacker_id,victim_id,item_id)
    VALUES(?,?,?);

    `
    const VALUES = [data.attacker_id, data.victim_id, data.item_id];

    pool.query(SQLSTATEMENT, VALUES, callback); 
}
module.exports.deleteItembyIds= (data,callback)=>{
    const SQLSTATEMENT=`
    DELETE FROM Items 
    WHERE item_id = ?;
    `
    const VALUES = [data.item_id];
    pool.query(SQLSTATEMENT, VALUES, callback);

}
  