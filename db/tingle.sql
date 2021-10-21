-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tingle
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `calendar_code` varchar(50) NOT NULL,
  `calendar_name` varchar(50) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`calendar_code`),
  KEY `calendar_fk_member_id_idx` (`member_id`),
  CONSTRAINT `calendar_fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar_share`
--

DROP TABLE IF EXISTS `calendar_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_share` (
  `share_id` int NOT NULL AUTO_INCREMENT,
  `calendar_code` varchar(50) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`share_id`),
  KEY `calendar_pk_caelndar_code_idx` (`calendar_code`),
  KEY `calendar_share_fk_member_id_idx` (`member_id`),
  CONSTRAINT `calendar_pk_caelndar_code` FOREIGN KEY (`calendar_code`) REFERENCES `calendar` (`calendar_code`),
  CONSTRAINT `calendar_share_fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_share`
--

LOCK TABLES `calendar_share` WRITE;
/*!40000 ALTER TABLE `calendar_share` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `auth` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `member_id_UNIQUE` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `mission_id` int NOT NULL AUTO_INCREMENT,
  `mission_name` varchar(45) NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `calendar_code` varchar(50) NOT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mission_id`),
  KEY `calendar_pk_calendar_code_idx` (`calendar_code`),
  CONSTRAINT `calendar_pk_calendar_code` FOREIGN KEY (`calendar_code`) REFERENCES `calendar` (`calendar_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_file`
--

DROP TABLE IF EXISTS `mission_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `file_uuid` varchar(255) NOT NULL,
  `mission_id` int NOT NULL,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `mission_id_UNIQUE` (`mission_id`),
  CONSTRAINT `mission_file_fk_mission_id` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_file`
--

LOCK TABLES `mission_file` WRITE;
/*!40000 ALTER TABLE `mission_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `mission_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-21 14:39:28
