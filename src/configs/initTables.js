const pool = require("../services/db")

const SQLSTATEMENT = `
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Leaderboard;
DROP TABLE IF EXISTS Follow;
DROP TABLE IF EXISTS Attack;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Wallet;
DROP TABLE IF EXISTS Shop;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT NOT NULL,
    profile_picture VARCHAR(15000) DEFAULT 'http://tinyurl.com/bdfdhumk', 
    bio VARCHAR(1000) DEFAULT 'I love my planet!',
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(15000) DEFAULT 'http://tinyurl.com/2d4u565t',
    title TEXT,
    description TEXT,
    points INT
   );

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    task_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (task_id) REFERENCES Task(task_id),
    completion_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
    );

CREATE TABLE Leaderboard(
    user_id INT,
    total_points INT DEFAULT 0,
    user_rank VARCHAR(255) DEFAULT 'Noob Eco Defender',
    FOREIGN KEY (user_id) REFERENCES User(user_id)
   );

CREATE TABLE Follow(
    follower INT,
    followed INT,
    FOREIGN KEY (follower) REFERENCES User(user_id),
    FOREIGN KEY (followed) REFERENCES User(user_id),
    UNIQUE KEY unique_followers (follower, followed)
    );


CREATE TABLE Post(
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    recepient_id INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    );


CREATE TABLE Shop(
    shop_id INT PRIMARY KEY AUTO_INCREMENT,
    item_description TEXT,
    cost INT,
    image VARCHAR(15000)
    );

CREATE TABLE Wallet(
    user_id INT,
    spendable_points INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    );

CREATE TABLE Items(
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    shop_id Int,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (shop_id) REFERENCES Shop(shop_id)
    );

CREATE TABLE Attack(
    attack_id INT PRIMARY KEY AUTO_INCREMENT,
    attacker_id INT,
    victim_id INT,
    item_id INT,
    FOREIGN KEY (attacker_id) REFERENCES User(user_id),
    FOREIGN KEY (victim_id) REFERENCES User(user_id)
    );


CREATE TRIGGER after_user_insert
AFTER INSERT
ON User FOR EACH ROW
BEGIN
    INSERT INTO Leaderboard (user_id, total_points) VALUES (NEW.user_id, 0);
    INSERT INTO Wallet (user_id, spendable_points) VALUES (NEW.user_id, 0);
END;

CREATE TRIGGER after_task_progress_insert
AFTER INSERT
ON TaskProgress FOR EACH ROW
BEGIN
    DECLARE newTotalPoints INT;

    SELECT COALESCE(SUM(Task.points), 0)
    INTO newTotalPoints
    FROM Task
    JOIN TaskProgress ON Task.task_id = TaskProgress.task_id
    WHERE TaskProgress.user_id = NEW.user_id;

    UPDATE Leaderboard
    SET total_points = newTotalPoints
    WHERE Leaderboard.user_id = NEW.user_id;

    UPDATE Wallet
    SET spendable_points = newTotalPoints - COALESCE(
        (
            SELECT
                SUM(Shop.cost) AS total_cost
            FROM
                Items
            JOIN
                Shop ON Items.shop_id = Shop.shop_id
            WHERE Items.user_id = NEW.user_id
            GROUP BY
                Items.user_id
        ),
        0
    )
    WHERE Wallet.user_id = NEW.user_id;

END;


CREATE TRIGGER after_attack_insert
AFTER INSERT
ON Attack FOR EACH ROW
BEGIN
    UPDATE Wallet
    SET Wallet.spendable_points = Wallet.spendable_points - 2*(
        SELECT Shop.cost
        FROM Items
        INNER JOIN Shop ON Items.shop_id = Shop.shop_id
        WHERE Items.item_id = NEW.item_id
    )
    WHERE Wallet.user_id = NEW.victim_id;

END;


CREATE TRIGGER check_spendable_points
AFTER INSERT 
ON Items FOR EACH ROW
BEGIN 
    DECLARE available_points INT;

    SELECT COALESCE(SUM(Task.points), 0)
    INTO available_points
    FROM Task
    JOIN TaskProgress ON Task.task_id = TaskProgress.task_id
    WHERE TaskProgress.user_id = NEW.user_id;

    UPDATE Wallet
    SET spendable_points = available_points - COALESCE(
        (
            SELECT
                SUM(Shop.cost) AS total_cost
            FROM
                Items
            JOIN
                Shop ON Items.shop_id = Shop.shop_id
            WHERE Items.user_id = NEW.user_id
            GROUP BY
                Items.user_id
        ),
        0
    )
    WHERE Wallet.user_id = NEW.user_id;

    IF NEW.shop_id IS NOT NULL AND NEW.user_id IS NOT NULL AND (
        SELECT MAX(cost) FROM Shop WHERE shop_id = NEW.shop_id
    ) > available_points THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient spendable points to purchase this item.';
    END IF; 
END;



CREATE TRIGGER update_user_rank
BEFORE UPDATE ON Leaderboard
FOR EACH ROW
BEGIN
    DECLARE new_user_rank TEXT;


    IF NEW.total_points < 150 THEN
        SET new_user_rank = 'Bronze Eco Defender';
    ELSEIF NEW.total_points >= 150 AND NEW.total_points <= 300 THEN
        SET new_user_rank = 'Silver Eco Defender';
    ELSEIF NEW.total_points >= 300 AND NEW.total_points <= 600 THEN
        SET new_user_rank = 'Gold Eco Defender';
    ELSEIF NEW.total_points >= 600 AND NEW.total_points <= 1000 THEN
        SET new_user_rank = 'Champion Eco Defender';
    ELSEIF NEW.total_points >= 1000 THEN
        SET new_user_rank = 'Legendary Eco Defender';
    END IF;

    SET NEW.user_rank = new_user_rank;
END;
   


INSERT INTO Task (task_id, title, description, image, points) VALUES
    (1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area','http://tinyurl.com/nnkj69es', 50),
    (2, 'Use Public Transportation','Use public transportation or carpool instead of driving alone','http://tinyurl.com/3kvcstyp', 30),
    (3, 'Reduce Plastic Usage','Commit to using reusable bags and containers', 'http://tinyurl.com/43ceefrc',40),
    (4, 'Energy Conservation', 'Turn off lights and appliances when not in use.','http://tinyurl.com/2e99ske2', 25),
    (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer','http://tinyurl.com/7jp8jzxc', 35);





INSERT INTO Shop (item_description,cost,image) VALUES
    ('recyling talisman',200 ,'http://tinyurl.com/2d4u565t'),
    ('reducer potion',300, 'http://tinyurl.com/bdzyjxtc' ),
    ('reuser crown',400, 'http://tinyurl.com/2s3v77yb' ),
    ('ultimate environmental protection mask', 700, 'http://tinyurl.com/4wb9c7ty'),
    ('super very cool extremely amazing super good and fantastic and rare totem',10000, 'http://tinyurl.com/y76thkx3'),
    ('even more very brilliant and amazing and swag;ultra beautiful, good and amazingly superb fantastic ultra good and fantastic and amazing charm. Very cool, very swag, i like it very much.',400000, 'http://tinyurl.com/49fmnz6s' );






`;



pool.query(SQLSTATEMENT, (error, results, fields) => {
if (error) {
    console.error("Error creating tables:", error);
} else {
    console.log("Tables created successfully:", results);
}
process.exit();
});