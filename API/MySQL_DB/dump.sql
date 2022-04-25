-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema green_walley
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `green_walley` DEFAULT CHARACTER SET utf8 ;
USE `green_walley` ;


-- -----------------------------------------------------
-- Table `green_walley`.`aparts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_walley`.`aparts` (
  `apart_id` INT NOT NULL AUTO_INCREMENT,
  `apart_name` VARCHAR(45) NOT NULL,
  `apart_type` BOOLEAN NOT NULL,
  `apart_room_count` INT NOT NULL,
  PRIMARY KEY (`apart_id`),
  UNIQUE INDEX `apart_name_UNIQUE` (`apart_name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `green_walley`.`apart_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_walley`.`apart_items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(45) NOT NULL ,
  `item_given_date` DATE NOT NULL,
  `apart_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `fk_apart_items_aparts_idx` (`apart_id` ASC) ,
  CONSTRAINT `fk_apart_items_aparts`
    FOREIGN KEY (`apart_id`)
    REFERENCES `green_walley`.`aparts` (`apart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `green_walley`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_walley`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(45) NOT NULL,
  `customer_phone` VARCHAR(45) NOT NULL,
  `identity_number` VARCHAR(11) NOT NULL,
  `contract_date` DATE NOT NULL,
  `monthly_contract_length` INT NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT '1',
  `apart_id` INT NOT NULL,
  PRIMARY KEY (`customer_id`),
  INDEX `fk_customers_aparts_idx` (`apart_id` ASC) ,
  CONSTRAINT `fk_customers_aparts`
    FOREIGN KEY (`apart_id`)
    REFERENCES `green_walley`.`aparts` (`apart_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `green_walley`.`invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_walley`.`invoices` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `invoice_date` DATE NOT NULL,
  `invoice_payday` DATE NULL DEFAULT NULL,
  `cost` INT NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT '0',
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `fk_invoices_customers_idx` (`customer_id` ASC) ,
  CONSTRAINT `fk_invoices_customers`
    FOREIGN KEY (`customer_id`)
    REFERENCES `green_walley`.`customers` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `green_walley`.`personals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_walley`.`personals` (
  `personal_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `pwd` VARCHAR(500) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL DEFAULT 'personal',
  PRIMARY KEY (`personal_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `green_walley`.`personals` (`username`, `pwd`, `phone`, `type`) VALUES ('admin', '$2b$10$pX1m/lT./d7BbUrDjnlCeOMLcnjAHQb8d1StBfDZtypGsoujXUgga', '5', 'admin');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
