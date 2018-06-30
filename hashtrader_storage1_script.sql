DROP SCHEMA IF EXISTS hashtrader_storage1;

CREATE SCHEMA hashtrader_storage1;

CREATE TABLE hashtrader_storage1.addresses(
  id BINARY(16) PRIMARY KEY,
  addressHash VARCHAR(256) NOT NULL,
  salt VARCHAR(256) NOT NULL,
  coinTicker VARCHAR(5) NOT NULL
);