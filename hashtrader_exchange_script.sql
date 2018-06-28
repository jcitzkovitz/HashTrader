DROP SCHEMA IF EXISTS hashtrader_exchange;

CREATE SCHEMA hashtrader_exchange;

CREATE TABLE hashtrader_exchange.Users (
id int PRIMARY KEY auto_increment,
username NVARCHAR(50) UNIQUE NOT NULL,
passwordHash VARCHAR(256) NOT NULL,
salt VARCHAR(256) NOT NULL,
type  ENUM ('ADMIN','EMPLOYEE','EXUSER') NOT NULL,
email NVARCHAR(64) NOT NULL,
phoneNumber VARCHAR(50) NOT NULL,
googleAuth VARCHAR(64),
withdrawalLimit REAL DEFAULT 0,
passport BOOLEAN DEFAULT false,
driversLicense BOOLEAN DEFAULT false,
photoWPassport BOOLEAN DEFAULT false
);

CREATE TABLE hashtrader_exchange.People (
id int PRIMARY KEY auto_increment,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
birthday DATE NOT NULL,
country VARCHAR(50) NOT NULL,
state VARCHAR(50) NOT NULL,
zip VARCHAR(10) NOT NULL,
streetAddress VARCHAR(50) NOT NULL,
userId int UNIQUE,
FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hashtrader_exchange.Coins(
id int auto_increment PRIMARY KEY,
ticker VARCHAR(5) UNIQUE NOT NULL,
name VARCHAR(20) NOT NULL,
stakeable ENUM ('YES','NO') DEFAULT 'NO',
marketType ENUM ('MAIN','OTHER') DEFAULT 'OTHER',
coinWebsite VARCHAR(64),
coinBlockExplore VARCHAR(64)
);

CREATE TABLE hashtrader_exchange.Markets(
id int auto_increment PRIMARY KEY,
ticker VARCHAR(10) UNIQUE,
coin1Id int NOT NULL,
coin2Id int NOT NULL,
FOREIGN KEY (coin1Id) REFERENCES Coins(id) ON UPDATE CASCADE,
FOREIGN KEY (coin2Id) REFERENCES Coins(id) ON UPDATE CASCADE,
CHECK(Markets.coin1Id != Markets.coin2Id)
);

CREATE TABLE hashtrader_exchange.Orders (
id int PRIMARY KEY auto_increment,
dateTime DATETIME NOT NULL,
price REAL NOT NULL,
amount REAL NOT NULL,
total REAL NOT NULL,
status ENUM ('FILLED', 'NOT FILLED','CANCELLED'),
type ENUM ('BUY','SELL'),
sellCoin int NOT NULL,
buyCoin int NOT NULL,
marketId int NOT NULL,
userId int NOT NULL,
FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE,
FOREIGN KEY (sellCoin) REFERENCES Coins(id) ON UPDATE CASCADE,
FOREIGN KEY (buyCoin) REFERENCES Coins(id) ON UPDATE CASCADE,
FOREIGN KEY (marketId) REFERENCES Markets(id) ON UPDATE CASCADE
);

CREATE TABLE hashtrader_exchange.Transactions(
id int PRIMARY KEY auto_increment,
txid VARCHAR(64),
status ENUM('PENDING', 'CONFIRMED','FAILED'),
amount REAL NOT NULL,
fee REAL NOT NULL,
dateTime DATETIME NOT NULL,
userId int NOT NULL,
coinId int NOT NULL,
type ENUM ('DEPOSIT','WITHDRAWAL') NOT NULL,
FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE,
FOREIGN KEY (coinId) REFERENCES Coins(id) ON UPDATE CASCADE
);

CREATE TABLE hashtrader_exchange.Wallets(
id int auto_increment PRIMARY KEY,
userId int NOT NULL UNIQUE,
FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE
);

CREATE TABLE hashtrader_exchange.Addresses(
id int auto_increment PRIMARY KEY,
addressHash VARCHAR(256) NOT NULL,
salt VARCHAR(256) NOT NULL,
balance REAL NOT NULL DEFAULT 0,
CHECK (balance > 0),
coinId int NOT NULL,
walletId int NOT NULL,
type ENUM ('REGULAR','STAKE') DEFAULT 'REGULAR',
FOREIGN KEY (coinId) REFERENCES Coins(id) ON UPDATE CASCADE,
FOREIGN KEY (walletId) REFERENCES Wallets(id) ON UPDATE CASCADE
);

