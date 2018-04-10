-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2016 at 06:03 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

--
-- Database: `pix_landingpage_builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `nqt_category_icon`
--

DROP TABLE IF EXISTS `nqt_category_icon`;
CREATE TABLE IF NOT EXISTS `nqt_category_icon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nqt_category_icon`
--

-- --------------------------------------------------------

--
-- Table structure for table `nqt_icons`
--

DROP TABLE IF EXISTS `nqt_icons`;
CREATE TABLE IF NOT EXISTS `nqt_icons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `value` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nqt_icons`
--