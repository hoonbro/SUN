CREATE SCHEMA IF NOT EXISTS `tingle` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `tingle` ;
CREATE TABLE IF NOT EXISTS `tingle`.`member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `auth` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `default_calendar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `member_id_UNIQUE` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tingle`.`calendar` (
   `calendar_code` varchar(255) NOT NULL,
  `calendar_name` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`calendar_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tingle`.`calendar_share` (
   `share_id` bigint NOT NULL AUTO_INCREMENT,
  `calendar_code` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tingle`.`mission` (
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tingle`.`mission_file` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_uuid` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `tingle`.`teacher_file` (
 `file_id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_uuid` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





CREATE TABLE IF NOT EXISTS `tingle`.`chat_message` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT NOT NULL,
  `sent_time` DATETIME(6) NOT NULL,
  `content` TEXT NULL,
  `is_read` BIT(1) NULL,
  `file_id` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `chat_room_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_member1_idx` (`sender_id` ASC) VISIBLE,
  INDEX `fk_chat_message_files2_idx` (`file_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_member1` FOREIGN KEY (`sender_id`) REFERENCES `tingle`.`member` (`id`))
 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tingle`.`chat_room` (
  `id` VARCHAR(255) NOT NULL,
  `mission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mission_chat_room` FOREIGN KEY (`mission_id`) REFERENCES `tingle`.`mission` (`mission_id`))
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
