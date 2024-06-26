const model = require("../models/shopModel.js");

// read all shops reads all items in shop table so that user can see what items they want to buy
module.exports.readAllShops= (req,res,next) =>
{
    const callback=(error,results,fields)=>{
        if(error){
            console.error("Error readAllShops:", error)
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.readAllShops(callback);
}

// create new shops is for when user wants to purchase an item from the shop table. this adds a new entry into  the item table

module.exports.createNewShops=(req,res,next)=> 
{
    if(req.params.user_id==undefined||req.body.shop_id==undefined){
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id : req.params.user_id,
        shop_id : req.body.shop_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addShop:", error);
            res.status(500).json({
                message:"Internal server error.",
                error
            });
        } else {
            res.status(201).json({
                message: "item added successfully.",
                
        });
        }
    }

    model.createNewShops(data, callback);
}

// read items by ids reads 

module.exports.readItemsbyIds = (req, res) => {
    if (req.params.user_id == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id
    };

    let callbackCalled = false;

    const callback = (error, results, fields) => {
        if (callbackCalled) {
            return;
        }
    
        callbackCalled = true;
    
        if (error) {
            console.error("Error readitemById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Item not found"
                });
            } else {
                res.status(200).json(results);
            }
        }
    };
    
    model.readItemsbyIds(data, callback);
};

// read wallet balance by ids reads the wallet table to see how many points a user has
module.exports.readWalletBalancebyIds = (req, res) => {
    if (req.params.user_id == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readWalletBalancebyIds:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Wallet not found"
                });
            } else {
                res.status(200).json(results);
            }
        }
    };

    model.readWalletBalancebyIds(data, callback);



}

module.exports.Pricecheck = (req, res, next) => {

    const data = {
        user_id: req.params.user_id,
        shop_id: req.body.shop_id
    }

    const PricecheckCallback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.error("Error checkTaskIds:", error);
            res.status(500).json({ "message": "Internal server error" });
        } else {
            // Check if wallet bigger than cost
            if (results[0][0].spendable_points-results[1][0].cost <0) {
                res.status(404).json({ "message": "not renough points to purchase item, please complete more taskprogresses" });
            } else {
                next();
            }
        }
    };

    model.PricecheckQuery(data, PricecheckCallback);
};

module.exports.attackByIds = (req, res, next) => {
    const data = {
        attacker_id: req.params.attacker_id,
        victim_id: req.body.victim_id,
        item_id: req.body.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error attackByIds:", error);
            res.status(500).json(error);
        } else {
            res.status(200);
        }
    }
    next();
    model.attackByIds(data, callback);
}

module.exports.deleteItembyIds = (req, res, next) => {
    const data = {
        item_id: req.params.item_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteItemByIds:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                message: "item deleted."
            });
        }
    }
    model.deleteItembyIds(data, callback);
}