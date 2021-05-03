CREATE DATABASE IF NOT EXISTS `base`;
USE base;
CREATE TABLE user (
       `id` int(11) NOT NULL AUTO_INCREMENT,
       `email` varchar(255) NOT NULL UNIQUE,
       `password` varchar(255) NOT NULL,
       `name` varchar(255) NOT NULL,
       `firstname` varchar(255) NOT NULL,
       `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
       PRIMARY KEY (id)
);