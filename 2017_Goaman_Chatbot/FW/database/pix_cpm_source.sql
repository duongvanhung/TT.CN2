-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2016 at 10:21 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pix_cpm_source`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_nqt_groups`
--

DROP TABLE IF EXISTS `admin_nqt_groups`;
CREATE TABLE `admin_nqt_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nqt_groups`
--

INSERT INTO `admin_nqt_groups` (`id`, `name`, `permission`, `status`, `created`) VALUES
(1, 'Root', '0|rwd,2|rwd,1|rwd,4|rwd,3|rwd,185|rwd,12|rwd,193|rwd,195|rwd,205|rwd,211|rwd,7|rwd', 1, '2012-08-28 14:51:26');

-- --------------------------------------------------------

--
-- Table structure for table `admin_nqt_logs`
--

DROP TABLE IF EXISTS `admin_nqt_logs`;
CREATE TABLE `admin_nqt_logs` (
  `id` int(11) NOT NULL,
  `function` varchar(50) NOT NULL,
  `function_id` int(11) NOT NULL,
  `field` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `old_value` text NOT NULL,
  `new_value` text NOT NULL,
  `account` varchar(50) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `admin_nqt_modules`
--

DROP TABLE IF EXISTS `admin_nqt_modules`;
CREATE TABLE `admin_nqt_modules` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_function` varchar(50) NOT NULL,
  `icon` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nqt_modules`
--

INSERT INTO `admin_nqt_modules` (`id`, `name`, `name_function`, `icon`, `status`, `created`) VALUES
(1, 'Manager Account Group', 'admincp_account_groups', 'icon-users', 1, '2012-08-16 15:53:42'),
(2, 'Manager Account', 'admincp_accounts', 'icon-user', 1, '2012-08-16 15:53:42'),
(3, 'Manager Module', 'admincp_modules', 'icon-layers', 1, '2012-08-16 15:53:42'),
(4, 'Manager Logs', 'admincp_logs', 'icon-note', 1, '2012-08-16 15:53:42'),
(5, 'Import Store', 'import_store', 'icon-cloud-upload', 1, '2016-01-21 17:29:41');

-- --------------------------------------------------------

--
-- Table structure for table `admin_nqt_settings`
--

DROP TABLE IF EXISTS `admin_nqt_settings`;
CREATE TABLE `admin_nqt_settings` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nqt_settings`
--

INSERT INTO `admin_nqt_settings` (`id`, `slug`, `content`, `modified`) VALUES
(1, 'title-admincp', 'Admin Control Panel', '2015-05-05 16:38:26');

-- --------------------------------------------------------

--
-- Table structure for table `admin_nqt_users`
--

DROP TABLE IF EXISTS `admin_nqt_users`;
CREATE TABLE `admin_nqt_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission` varchar(255) NOT NULL,
  `custom_permission` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nqt_users`
--

INSERT INTO `admin_nqt_users` (`id`, `username`, `password`, `group_id`, `permission`, `custom_permission`, `status`, `created`) VALUES
(1, 'root', 'eff5b3fe8427dea01bec6c305f09cb9a', 1, '2|rwd,1|rwd,4|rwd,3|rwd,185|rwd,12|rwd,193|rwd,195|rwd,205|rwd,211|rwd,7|rwd', 0, 1, '2012-08-28 14:52:42'),
(2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, '2|rwd,1|rwd,4|rwd,3|rwd,185|rwd,12|rwd,193|rwd,195|rwd,205|rwd,211|rwd,7|rwd', 0, 1, '2012-08-28 14:52:59');

-- --------------------------------------------------------

--
-- Table structure for table `ci_session`
--

DROP TABLE IF EXISTS `ci_session`;
CREATE TABLE `ci_session` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ci_session`
--

-- --------------------------------------------------------

--
-- Table structure for table `pix_attribute`
--
--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_nqt_groups`
--
ALTER TABLE `admin_nqt_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nqt_logs`
--
ALTER TABLE `admin_nqt_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nqt_modules`
--
ALTER TABLE `admin_nqt_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nqt_settings`
--
ALTER TABLE `admin_nqt_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nqt_users`
--
ALTER TABLE `admin_nqt_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_session`
--
ALTER TABLE `ci_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `pix_attribute`
--

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_nqt_groups`
--
ALTER TABLE `admin_nqt_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `admin_nqt_logs`
--
ALTER TABLE `admin_nqt_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `admin_nqt_modules`
--
ALTER TABLE `admin_nqt_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `admin_nqt_settings`
--
ALTER TABLE `admin_nqt_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `admin_nqt_users`
--
ALTER TABLE `admin_nqt_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pix_attribute`
--
