DROP DATABASE IF EXISTS bamazon_db;
  
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Knee High Boots', 'Shoes', 50.00, 15);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Sandals', 'Shoes', 10.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Flip flops', 'Shoes', 10.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Nikes', 'Shoes', 80.99, 30);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('T-shirt plain white', 'Clothing', 20.00, 30);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Tank Top plaint white', 'Clothing', 20.00, 30);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Blouse floral print', 'Clothing', 25.00, 30);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Undershirts plain white', 'Clothing', 10.00, 30);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Gold necklace', 'Jewelry', 199.99, 5);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Gold ring', 'Jewelry', 150.00, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Gold Watch', 'Jewelry', 399.99, 2);

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Shoes', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Clothing', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Jewelry', 500);