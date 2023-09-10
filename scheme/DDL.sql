CREATE TABLE IF NOT EXISTS `user`
(
    `u_index`      INT(11)      NOT NULL AUTO_INCREMENT COMMENT '관리번호',
    `u_username`   VARCHAR(255) NOT NULL COMMENT '고유 아이디',
    `u_password`   VARCHAR(255) NOT NULL COMMENT '비밀번호',
    `u_email`      VARCHAR(255) NOT NULL COMMENT '이메일',
    `u_uk_uid`     INT(11)      NULL COMMENT '유저 카카오 관리번호',
    `u_un_uid`     INT(11)      NULL COMMENT '유저 네이버 관리번호',
    `u_ug_uid`     INT(11)      NULL COMMENT '유저 구글 관리번호',
    `u_ua_uid`     INT(11)      NULL COMMENT '유저 애플 관리번호',
    `u_created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    `u_updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`u_index`),
    UNIQUE KEY `user_u_username` (`u_username`),
    UNIQUE KEY `user_u_email` (`u_email`),
    UNIQUE KEY `user_u_uk_index` (`u_uk_uid`),
    UNIQUE KEY `user_u_un_index` (`u_un_uid`),
    UNIQUE KEY `user_u_ug_index` (`u_ug_uid`),
    UNIQUE KEY `user_u_ua_index` (`u_ua_uid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_unicode_ci COMMENT '유저';

CREATE TABLE IF NOT EXISTS `user_kakao`
(
    `uk_index`             INT(11)      NOT NULL AUTO_INCREMENT COMMENT '관리번호',
    `uk_uid`               VARCHAR(255) NOT NULL COMMENT '고유 아이디',
    `uk_nickname`          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '닉네임',
    `uk_name`              VARCHAR(255) NOT NULL DEFAULT '' COMMENT '이름',
    `uk_email`             VARCHAR(255) NOT NULL DEFAULT '' COMMENT '이메일',
    `uk_gender`            VARCHAR(255) NOT NULL DEFAULT '' COMMENT '성별',
    `uk_age`               VARCHAR(255) NOT NULL DEFAULT '' COMMENT '나이',
    `uk_birthday`          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '생일',
    `uk_profile_image_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '프로필 이미지',
    `uk_phone_number`      VARCHAR(255) NOT NULL DEFAULT '' COMMENT '전화번호',
    `uk_created_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    `uk_updated_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`uk_index`),
    UNIQUE KEY `user_kakao_uk_uid` (`uk_uid`),
    KEY `user_kakao_uk_email` (`uk_email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_unicode_ci COMMENT '유저 카카오';

CREATE TABLE IF NOT EXISTS `user_naver`
(
    `un_index`             INT(11)      NOT NULL AUTO_INCREMENT COMMENT '관리번호',
    `un_uid`               VARCHAR(255) NOT NULL COMMENT '고유 아이디',
    `un_nickname`          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '닉네임',
    `un_name`              VARCHAR(255) NOT NULL DEFAULT '' COMMENT '이름',
    `un_email`             VARCHAR(255) NOT NULL DEFAULT '' COMMENT '이메일',
    `un_gender`            VARCHAR(255) NOT NULL DEFAULT '' COMMENT '성별',
    `un_age`               VARCHAR(255) NOT NULL DEFAULT '' COMMENT '나이',
    `un_birthday`          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '생일',
    `un_profile_image_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '프로필 이미지',
    `un_phone_number`      VARCHAR(255) NOT NULL DEFAULT '' COMMENT '전화번호',
    `un_created_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    `un_updated_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`un_index`),
    UNIQUE KEY `user_naver_un_uid` (`un_uid`),
    KEY `user_naver_un_email` (`un_email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_unicode_ci COMMENT '유저 네이버';

CREATE TABLE IF NOT EXISTS `user_google`
(
    `ug_index`             INT(11)      NOT NULL AUTO_INCREMENT COMMENT '관리번호',
    `ug_uid`               VARCHAR(255) NOT NULL COMMENT '고유 아이디',
    `ug_email`             VARCHAR(255) NOT NULL DEFAULT '' COMMENT '이메일',
    `ug_profile_image_url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '프로필 이미지',
    `ug_created_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    `ug_updated_at`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`ug_index`),
    UNIQUE KEY `user_google_ug_uid` (`ug_uid`),
    KEY `user_google_ug_email` (`ug_email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_unicode_ci COMMENT '유저 구글';

CREATE TABLE IF NOT EXISTS `user_apple`
(
    `ua_index`      INT(11)      NOT NULL AUTO_INCREMENT COMMENT '관리번호',
    `ua_uid`        VARCHAR(255) NOT NULL COMMENT '고유 아이디',
    `ua_created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    `ua_updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    PRIMARY KEY (`ua_index`),
    UNIQUE KEY `user_apple_ua_uid` (`ua_uid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_unicode_ci COMMENT '유저 애플';
