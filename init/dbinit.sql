create database if not exists `minCohortDb` character set = `utf8`;

create table if not exists `minCohortDb`.`userRegister` (
	`number` int unsigned primary key auto_increment,
	`userId` varchar(100) not null unique,
	`ts`     date not null,
	 index (`ts`, `userId`)
) ENGINE = myisam;

create table if not exists `minCohortDb`.`userLogin` (
	`number` int unsigned primary key auto_increment,
	`userId` varchar(100) not null,
	`ts`     date not null,
	index (`ts`, `userId`)
) ENGINE = myisam;

create table if not exists `minCohortDb`.`userPurchase` (
	`number` int unsigned primary key auto_increment,
	`userId` varchar(100) not null,
	`ts`     date not null,
	index (`ts`, `userId`)
) ENGINE = myisam;
