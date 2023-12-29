CREATE DATABASE cleanwave;
USE cleanwave;


CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE Products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    shortname VARCHAR(255),
    brand_id INT NOT NULL,
    category_id INT NOT NULL,
    retailprice DECIMAL(10, 2) NOT NULL,
    wholesaleprice DECIMAL(10, 2) NOT NULL,
    offer TINYINT(1) NOT NULL DEFAULT 0,
    discountCf INT,
    discountM INT,
    stock INT NOT NULL DEFAULT 0,
    sold INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
);


CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    phoneNumber INT NOT NULL,
    notify TINYINT(1) NOT NULL
);


CREATE TABLE Addresses (
    id VARCHAR(255) PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    apartment VARCHAR(20),
    note TEXT,
    FOREIGN KEY (id) REFERENCES Users(id)
);


CREATE TABLE UserSuperAdmin (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);


CREATE TABLE UsersAdmin (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);


CREATE TABLE UsersCf (
    id VARCHAR(255)PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dni INT NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);


CREATE TABLE UsersMayoristas (
    id VARCHAR(255)PRIMARY KEY,
    businessName VARCHAR(255) NOT NULL,
    cuit INT NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);


CREATE TABLE Carts (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    quantity INT,
    total_price DECIMAL(10, 2),
    status VARCHAR(20),
    purchase_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE CartsProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    quantity INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (cart_id) REFERENCES Carts(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);


insert into categories values
(1, "pisos"),
(2, "muebles"),
(3, "ropa"),
(4, "papelHigienico"),
(5, "detergente"),
(6, "lavandina");


insert into brands values
(1, "procenex"),
(2, "blem"),
(3, "skip"),
(4, "trenet"),
(5, "higienol"),
(6, "elite"),
(7, "felpita"),
(8, "cif"),
(9, "magistral"),
(10, "ala"),
(11, "odex"),
(12, "ayudin");


insert into products (id, name, shortname, brand_id, category_id, retailprice, wholesaleprice, offer, discountCf, discountM, stock, sold, image, description)
values
("7e8946f0-8a27-4756-88f6-25dbe26ee102", "Limpiador líquido Procenex pisos lavanda 900 ml.", "Limpiador líquido Procenex", 1, 1, 333, 222, 1, 25, 10, 1000, 0, "limpiadorLiquidoProcenex.jpg", "Procenex Lavanda limpia profundamente las distintas superficies de tu hogar dejando un agradable aroma. Su fragancia están desarrolladas por las mejores casas perfumistas. Es ideal para pisos, azulejos, superficies lavables de la cocina, áreas de mascotas, basureros y superficies lavables del baño."),
("a44987d7-af68-4dad-87da-ec09aa523e10", "Lustramuebles Blem brillo y protección madera original aerosol 360 cc.", "Lustramuebles Blem", 2, 2, 333, 222, 1, 25, 10, 1000, 0, "lustramueblesBlem.jpg", "Ventajas *Blem Aerosol mejora el aspecto de la mayoría de las superficies duras al eliminar el polvo y proporciona una capa protectora y brillante sin dejar acumulaciones de cera. ¿Sobre qué superficies es posible aplicar el producto? *Madera (Sellada) *Superficies Laminadas que no son Pisos *Cuero *Plástico Instrucciones de Uso: 1) Agita 2) Rocía 3) Limpia con un paño. Para mejores resultados, rocía sobre un paño y repasa, o rocía desde 20 cm de la superficie y repasa."),
("d46f3ae7-fde2-4bf3-8dd0-1ffba988c57d", "Jabón líquido para ropa Skip concentrado bio encimas 500 cc.", "Jabón líquido Skip", 3, 3, 333.5, 222, 1, 25, 10, 1000, 0, "jabonLiquidoSkip.jpg", "El nuevo jabón líquido Skip para Diluir Bio-Enzimas, tiene una nueva tecnología que garantiza la superioridad en la limpieza y cuidado de las fibras, asegurando un impacto positivo en el planeta. El nuevo Skip líquido para diluir ofrece el mismo cuidado de siempre pero de una forma más conveniente para el consumidor."),
("5c9f8720-f3d2-49f3-a68d-11b564b42f0b", "Quitamanchas Trenet inspirado por Ayudin Ropa (Envase económico) 400 ml.", "Quitamanchas Trenet", 4, 3, 333.5, 222, 0, 0, 0, 1000, 0, "quitamanchasTrenet.jpg", "Trenet es el experto en quitar manchas. Trenet Gatillo Oxi está especialmente formulado para remover una gran cantidad de manchas, y es más efectivo aún en manchas de características coloridas, como por ejemplo pasto, salsa de tomate, café, jugo de frutas, tinta y muchas otras sin necesidad de fregar y sin dañar la ropa. Su fórmula Hyperactive con Oxígeno Activo actúa inmediatamente sobre las manchas, debilitando su adherencia a las fibras y quitándolas fácilmente. Puede utilizarse en ropa blanca y en colores firmes."),
("c1f21ead-3765-47de-a6ea-066b0750969f", "Papel higiénico Higieniol doble hoja plus x4 30 mts.", "Higieniol doble hoja plus", 5, 4, 333, 222, 0, 0, 0, 1000, 0, "papelHigienolDobleHojaPlus.jpg", "El papel higiénico Higienol es sinónimo de suavidad y calidad en cada hoja. Creado pensando en tu comodidad, ofrece una experiencia única en cada uso. Su textura suave y resistente garantiza una limpieza eficaz y delicada. Higienol se convierte en el compañero perfecto para mantener una higiene impecable en tu día a día. Confía en Higienol para una sensación de frescura y confort inigualable."),
("83677791-edc8-46ab-8c74-6a674197bbf6", "Papel higiénico Higieniol doble hoja premium x4 30 mts.", "Higieniol doble hoja premium", 5, 4, 333, 222, 1, 25, 10, 1000, 0, "papelHigienolDobleHojaPremium.jpg", "El papel higiénico Higienol es sinónimo de suavidad y calidad en cada hoja. Creado pensando en tu comodidad, ofrece una experiencia única en cada uso. Su textura suave y resistente garantiza una limpieza eficaz y delicada. Higienol se convierte en el compañero perfecto para mantener una higiene impecable en tu día a día. Confía en Higienol para una sensación de frescura y confort inigualable."),
("6e2b6343-9b7d-40af-b80d-09a3ebbbd5bf", "Papel higiénico Higienol hoja simple export panal x4 30 mts.", "Higieniol hoja simple", 5, 4, 333, 222, 0, 0, 0, 1000, 0, "papelHigienolHojaSimple.jpg", "El papel higiénico Higienol es sinónimo de suavidad y calidad en cada hoja. Creado pensando en tu comodidad, ofrece una experiencia única en cada uso. Su textura suave y resistente garantiza una limpieza eficaz y delicada. Higienol se convierte en el compañero perfecto para mantener una higiene impecable en tu día a día. Confía en Higienol para una sensación de frescura y confort inigualable."),
("6e15980a-9ead-41ba-a3b1-d8d8dc0580f6", "Papel higienico doble hoja Elite ultra suave x4 30 mts.", "Elite doble hoja", 6, 4, 333, 222, 0, 0, 0, 1000, 0, "papelEliteDobleHoja.jpg", "El papel higiénico Elite es reconocido por su calidad y durabilidad en cada doble hoja. Pensado para tu confort, brinda una experiencia excepcional en cada uso. Su textura suave y resistente garantiza una limpieza efectiva y delicada. Elite se convierte en el aliado perfecto para mantener una higiene impecable en tu día a día. Confía en Elite para disfrutar de una sensación de frescura y comodidad insuperable."),
("9692b0fd-b162-4a3b-baee-bf1447a8d1a2", "Papel higiénico doble textura Felpita 4 u. x 20 m.", "Felpita doble textura", 7, 4, 333, 222, 0, 25, 10, 1000, 0, "papelFelpitaDoble.jpg", "El papel higiénico de doble hoja marca Felpita se destaca por su calidad insuperable y su textura suave que proporciona una experiencia excepcional en cada uso. Este papel está diseñado pensando en tu confort y garantiza una limpieza efectiva y delicada en cada pasada. Felpita se convierte en el compañero ideal para mantener una higiene impecable en tu rutina diaria, brindándote una sensación de frescura y comodidad que lo hace destacar entre las opciones disponibles en el mercado. Confía en Felpita para cubrir tus necesidades de higiene de la manera más placentera."),
("45979c50-752a-4a7e-9689-fddd89cf0a99", "Detergente Cif bioactive lima 500 cc.", "Detergente Cif lima", 8, 5, 333, 222, 1, 25, 10, 1000, 0, "detergenteCifLima.jpg", "El detergente Cif es la elección perfecta para mantener tus superficies impecables y relucientes. Su fórmula poderosa elimina la grasa y la suciedad con facilidad, dejando una frescura y brillo incomparables. Ya sea en la cocina, el baño o cualquier otra área de tu hogar, Cif garantiza una limpieza profunda y efectiva. Confía en Cif para mantener un ambiente limpio y radiante en tu hogar."),
("4832497f-53e1-4428-993e-41e34ad68b6c", "Detergente Cif bioactive limón 500 cc.", "Detergente Cif limón", 8, 5, 333, 222, 1, 25, 10, 1000, 0, "detergenteCifLimon.jpg", "El detergente Cif es la elección perfecta para mantener tus superficies impecables y relucientes. Su fórmula poderosa elimina la grasa y la suciedad con facilidad, dejando una frescura y brillo incomparables. Ya sea en la cocina, el baño o cualquier otra área de tu hogar, Cif garantiza una limpieza profunda y efectiva. Confía en Cif para mantener un ambiente limpio y radiante en tu hogar."),
("aa8316a1-729e-4998-bb01-f30c873953e0", "Magistral aloe ultra detergente líquido 750 ml.", "Magistral ultra detergente", 9, 5, 333.19, 222, 1, 25, 10, 1000, 0, "detergenteMagistral.jpg", "El detergente Magistral es tu aliado supremo para una limpieza impecable en cada rincón de tu hogar. Su fórmula avanzada combate la grasa y la suciedad con una eficacia inigualable, garantizando resultados sorprendentes. Ya sea en la cocina, el baño o cualquier otra área, Magistral proporciona una limpieza profunda y duradera que transforma tus superficies. Confía en Magistral para mantener tu hogar impecable y brillante en todo momento."),
("62c10bfd-5cd3-4a88-947a-d828dc2ce5ef", "Lavavajilla concentrado Ala pomelo en botella 500 cc.", "Lavavajilla Ala pomelo", 10, 5, 333, 222, 1, 25, 10, 1000, 0, "detergenteAlaPomelo.jpg", "El detergente Ala se destaca por ser la opción preferida para una limpieza excepcional en tu hogar. Su fórmula avanzada elimina eficazmente la suciedad y las manchas más difíciles, logrando resultados sorprendentes. Ya sea en la ropa o en diversas superficies, Ala proporciona una limpieza profunda y duradera que transforma todo a su máximo esplendor. Confía en Ala para mantener tu ropa y tu hogar en su mejor estado, marcando la diferencia en la limpieza de tu vida diaria."),
("1aa55477-1e9c-466f-b874-837c05f234f5", "Lavavajilla concentrado Ala oceano en botella 500 cc.", "Lavavajilla Ala oceano", 10, 5, 333, 222, 1, 25, 10, 1000, 0, "detergenteAlaOceano.jpg", "El detergente Ala se destaca por ser la opción preferida para una limpieza excepcional en tu hogar. Su fórmula avanzada elimina eficazmente la suciedad y las manchas más difíciles, logrando resultados sorprendentes. Ya sea en la ropa o en diversas superficies, Ala proporciona una limpieza profunda y duradera que transforma todo a su máximo esplendor. Confía en Ala para mantener tu ropa y tu hogar en su mejor estado, marcando la diferencia en la limpieza de tu vida diaria."),
("751073f2-a86e-464d-804f-027f2121a219", "Lavandina Odex 1 l.", "Limpiador Odex 1 l", 11, 6, 333, 222, 1, 25, 10, 1000, 0, "lavandinaOdex1litro.jpg", "La lavandina Odex es tu solución esencial para mantener tu hogar limpio y desinfectado. Elimina eficazmente hongos, virus y bacterias en superficies diversas, desde baños hasta cocinas. Su versatilidad y eficacia la convierten en un aliado indispensable para la limpieza diaria, ofreciendo una desinfección confiable. Cuando la higiene es esencial, confía en Odex."),
("4304c6a8-027b-4340-a0d8-06bc651cf84c", "Lavandina Odex aditivada lavanda 2 l.", "Lavandina Odex 2 l", 11, 6, 333, 222, 1, 25, 10, 1000, 0, "lavandinaOdex2litros.jpg", "La lavandina Odex es tu solución esencial para mantener tu hogar limpio y desinfectado. Elimina eficazmente hongos, virus y bacterias en superficies diversas, desde baños hasta cocinas. Su versatilidad y eficacia la convierten en un aliado indispensable para la limpieza diaria, ofreciendo una desinfección confiable. Cuando la higiene es esencial, confía en Odex."),
("c20662c1-8ff0-4d8d-a9f9-2f8df941eb07", "Lavandina Ayudín clásica 1 l.", "Lavandina Ayudín 1 l", 12, 6, 333, 222, 1, 25, 10, 1000, 0, "lavandinaAyudin1litro.jpg", "La lavandina Ayudín Clásica mantiene todo su poder para desodorizar y desinfectar. Es ideal para que realices la limpieza de tu hogar, que lo utilices en diferentes superficies. Ayudín elimina el 99.9% de hongos, virus y bacterias. En el baño, la cocina y en otras áreas de la casa, podemos encontrar superficies contaminadas. Por eso, se recomienda la desinfección de los pisos de la cocina, living, cuartos, baño, patio y balcón; la mesada, pileta y utensilios de cocina, artefactos del baño, las llaves de las canillas, el botón de descarga del inodoro y las manijas de todas las puertas de la casa. Por su versatilidad y dado que es un producto de limpieza de los más económicos, es un aliado infaltable en los hogares, ofreciendo limpieza y desinfección por menos de $2 por día. Cuando realmente importa, confía en Ayudin."),
("2fcd9ed8-4785-425a-a708-5df96a48c310", "Lavandina Ayudín clásica 2 l.", "Lavandina Ayudín 2 l", 12, 6, 333, 222, 1, 0, 0, 1000, 0, "lavandinaAyudin2litros.jpg", "La lavandina Ayudín Clásica mantiene todo su poder para desodorizar y desinfectar. Es ideal para que realices la limpieza de tu hogar, que lo utilices en diferentes superficies. Ayudín elimina el 99.9% de hongos, virus y bacterias. En el baño, la cocina y en otras áreas de la casa, podemos encontrar superficies contaminadas. Por eso, se recomienda la desinfección de los pisos de la cocina, living, cuartos, baño, patio y balcón; la mesada, pileta y utensilios de cocina, artefactos del baño, las llaves de las canillas, el botón de descarga del inodoro y las manijas de todas las puertas de la casa. Por su versatilidad y dado que es un producto de limpieza de los más económicos, es un aliado infaltable en los hogares, ofreciendo limpieza y desinfección por menos de $2 por día. Cuando realmente importa, confía en Ayudin."),
("90157fc3-837e-48bb-bb90-68098c3723f7", "Lavandina Ayudín clásica 4 l.", "Lavandina Ayudín 4 l", 12, 6, 333, 222, 1, 25, 10, 1000, 0, "lavandinaAyudin4litros.jpg", "La lavandina Ayudín Clásica mantiene todo su poder para desodorizar y desinfectar. Es ideal para que realices la limpieza de tu hogar, que lo utilices en diferentes superficies. Ayudín elimina el 99.9% de hongos, virus y bacterias. En el baño, la cocina y en otras áreas de la casa, podemos encontrar superficies contaminadas. Por eso, se recomienda la desinfección de los pisos de la cocina, living, cuartos, baño, patio y balcón; la mesada, pileta y utensilios de cocina, artefactos del baño, las llaves de las canillas, el botón de descarga del inodoro y las manijas de todas las puertas de la casa. Por su versatilidad y dado que es un producto de limpieza de los más económicos, es un aliado infaltable en los hogares, ofreciendo limpieza y desinfección por menos de $2 por día. Cuando realmente importa, confía en Ayudin.");


insert into users values
("84a2eb0b-beac-4b67-82d6-be3f5e89c755", "consumidor@gmail.com", "$2a$10$sxNBXkT6upeSCi64xTLQQ.zcPi17IBTpnPnkLC1Qh0dkV7onn04BK","userDefault.png", 1554565434, 0),
("70fbb4da-fd38-4156-b7a4-841e2cb4a3cf", "administrador@gmail.com", "$2a$10$zvsrElYM/OzkcyH2zKdlv.E57Sem7u1jMmJKRWPWCcrSFda0SxFze","userDefault.png", 1552342323, 0),
("8afa3aa2-ffff-43c3-9268-2bf6b7622fbd", "mayorista@gmail.com", "$2a$10$datVPQUQF2Pk3eCq7Yaq/eKQhYF7l5UKdtOV/2rnjbtBcHtDl6Ojy","userDefault.png", 1111111111, 0),
("a5537012-542e-4438-8b1c-68f0de1468bc", "superadmin@gmail.com", "$2a$10$P4MboQUKZwxb1SnqtSrSCOS4lKcYAl49gFiGa6YXvtce69NYJopC2","userDefault.png", 2147483647, 0);


insert into usersCf values
("84a2eb0b-beac-4b67-82d6-be3f5e89c755", "Consumidor", "Final", 12123123);


insert into usersadmin values
("70fbb4da-fd38-4156-b7a4-841e2cb4a3cf", "Admin", "Administrador");


insert into usersmayoristas values
("8afa3aa2-ffff-43c3-9268-2bf6b7622fbd", "Mayorista", 1111111111);


insert into usersuperadmin values
("a5537012-542e-4438-8b1c-68f0de1468bc", "Super", "Admin");


insert into addresses values
("84a2eb0b-beac-4b67-82d6-be3f5e89c755", "pais", "provincia", "barrio", "calle", 10, "depto", "nota"),
("70fbb4da-fd38-4156-b7a4-841e2cb4a3cf", "pais", "provincia", "barrio", "calle", 10, "depto", "nota"),
("8afa3aa2-ffff-43c3-9268-2bf6b7622fbd", "pais", "provincia", "barrio", "calle", 10, "depto", "nota"),
("a5537012-542e-4438-8b1c-68f0de1468bc", "pais", "provincia", "barrio", "calle", 10, "depto", "nota");