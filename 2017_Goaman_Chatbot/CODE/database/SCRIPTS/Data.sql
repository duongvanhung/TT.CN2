-- 2016_12_07
UPDATE `nqt_category` SET `porder` = '200' WHERE `nqt_category`.`id` = 8;
UPDATE `nqt_category` SET `porder` = '190' WHERE `nqt_category`.`id` = 29;

UPDATE `admin_nqt_users` SET `password` = MD5('pfe7iaan') WHERE `admin_nqt_users`.`id` = 1;
UPDATE `admin_nqt_users` SET `password` = MD5('tar0rapa') WHERE `admin_nqt_users`.`id` = 2;

