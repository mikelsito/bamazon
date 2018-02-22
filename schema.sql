DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(30),
    price DECIMAL(6,2),
    stock_quantity INT(6),
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES  ("10cm Wax Wick (10 ct.)", "Fuses", 3.99, 1000),
				("The Long John", "Fuses", 4.99, 300),
				("Classic Grey Gunpowder (32 oz.)", "Combustibles", 15.99, 500),
                ("Boom Jelly (12 oz.)", "Combustibles", 19.99, 200),
                ("8 oz. Plastic Silo", "Containers", 9.99, 3000),
                ("16 oz. Plastic Silo", "Containers", 15.99, 2000),
                ("Trojan Horse (54 oz.)", "Containers", 32.99, 250),
                ("Smoke Bomb", "Pre-Built", 7.99, 1500),
                ("The Stink Bug", "Pre-Built", 12.99, 1300),
                ("Old Faithful", "Self-Assembly", 19.99, 600);