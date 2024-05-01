CREATE DATABASE  IF NOT EXISTS `saveapet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `saveapet`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: saveapet
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Centers`
--

DROP TABLE IF EXISTS `Centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Centers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Centers`
--

LOCK TABLES `Centers` WRITE;
/*!40000 ALTER TABLE `Centers` DISABLE KEYS */;
INSERT INTO `Centers` VALUES (1,'Centro','centro@gmail.com','$2b$10$Azt6TNb1/47IHIicYl8IF.j4VV4zGuGf/ahGrxIJog.Kjsxl9lfIa','22222222','centro.co,','Reus','c/ Calle, 11','2024-05-01 16:59:33','2024-05-01 16:59:33'),(2,'Pets','centro2@gmail.com','$2b$10$YYs.ANXdYXfh.uWYccDSteiwy0qYSCICOhmrcYnBASkIeMO2scgjq','00000987','firulais.com','Albacete','c/ España','2024-05-01 17:13:35','2024-05-01 17:13:35'),(3,'Centro 33','centro3@gmail.com','$2b$10$Fr.sGS/SQxYf1U/becX1N.7zIBn4ZcZKBIbiRex6PZyfHQU6h1vH.','88755','nonguna.com','Bilbao','c/ Hola','2024-05-01 17:18:03','2024-05-01 17:18:03');
/*!40000 ALTER TABLE `Centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pets`
--

DROP TABLE IF EXISTS `Pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `size` enum('grande','mediano','pequeño') NOT NULL DEFAULT 'grande',
  `temper` enum('energico','calmado','jugueton','timido') NOT NULL DEFAULT 'energico',
  `dogs_friendly` tinyint(1) NOT NULL DEFAULT '0',
  `kids_friendly` tinyint(1) NOT NULL DEFAULT '0',
  `urgency` enum('urgente','no urgente') NOT NULL DEFAULT 'no urgente',
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CenterId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CenterId` (`CenterId`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`CenterId`) REFERENCES `Centers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pets`
--

LOCK TABLES `Pets` WRITE;
/*!40000 ALTER TABLE `Pets` DISABLE KEYS */;
INSERT INTO `Pets` VALUES (1,'Lenny','Husky',15,'grande','energico',1,1,'urgente','1714582832784_510991252_huskyjpg.jpg','2024-05-01 17:00:32','2024-05-01 17:00:32',1),(2,'Samuel','samoyedo',2,'grande','jugueton',0,1,'urgente','1714582861371_979932320_samoyedo.jpg','2024-05-01 17:01:01','2024-05-01 17:01:01',1),(3,'Rex, el perro policia','Pastor aleman',5,'grande','calmado',0,0,'urgente','1714582895019_860813098_pastoraleman.jpg','2024-05-01 17:01:35','2024-05-01 17:01:35',1),(4,'Tobi y Paquito','perrolobo checoslovaco',0,'pequeño','energico',0,1,'no urgente','1714582979956_907980300_checos.jpg','2024-05-01 17:02:59','2024-05-01 17:02:59',1),(5,'Carlos','Pug',2,'pequeño','timido',1,0,'no urgente','1714583118086_161327972_pug.jpg','2024-05-01 17:05:18','2024-05-01 17:05:18',1),(6,'Carlin','Pug',4,'pequeño','jugueton',1,1,'no urgente','1714583186602_138568984_carlin.jpg','2024-05-01 17:06:26','2024-05-01 17:06:26',1),(7,'Canijete','Caniche',2,'mediano','timido',0,0,'urgente','1714583264880_938005087_caniche.jpg','2024-05-01 17:07:44','2024-05-01 17:07:44',1),(8,'Firulais','mestizo',4,'pequeño','jugueton',1,1,'urgente','1714583450872_491815768_firulais.jpg','2024-05-01 17:10:50','2024-05-01 17:10:50',1),(9,'Doggy','Dogo Aleman',7,'grande','calmado',1,1,'no urgente','1714583539426_790406737_DOGO-ALEMÃN.jpg','2024-05-01 17:12:19','2024-05-01 17:12:19',1),(10,'Goliat','Gran Danes',6,'grande','calmado',1,0,'urgente','1714583711708_842057869_Dogge_Odin.jpg','2024-05-01 17:15:11','2024-05-01 17:15:11',2),(11,'Anselmo','Shiba Inu',9,'mediano','calmado',0,1,'urgente','1714583770750_171903037_Anselmo.jpg','2024-05-01 17:16:10','2024-05-01 17:16:10',2),(12,'Inuyasha','Shiba Inu',8,'mediano','energico',1,0,'urgente','1714583819880_242282125_Shiba-inu-1.jpg','2024-05-01 17:16:59','2024-05-01 17:16:59',2),(13,'Manolo','Yorshire',13,'pequeño','jugueton',0,1,'urgente','1714583958795_791691523_terrier-1-1024x682.jpg','2024-05-01 17:19:18','2024-05-01 17:19:18',3),(14,'Chewbacca','Chow Chow',6,'grande','energico',1,0,'urgente','1714584013348_16776674_sitesdefaultfilesstylessquare_medium_440x440public2022-07Chow-Chow.jpg','2024-05-01 17:20:13','2024-05-01 17:20:13',3);
/*!40000 ALTER TABLE `Pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPetMatches`
--

DROP TABLE IF EXISTS `UserPetMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserPetMatches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `liked` tinyint(1) NOT NULL DEFAULT '0',
  `adopted` tinyint(1) NOT NULL DEFAULT '0',
  `watched` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `petId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserPetMatches_userId_petId_unique` (`petId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userpetmatches_ibfk_1` FOREIGN KEY (`petId`) REFERENCES `Pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userpetmatches_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPetMatches`
--

LOCK TABLES `UserPetMatches` WRITE;
/*!40000 ALTER TABLE `UserPetMatches` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserPetMatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `already_logged` tinyint(1) DEFAULT '0',
  `home` enum('casa','piso','otro') DEFAULT NULL,
  `other_pets` tinyint(1) DEFAULT NULL,
  `age_range` enum('cachorro','joven','mayor') DEFAULT NULL,
  `kids_at_home` tinyint(1) DEFAULT NULL,
  `ill_pets` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'User','user@gmail.com','$2b$10$ABYrpEfh2gFb2W3P.j2y2uN39J/Z8zlYJVy310aRLklXxBjJA2iie','666666666','Igualada',1,'piso',1,'cachorro',1,1,'2024-05-01 16:53:38','2024-05-01 16:55:14'),(2,'user2','user2@gmail.com','$2b$10$28XkatcK64DAbjohbbA6F.Vk6AKF5rliQiRe8TadfYj5Hy7hwMNEG','88888888','Tarragona',0,NULL,NULL,NULL,NULL,NULL,'2024-05-01 16:54:06','2024-05-01 16:54:06');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-01 19:25:43
