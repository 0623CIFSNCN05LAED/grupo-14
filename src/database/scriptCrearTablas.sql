CREATE TABLE Users (
    id VARCHAR(255)PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber INT NOT NULL,
    notify TINYINT(1) NOT NULL,
    profile_id INT NOT NULL
);

CREATE TABLE UsersAdmin (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE UsersCf (
    id VARCHAR(255)PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dni INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE UsersMayoristas (
    id VARCHAR(255)PRIMARY KEY,
    businessName VARCHAR(255) NOT NULL,
    cuit INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    apartment VARCHAR(20),
    note TEXT
);

CREATE TABLE AddressesUsers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (address_id) REFERENCES Addresses(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE Products (
    id VARCHAR(255)PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    shortname VARCHAR(255),
    brand_id INT NOT NULL,
    category_id INT NOT NULL,
    retailprice DECIMAL(10, 2) NOT NULL,
    wholesaleprice DECIMAL(10, 2) NOT NULL,
    offer TINYINT(1) NOT NULL,
    discount INT NOT NULL,
    stock INT NOT NULL,
    sold INT NOT NULL,
    bestseller TINYINT(1) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
);