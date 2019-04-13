DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon_DB;

USE  bamazon_db; 

CREATE TABLE products(
item_id INT(90) AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(5,2) NOT NULL,
stock_quanity INT(30) NOT NULL,
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Shampoo", "hygine" , 4.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Pans", "cooking" , 20.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Chips", "food" , 1.58 , 50);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Button Up Shirts", "clothes" , 50.99 , 2);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Diapers", "baby-zone" , 20.19, 100);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Bananas", "food" , 1.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Paper", "office" , 15.49, 150);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Black Truffle", "Food" , 120.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("razor", "hygine" , 2.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("PS-4", "Entertainment" , 340.99, 20);

Update bamazon_db.products set stock_quanity = 10
where item_id = 2;

SELECT * FROM bamazon_db.products;
USE bamazon_db;
CREATE TABLE departments(
department_id INT(30) NOT NULL,
department_name VARCHAR(50) NOT NULL,
product_sales DECIMAL(50) NOT NULL
);



ALTER TABLE products
ADD product_sales DECIMAL(50, 2) NOT NULL;






