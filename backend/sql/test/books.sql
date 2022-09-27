CREATE SCHEMA `test`;
go

CREATE TABLE `test`.`books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` NVARCHAR(50) NOT NULL,
  `desc` NVARCHAR(255),
  `cover` NVARCHAR(50),
  `price` int NOT NULL
  PRIMARY KEY (`id`));
go

INSERT INTO `test`.`books` (`title`,`desc`,`cover`,`price`) VALUES('Sabina Sturzu','Girl with books','sabina-sturzu.jpg',100)
go