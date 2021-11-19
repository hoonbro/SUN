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
  `calendar_code` varchar(255) NOT NULL,
  `calendar_name` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`calendar_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES ('a5CSMlDBKu','file후후 캘린더',3),('fdzen0q727','mj의 캘린더',5),('fhM08wdEC3','명쭌의 캘린더',6),('HdaDbHr2rP','선명준의 zzzz 캘린더',3),('s9e906ol8N','mj의 캘린더',4),('xNrgiEtFtn','11월 8일자 캘린더',5);
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar_share`
--

DROP TABLE IF EXISTS `calendar_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_share` (
  `share_id` bigint NOT NULL AUTO_INCREMENT,
  `calendar_code` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_share`
--

LOCK TABLES `calendar_share` WRITE;
/*!40000 ALTER TABLE `calendar_share` DISABLE KEYS */;
INSERT INTO `calendar_share` VALUES (2,'fdzen0q727',4),(3,'a5CSMlDBKu',4),(5,'xNrgiEtFtn',6);
/*!40000 ALTER TABLE `calendar_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  `sent_time` datetime(6) DEFAULT NULL,
  `chat_room_id` varchar(255) DEFAULT NULL,
  `file_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj52yap2xrm9u0721dct0tjor9` (`chat_room_id`),
  CONSTRAINT `FKj52yap2xrm9u0721dct0tjor9` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` varchar(255) NOT NULL,
  `mission_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfu3sm5cr1h2uarvuf2sgsm4xp` (`mission_id`),
  CONSTRAINT `FKfu3sm5cr1h2uarvuf2sgsm4xp` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES ('50',50),('51',51),('52',52),('53',53),('54',54),('55',55),('56',56),('57',57),('58',58),('59',59),('60',60),('61',61),('62',62),('63',63),('64',64),('65',65),('66',66),('67',67),('68',68),('69',69),('70',70),('71',71),('72',72),('73',73),('74',74),('75',75);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `auth` varchar(255) DEFAULT NULL,
  `default_calendar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (3,'ROLE_TEACHER','0Aqz5mJICZ','1222@naver.com','audwns101','mj','$2a$10$u69dtLX5U.ZK07aXMex48eZz7c6iug9NNXCcCUFAzk6iRFpf5epEC','010-1234-1234',NULL),(4,'ROLE_TEACHER','s9e906ol8N','12222@naver.com','audwns102','mj','$2a$10$GKjGYdPljdA9bD0UKux4Eu9xl81aypnnX0QSV796XbyD.mywSdXp6','010-1234-1234',NULL),(5,'ROLE_TEACHER','fdzen0q727','12232@naver.com','audwns103','mj','$2a$10$T9FUc9T24IhUn.78MugBt..89cRCWQrdk0reVnNm.Oy26lN09oMEq','010-1234-1234',NULL),(6,'ROLE_STUDENT','fhM08wdEC3','sun0903@naver.com','testing1','명쭌','$2a$10$WdzShik3SPQanbZL/.WMae9IiRlZJzyTN.AaWWpZ5mEbKSi8hEZ7e','010-1234-1234',NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `mission_id` bigint NOT NULL AUTO_INCREMENT,
  `calendar_code` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
INSERT INTO `mission` VALUES (29,'s9e906ol8N',4,'','ㅈ','2121-12-27','14:00','2021-12-23','15:00'),(30,'s9e906ol8N',4,'','ㅈ','2121-12-27','14:00','2021-12-23','15:00'),(31,'vVYZsPUhsN',4,'&@&#키키','ㅈㅈㅈ','2121-12-27','14:00','2021-12-23','15:00'),(32,'s9e906ol8N',4,'','tt6666','2021-12-30','17:30','2021-12-29','16:32'),(33,'s9e906ol8N',4,'','이미 성공','2021-12-30','17:30','2021-12-29','16:32'),(34,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 5555번 과제','2021-11-15','21:00','2021-11-15','20:30'),(35,'s9e906ol8N',4,'&@&캬캬&@&#키키&@&@@코코','final test32323444','2121-12-27','14:00','2021-12-23','15:00'),(36,'s9e906ol8N',4,'&@&캬캬&@&#키키&@&@@코코','final test32323444','2121-12-27','14:00','2021-12-23','15:00'),(37,'s9e906ol8N',4,'&@&캬캬&@&#키키&@&@@코코','ㅅㅅㅅㄱ','2121-12-27','14:00','2021-12-23','15:00'),(38,'fdzen0q727',5,'&@&#Reading&@&#AR1.0&@&#GR Lv.0','ㅋㅋ','2021-11-06','17:30','2021-11-05','16:32'),(39,'fdzen0q727',5,'&@&#Reading&@&#AR1.0&@&#GR Lv.0','ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ','2021-11-06','17:30','2021-11-05','16:32'),(40,'fdzen0q727',5,'&@&#Reading&@&#AR1.0&@&#GR Lv.0','ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ','2021-12-30','17:30','2021-12-23','16:32'),(41,'fdzen0q727',5,'&@&#Reading&@&#AR1.0&@&#GR Lv.0','ㅅㅅㅅㅅㅅㅅㅅㅅㅅ','2021-12-30','17:30','2021-12-23','16:32'),(42,'s9e906ol8N',4,'&@&키키','aaaaaaaaaaaaaaaaaaaaaa','2121-12-27','14:00','2021-12-23','15:00'),(43,'s9e906ol8N',4,'','testtestetstset2222','2021-12-30','17:30','2021-12-23','16:32'),(44,'s9e906ol8N',4,'','testtestetstset333','2021-12-30','17:30','2021-12-23','16:32'),(45,'s9e906ol8N',4,'&@&#GR Lv.0','audwns 과제 22','2021-12-30','17:30','2021-12-23','16:32'),(46,'s9e906ol8N',4,'&@&#GR Lv.0','audwns 과제 22','2021-12-30','17:30','2021-12-23','16:32'),(47,'s9e906ol8N',4,'&@&#GR Lv.0','audwns 과제 22','2021-12-30','17:30','2021-12-23','16:32'),(48,'s9e906ol8N',4,'&@&#GR Lv.0','audwns 과제 22','2021-12-30','17:30','2021-12-23','16:32'),(50,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 1번 과제','2021-11-15','21:00','2021-11-15','20:30'),(51,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 2번 과제','2021-11-15','21:00','2021-11-15','20:30'),(52,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 2번 과제','2021-11-15','21:00','2021-11-15','20:30'),(53,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 2번 과제','2021-11-15','21:00','2021-11-15','20:30'),(54,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 2번 과제','2021-11-15','21:00','2021-11-15','20:30'),(55,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 3번 과제','2021-11-15','21:00','2021-11-15','20:30'),(56,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 3번 과제','2021-11-15','21:00','2021-11-15','20:30'),(57,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 3번 과제','2021-11-15','21:00','2021-11-15','20:30'),(58,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 5555번 과제','2021-11-15','21:00','2021-11-15','20:30'),(59,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 5555번 과제','2021-11-15','21:00','2021-11-15','20:30'),(60,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜 6666 과제','2021-11-15','21:00','2021-11-15','20:30'),(61,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜5555555555번 과제','2021-11-15','21:00','2021-11-15','20:30'),(62,'a5CSMlDBKu',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 진짜진짜5555555555번 과제','2021-11-15','21:00','2021-11-15','20:30'),(63,'a5CSMlDBKu',4,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 11 과제','2021-11-15','21:00','2021-11-15','20:30'),(64,'a5CSMlDBKu',4,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 3333 과제','2021-11-15','21:00','2021-11-15','20:30'),(65,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 11 과제','2021-11-15','21:00','2021-11-15','20:30'),(66,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 444 과제','2021-11-15','21:00','2021-11-15','20:30'),(67,'HdaDbHr2rP',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(68,'HdaDbHr2rP',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(69,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(70,'a5CSMlDBKu',3,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(71,'xNrgiEtFtn',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(72,'xNrgiEtFtn',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(73,'xNrgiEtFtn',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30'),(74,'xNrgiEtFtn',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 444 과제','2021-11-15','21:00','2021-11-15','20:30'),(75,'xNrgiEtFtn',5,'&@&하하하하하하하&@&ㅋ타카카카카카카카&@&바바바바바바바','명준이의 22 과제','2021-11-15','21:00','2021-11-15','20:30');
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_file`
--

DROP TABLE IF EXISTS `mission_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_file` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_uuid` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_file`
--

LOCK TABLES `mission_file` WRITE;
/*!40000 ALTER TABLE `mission_file` DISABLE KEYS */;
INSERT INTO `mission_file` VALUES (2,'img3번.jpg','https://d101.s3.ap-northeast-2.amazonaws.com/f847d0ab8314481aacd80199a854349b.jpg',4,31,NULL),(3,'img3번.jpg','5671aace71cc4fbd84962ec7ac942337.jpg',4,31,NULL);
/*!40000 ALTER TABLE `mission_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `calendar_code` varchar(255) DEFAULT NULL,
  `calendar_name` varchar(255) DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `send_time` time DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  `is_check` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKpmlp6s1c1f8mnt8irb2uo5ohu` (`mission_id`),
  CONSTRAINT `FKpmlp6s1c1f8mnt8irb2uo5ohu` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`mission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (185,'xNrgiEtFtn','11월 8일자 캘린더',NULL,'2021-11-18','20:58:42',6,'calendar_in',NULL,0),(186,'xNrgiEtFtn','11월 8일자 캘린더',NULL,'2021-11-18','20:59:20',5,'mission_create',73,0),(187,'xNrgiEtFtn','11월 8일자 캘린더',NULL,'2021-11-18','20:59:20',5,'mission_create',74,0),(188,'xNrgiEtFtn','11월 8일자 캘린더',NULL,'2021-11-18','20:59:21',5,'mission_create',75,0),(189,'xNrgiEtFtn','11월 8일자 캘린더',NULL,'2021-11-18','20:59:33',5,'mission_update',74,0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_check`
--

DROP TABLE IF EXISTS `notification_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_check` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_check` tinyint(1) DEFAULT '0',
  `member_id` bigint DEFAULT NULL,
  `notification_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_check`
--

LOCK TABLES `notification_check` WRITE;
/*!40000 ALTER TABLE `notification_check` DISABLE KEYS */;
INSERT INTO `notification_check` VALUES (50,0,5,185),(52,0,5,186),(54,0,5,187),(55,0,6,187),(56,0,5,188),(57,0,6,188),(58,0,5,189),(59,0,6,189);
/*!40000 ALTER TABLE `notification_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_file`
--

DROP TABLE IF EXISTS `teacher_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_file` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_uuid` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_file`
--

LOCK TABLES `teacher_file` WRITE;
/*!40000 ALTER TABLE `teacher_file` DISABLE KEYS */;
INSERT INTO `teacher_file` VALUES (64,'사진_2021-10-26.jpg','634bd7c3f45645259b1b52a3e2e8e63f.jpg',4,35),(65,'img3번.jpg','07ce7c2c9cd440a7bdf88a234cabc24c.jpg',4,35),(69,'사진_2021-10-26.jpg','a65b825bfff8462cb3d1d7c29a8d1b5d.jpg',4,36),(70,'img3번.jpg','5f467a66af024405b21d0cdbfb73a1bc.jpg',4,36),(96,'사진_2021-10-26.jpg','5a8cc04827a84dceb9a2a944b0614b88.jpg',4,37),(97,'img3번.jpg','30e02fef422646328914fc445ee39141.jpg',4,37),(98,'img1번.jpg','124f4d1b511e481bb7c064495a6f9993.jpg',5,38),(99,'img1번.jpg','c21184906df7480aa1f968c8b97ff46b.jpg',5,39),(100,'img1번.jpg','14aeb6b6f8e746ed8126a3c2e7bd9c59.jpg',5,40),(101,'img1번.jpg','9039871b3e344db9bd0e4f144a01176e.jpg',5,41),(103,'img1번.jpg','dec05a9e569e4301a0e9329b9cf1575b.jpg',4,43),(104,'img1번.jpg','eedeba1a6d9a4772aa3d5ce70c4b7f37.jpg',4,44),(106,'사진_2021-10-26.jpg','232b19fe8fb9430bbae73b79a8ade3e5.jpg',4,31),(132,'사진_2021-10-26.jpg','7020ab8601c147c8862da991c0a633cc.jpg',4,45),(133,'사진_2021-10-26.jpg','8547175d112f452b93fcfdd1ebd07ef9.jpg',4,46),(136,'사진_2021-10-26.jpg','e54642050e274d3eba199253a60c44a6.jpg',4,47),(139,'사진_2021-10-26.jpg','0f4cfe0a76e742af93bd622a6b30ec32.jpg',4,48),(145,'사진_2021-10-26.jpg','cc0ebf836cf54644b617584d52a7441b.jpg',4,42),(149,'ㅋㅋㅋ.docx','928bd658c38b470dad0ae1bf0146c45d.docx',3,57),(150,'img2번.jpg','906d49a36e044bce9b1b303e2dd6abef.jpg',3,57),(151,'세부그림1.jpg','d37be2e57c754df1abf92dd6b2a95a48.jpg',3,57),(154,'크크크.jpg','4dcc2e9587874480a9fc511df738fcff.jpg',3,58),(155,'img5번.jpg','07b1ef2743184ed2944f09284f3e927d.jpg',3,58),(157,'ㅋㅋㅋ.docx','6d8240cda0f04cdbb75ca797ae80fd3f.docx',3,59),(158,'test11번.jpg','c3174b4089014f2d857bad2226b34136.jpg',3,59),(159,'사진2번.jpg','f18f7943ff684c06a3a6575f81961607.jpg',3,NULL);
/*!40000 ALTER TABLE `teacher_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expire_time` bigint DEFAULT NULL,
  `mid` bigint DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_15gxur5anhs9nlx62ef6cx3sk` (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19 11:36:24
