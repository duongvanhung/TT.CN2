-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 23, 2016 at 10:21 PM
-- Server version: 5.6.34
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pixartth_cosmos`
--

-- --------------------------------------------------------

--
-- Table structure for table `nqt_category`
--

DROP TABLE IF EXISTS `nqt_category`;
CREATE TABLE IF NOT EXISTS `nqt_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `nqt_category`
--

INSERT INTO `nqt_category` (`id`, `name`, `status`, `created`) VALUES
(1, 'Header', 1, '2016-06-30 15:02:09'),
(2, '404', 1, '2016-08-30 14:19:41'),
(3, 'Download', 1, '2016-08-31 17:05:04'),
(4, 'contact', 1, '2016-08-31 17:44:46'),
(5, 'Subcribe', 1, '2016-09-01 10:07:43'),
(7, 'faq', 1, '2016-09-12 16:24:47'),
(14, 'Feature', 1, '2016-09-22 16:10:13'),
(10, 'Team', 1, '2016-09-14 21:49:59'),
(11, 'testimonial', 1, '2016-09-15 16:06:22'),
(12, 'Blog', 1, '2016-09-20 09:20:52'),
(13, 'Demo', 1, '2016-09-21 17:24:04');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `nqt_category_icon`
--

INSERT INTO `nqt_category_icon` (`id`, `name`, `status`, `created`) VALUES
(1, '30 New Icons in 4.6', 1, '2016-09-13 11:43:44'),
(2, 'Web Application Icons', 1, '2016-09-13 16:23:51'),
(3, 'Accessibility Icons', 1, '2016-09-14 10:54:19'),
(4, 'Hand Icons', 1, '2016-09-14 10:59:44'),
(5, 'Transportation Icons', 1, '2016-09-14 11:03:05'),
(6, 'Gender Icons', 1, '2016-09-14 11:06:45'),
(7, 'File Type Icons', 1, '2016-09-14 11:10:00'),
(8, 'Spinner Icons', 1, '2016-09-14 11:24:53'),
(9, 'Form Control Icons', 1, '2016-09-14 11:26:33'),
(10, 'Payment Icons', 1, '2016-09-14 11:28:28'),
(11, 'Chart Icons', 1, '2016-09-14 11:31:15'),
(12, 'Currency Icons', 1, '2016-09-14 11:32:18'),
(13, 'Text Editor Icons', 1, '2016-09-14 11:37:10'),
(14, 'Directional Icons', 1, '2016-09-14 12:10:27'),
(15, 'Video Player Icons', 1, '2016-09-14 12:19:34'),
(16, 'Brand Icons', 1, '2016-09-14 12:25:42'),
(17, 'Medical Icons', 1, '2016-09-14 13:47:24');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=631 ;

--
-- Dumping data for table `nqt_icons`
--

INSERT INTO `nqt_icons` (`id`, `category_id`, `value`, `status`, `created`) VALUES
(1, 1, 'fa-american-sign-language-interpreting', 1, '2016-09-13 11:44:18'),
(2, 1, 'fa-blind', 1, '2016-09-13 11:46:35'),
(3, 1, 'fa-envira', 1, '2016-09-13 11:46:56'),
(4, 1, 'fa-gitlab', 1, '2016-09-13 11:47:19'),
(5, 1, 'fa-google-plus-official', 1, '2016-09-13 11:54:28'),
(6, 1, 'fa-pied-piper', 1, '2016-09-13 11:55:26'),
(7, 1, 'fa-snapchat', 1, '2016-09-13 11:55:43'),
(8, 1, 'fa-universal-access', 1, '2016-09-13 11:56:04'),
(9, 1, 'fa-wheelchair-alt', 1, '2016-09-13 11:56:42'),
(10, 1, 'fa-braille', 1, '2016-09-13 11:57:45'),
(11, 1, 'fa-font-awesome', 1, '2016-09-13 11:58:03'),
(12, 1, 'fa-glide', 1, '2016-09-13 11:58:23'),
(13, 1, 'fa-deaf', 1, '2016-09-13 11:58:42'),
(14, 1, 'fa-question-circle-o', 1, '2016-09-13 11:59:07'),
(15, 1, 'fa-snapchat-ghost', 1, '2016-09-13 11:59:23'),
(16, 1, 'fa-viadeo', 1, '2016-09-13 11:59:36'),
(17, 1, 'fa-wpbeginner', 1, '2016-09-13 11:59:53'),
(18, 1, 'fa-assistive-listening-systems', 1, '2016-09-13 12:00:49'),
(19, 1, 'fa-first-order', 1, '2016-09-13 12:01:24'),
(20, 1, 'fa-glide-g', 1, '2016-09-13 12:01:38'),
(21, 1, 'fa-instagram', 1, '2016-09-13 12:02:00'),
(22, 1, 'fa-sign-language', 1, '2016-09-13 12:02:15'),
(23, 1, 'fa-snapchat-square', 1, '2016-09-13 12:02:29'),
(24, 1, 'fa-viadeo-square', 1, '2016-09-13 12:02:42'),
(25, 1, 'fa-wpforms', 1, '2016-09-13 12:03:00'),
(26, 1, 'fa-audio-description', 1, '2016-09-13 16:20:11'),
(27, 1, 'fa-low-vision', 1, '2016-09-13 16:22:49'),
(28, 1, 'fa-sign-languagefa-themeisle', 1, '2016-09-13 16:23:11'),
(29, 1, 'fa-volume-control-phone', 1, '2016-09-13 16:23:26'),
(30, 1, 'fa-yoast', 1, '2016-09-13 16:23:38'),
(31, 2, 'fa-adjust', 1, '2016-09-13 16:24:42'),
(32, 2, 'fa-area-chart', 1, '2016-09-13 16:24:59'),
(33, 2, 'fa-university', 1, '2016-09-13 16:26:00'),
(34, 2, 'fa-bars', 1, '2016-09-13 16:26:12'),
(35, 2, 'fa-battery-three-quarters', 1, '2016-09-13 16:26:25'),
(36, 2, 'fa-battery-half', 1, '2016-09-13 16:26:41'),
(37, 2, 'fa-beer', 1, '2016-09-13 16:26:54'),
(38, 2, 'fa-bell-slash-o', 1, '2016-09-13 16:28:34'),
(39, 2, 'fa-bomb', 1, '2016-09-13 16:29:14'),
(40, 2, 'fa-building-o', 1, '2016-09-13 16:29:38'),
(41, 2, 'fa-taxi', 1, '2016-09-13 16:29:51'),
(42, 2, 'fa-calendar-minus-o', 1, '2016-09-13 16:30:02'),
(43, 2, 'fa-camera', 1, '2016-09-13 16:30:25'),
(44, 2, 'fa-caret-square-o-left', 1, '2016-09-13 16:30:36'),
(45, 2, 'fa-cart-plus', 1, '2016-09-13 16:30:45'),
(46, 2, 'fa-check-circle', 1, '2016-09-13 16:30:55'),
(47, 2, 'fa-child', 1, '2016-09-13 16:31:40'),
(48, 2, 'fa-circle-thin', 1, '2016-09-13 16:31:51'),
(49, 2, 'fa-cloud', 1, '2016-09-13 16:32:04'),
(50, 2, 'fa-code-fork', 1, '2016-09-13 16:32:15'),
(51, 2, 'fa-comment', 1, '2016-09-13 16:32:24'),
(52, 2, 'fa-comments', 1, '2016-09-13 16:32:33'),
(53, 2, 'fa-creative-commons', 1, '2016-09-13 16:32:59'),
(54, 2, 'fa-crosshairs', 1, '2016-09-13 16:33:15'),
(55, 2, 'fa-tachometer', 1, '2016-09-13 16:33:25'),
(56, 2, 'fa-desktop', 1, '2016-09-13 16:33:44'),
(57, 2, 'fa-pencil-square-o', 1, '2016-09-13 16:33:55'),
(58, 2, 'fa-envelope-o', 1, '2016-09-13 16:34:05'),
(59, 2, 'fa-exclamation', 1, '2016-09-13 16:34:14'),
(60, 2, 'fa-external-link-square', 1, '2016-09-13 16:35:00'),
(61, 2, 'fa-fax', 1, '2016-09-13 16:35:15'),
(62, 2, 'fa-file-archive-o', 1, '2016-09-13 16:35:25'),
(63, 2, 'fa-file-image-o', 1, '2016-09-13 16:35:38'),
(64, 2, 'fa-file-word-o', 1, '2016-09-13 16:36:04'),
(65, 2, 'fa-fire', 1, '2016-09-13 16:36:16'),
(66, 2, 'fa-flag-o', 1, '2016-09-13 16:36:27'),
(67, 2, 'fa-folder-o', 1, '2016-09-13 16:36:39'),
(68, 2, 'fa-futbol-o', 1, '2016-09-13 16:36:55'),
(69, 2, 'fa-cogs', 1, '2016-09-13 16:37:06'),
(70, 2, 'fa-graduation-cap', 1, '2016-09-13 16:37:24'),
(71, 2, 'fa-hand-paper-o', 1, '2016-09-13 16:37:34'),
(72, 2, 'fa-hand-scissors-o', 1, '2016-09-13 16:37:53'),
(73, 2, 'fa-hashtag', 1, '2016-09-13 16:38:03'),
(74, 2, 'fa-heart-o', 1, '2016-09-13 16:38:29'),
(75, 2, 'fa-bed', 1, '2016-09-13 16:38:41'),
(76, 2, 'fa-hourglass-end', 1, '2016-09-13 16:38:53'),
(77, 2, 'fa-hourglass-start', 1, '2016-09-13 16:39:04'),
(78, 2, 'fa-industry', 1, '2016-09-13 16:39:13'),
(79, 2, 'fa-key', 1, '2016-09-13 16:39:24'),
(80, 2, 'fa-leaf', 1, '2016-09-13 16:39:39'),
(81, 2, 'fa-level-up', 1, '2016-09-13 16:39:51'),
(82, 2, 'fa-life-ring', 1, '2016-09-13 16:40:02'),
(83, 2, 'fa-lock', 1, '2016-09-13 16:40:14'),
(84, 2, 'fa-share', 1, '2016-09-13 16:40:25'),
(85, 2, 'fa-map', 1, '2016-09-13 16:40:36'),
(86, 2, 'fa-map-signs', 1, '2016-09-13 16:40:48'),
(87, 2, 'fa-minus', 1, '2016-09-13 16:40:58'),
(88, 2, 'fa-mobile', 1, '2016-09-13 16:41:10'),
(89, 2, 'fa-paint-brush', 1, '2016-09-13 16:51:38'),
(90, 2, 'fa-pencil', 1, '2016-09-13 16:51:49'),
(91, 2, 'fa-phone', 1, '2016-09-13 16:52:00'),
(92, 2, 'fa-pie-chart', 1, '2016-09-13 16:52:12'),
(93, 2, 'fa-plus-circle', 1, '2016-09-13 16:52:25'),
(94, 2, 'fa-print', 1, '2016-09-13 16:52:52'),
(95, 2, 'fa-question-circle', 1, '2016-09-13 16:53:02'),
(96, 2, 'fa-random', 1, '2016-09-13 16:53:31'),
(97, 2, 'fa-times', 1, '2016-09-13 16:54:43'),
(98, 2, 'fa-retweet', 1, '2016-09-13 16:54:52'),
(99, 2, 'fa-rss-square', 1, '2016-09-13 16:55:00'),
(100, 2, 'fa-paper-plane', 1, '2016-09-13 16:55:11'),
(101, 2, 'fa-share-alt', 1, '2016-09-13 16:55:24'),
(102, 2, 'fa-shield', 1, '2016-09-13 16:55:36'),
(103, 2, 'fa-shopping-cart', 1, '2016-09-13 16:55:45'),
(104, 2, 'fa-signal', 1, '2016-09-13 16:55:57'),
(105, 2, 'fa-smile-o', 1, '2016-09-13 16:56:07'),
(106, 2, 'fa-sort-alpha-desc', 1, '2016-09-13 16:56:16'),
(107, 2, 'fa-sort-desc', 1, '2016-09-13 16:56:24'),
(108, 2, 'fa-sort-asc', 1, '2016-09-13 16:56:34'),
(109, 2, 'fa-square', 1, '2016-09-13 16:56:42'),
(110, 2, 'fa-star-half-o', 1, '2016-09-13 16:56:52'),
(111, 2, 'fa-sticky-note', 1, '2016-09-13 16:57:05'),
(112, 2, 'fa-sun-o', 1, '2016-09-13 16:57:16'),
(113, 2, 'fa-tag', 1, '2016-09-13 16:57:28'),
(114, 2, 'fa-television', 1, '2016-09-13 16:57:39'),
(115, 2, 'fa-thumbs-o-down', 1, '2016-09-13 16:57:52'),
(116, 2, 'fa-caret-square-o-down', 1, '2016-09-13 16:58:21'),
(117, 2, 'fa-caret-square-o-right', 1, '2016-09-13 16:58:33'),
(118, 2, 'fa-trash-o', 1, '2016-09-13 16:58:43'),
(119, 2, 'fa-tty', 1, '2016-09-13 16:58:54'),
(120, 2, 'fa-upload', 1, '2016-09-13 16:59:12'),
(121, 2, 'fa-user-times', 1, '2016-09-13 16:59:21'),
(122, 2, 'fa-volume-down', 1, '2016-09-13 16:59:31'),
(123, 2, 'fa-wheelchair', 1, '2016-09-13 16:59:41'),
(124, 2, 'fa-arrows', 1, '2016-09-13 17:03:43'),
(125, 2, 'fa-car', 1, '2016-09-13 17:04:08'),
(126, 2, 'fa-bar-chart', 1, '2016-09-13 17:04:21'),
(127, 2, 'fa-battery-empty', 1, '2016-09-13 17:04:32'),
(128, 2, 'fa-battery-full', 1, '2016-09-13 17:04:45'),
(129, 2, 'fa-battery-quarter', 1, '2016-09-13 17:04:56'),
(130, 2, 'fa-bell', 1, '2016-09-13 17:05:13'),
(131, 2, 'fa-bicycle', 1, '2016-09-13 17:05:26'),
(132, 2, 'fa-bluetooth', 1, '2016-09-13 17:05:59'),
(133, 2, 'fa-book', 1, '2016-09-13 17:06:10'),
(134, 2, 'fa-briefcase', 1, '2016-09-13 17:06:20'),
(135, 2, 'fa-bullhorn', 1, '2016-09-13 17:06:32'),
(136, 2, 'fa-calculator', 1, '2016-09-13 17:07:04'),
(137, 2, 'fa-calendar-o', 1, '2016-09-13 17:07:26'),
(138, 2, 'fa-camera-retro', 1, '2016-09-13 17:07:43'),
(139, 2, 'fa-cc', 1, '2016-09-13 17:08:03'),
(140, 2, 'fa-check-circle-o', 1, '2016-09-13 17:08:15'),
(141, 2, 'fa-circle', 1, '2016-09-13 17:08:30'),
(142, 2, 'fa-clock-o', 1, '2016-09-13 17:08:40'),
(143, 2, 'fa-cloud-download', 1, '2016-09-13 17:08:57'),
(144, 2, 'fa-coffee', 1, '2016-09-13 17:09:08'),
(145, 2, 'fa-comment-o', 1, '2016-09-13 17:09:38'),
(146, 2, 'fa-comments-o', 1, '2016-09-13 17:09:47'),
(147, 2, 'fa-credit-card', 1, '2016-09-13 17:09:56'),
(148, 2, 'fa-cube', 1, '2016-09-13 17:10:05'),
(149, 2, 'fa-database', 1, '2016-09-13 17:10:16'),
(150, 2, 'fa-diamond', 1, '2016-09-13 17:10:26'),
(151, 2, 'fa-ellipsis-h', 1, '2016-09-13 17:10:39'),
(152, 2, 'fa-envelope-square', 1, '2016-09-13 17:10:51'),
(153, 2, 'fa-exclamation-circle', 1, '2016-09-13 17:11:00'),
(154, 2, 'fa-eye', 1, '2016-09-13 17:11:08'),
(155, 2, 'fa-rss', 1, '2016-09-13 17:11:19'),
(156, 2, 'fa-file-audio-o', 1, '2016-09-13 17:11:31'),
(157, 2, 'fa-file-video-o', 1, '2016-09-13 17:11:40'),
(158, 2, 'fa-file-powerpoint-o', 1, '2016-09-13 17:11:51'),
(159, 2, 'fa-fire-extinguisher', 1, '2016-09-13 17:12:36'),
(160, 2, 'fa-bolt', 1, '2016-09-13 17:12:46'),
(161, 2, 'fa-folder-open', 1, '2016-09-13 17:12:57'),
(162, 2, 'fa-gamepad', 1, '2016-09-13 17:13:08'),
(163, 2, 'fa-gift', 1, '2016-09-13 17:13:17'),
(164, 2, 'fa-users', 1, '2016-09-13 17:13:29'),
(165, 2, 'fa-hand-peace-o', 1, '2016-09-13 17:13:41'),
(166, 2, 'fa-hand-spock-o', 1, '2016-09-13 17:13:51'),
(167, 2, 'fa-hdd-o', 1, '2016-09-13 17:14:01'),
(168, 2, 'fa-heartbeat', 1, '2016-09-13 17:14:10'),
(169, 2, 'fa-hourglass', 1, '2016-09-13 17:14:24'),
(170, 2, 'fa-i-cursor', 1, '2016-09-13 17:14:41'),
(171, 2, 'fa-info', 1, '2016-09-13 17:14:49'),
(172, 2, 'fa-keyboard-o', 1, '2016-09-13 17:14:58'),
(173, 2, 'fa-gavel', 1, '2016-09-13 17:15:09'),
(174, 2, 'fa-lightbulb-o', 1, '2016-09-13 17:15:29'),
(175, 2, 'fa-reply', 1, '2016-09-13 17:17:47'),
(176, 2, 'fa-map-marker', 1, '2016-09-13 17:18:01'),
(177, 2, 'fa-meh-o', 1, '2016-09-13 17:18:12'),
(178, 2, 'fa-minus-circle', 1, '2016-09-13 17:18:21'),
(179, 2, 'fa-motorcycle', 1, '2016-09-13 17:18:39'),
(180, 2, 'fa-newspaper-o', 1, '2016-09-13 17:18:49'),
(181, 2, 'fa-phone-square', 1, '2016-09-13 17:19:50'),
(182, 2, 'fa-plane', 1, '2016-09-13 17:19:58'),
(183, 2, 'fa-plus-square', 1, '2016-09-13 17:20:09'),
(184, 2, 'fa-puzzle-piece', 1, '2016-09-13 17:20:18'),
(185, 2, 'fa-recycle', 1, '2016-09-13 17:20:36'),
(186, 2, 'fa-barsfa-road', 1, '2016-09-13 17:20:57'),
(187, 2, 'fa-search', 1, '2016-09-13 17:21:05'),
(188, 2, 'fa-paper-plane-o', 1, '2016-09-13 17:21:17'),
(189, 2, 'fa-share-alt-square', 1, '2016-09-13 17:21:26'),
(190, 2, 'fa-ship', 1, '2016-09-13 17:21:38'),
(191, 2, 'fa-sign-in', 1, '2016-09-13 17:21:46'),
(192, 2, 'fa-sort-amount-asc', 1, '2016-09-13 17:22:17'),
(193, 2, 'fa-space-shuttle', 1, '2016-09-13 17:22:40'),
(194, 2, 'fa-square-o', 1, '2016-09-13 17:22:49'),
(195, 2, 'fa-sticky-note-o', 1, '2016-09-13 17:23:20'),
(196, 2, 'fa-tags', 1, '2016-09-13 17:23:34'),
(197, 2, 'fa-terminal', 1, '2016-09-13 17:24:00'),
(198, 2, 'fa-thumbs-o-up', 1, '2016-09-13 17:24:10'),
(199, 2, 'fa-times-circle', 1, '2016-09-13 17:24:19'),
(200, 2, 'fa-caret-square-o-up', 1, '2016-09-13 17:24:40'),
(201, 2, 'fa-tree', 1, '2016-09-13 17:24:53'),
(202, 2, 'fa-unlock', 1, '2016-09-13 17:25:09'),
(203, 2, 'fa-user', 1, '2016-09-13 17:25:17'),
(204, 2, 'fa-volume-off', 1, '2016-09-13 17:25:37'),
(205, 2, 'fa-anchor', 1, '2016-09-13 17:26:27'),
(206, 2, 'fa-arrows-h', 1, '2016-09-13 17:26:36'),
(207, 2, 'fa-asterisk', 1, '2016-09-13 17:26:45'),
(208, 2, 'fa-balance-scale', 1, '2016-09-13 17:26:54'),
(209, 2, 'fa-bell-o', 1, '2016-09-13 17:27:43'),
(210, 2, 'fa-binoculars', 1, '2016-09-13 17:27:57'),
(211, 2, 'fa-bluetooth-b', 1, '2016-09-13 17:28:41'),
(212, 2, 'fa-bookmark', 1, '2016-09-13 17:28:50'),
(213, 2, 'fa-bug', 1, '2016-09-13 17:28:59'),
(214, 2, 'fa-bullseye', 1, '2016-09-13 17:29:10'),
(215, 2, 'fa-calendar', 1, '2016-09-13 17:29:18'),
(216, 2, 'fa-calendar-plus-o', 1, '2016-09-13 17:29:27'),
(217, 2, 'fa-certificate', 1, '2016-09-13 17:29:59'),
(218, 2, 'fa-check-square', 1, '2016-09-13 17:30:10'),
(219, 2, 'fa-circle-o', 1, '2016-09-13 17:30:20'),
(220, 2, 'fa-clone', 1, '2016-09-13 17:30:29'),
(221, 2, 'fa-cloud-upload', 1, '2016-09-13 17:30:38'),
(222, 2, 'fa-cog', 1, '2016-09-13 17:30:50'),
(223, 2, 'fa-commenting', 1, '2016-09-13 17:31:01'),
(224, 2, 'fa-compass', 1, '2016-09-13 17:31:12'),
(225, 2, 'fa-credit-card-alt', 1, '2016-09-13 17:31:23'),
(226, 2, 'fa-cubes', 1, '2016-09-13 17:31:33'),
(227, 2, 'fa-dot-circle-o', 1, '2016-09-13 17:31:50'),
(228, 2, 'fa-ellipsis-v', 1, '2016-09-13 17:32:00'),
(229, 2, 'fa-eraser', 1, '2016-09-13 17:32:33'),
(230, 2, 'fa-exclamation-triangle', 1, '2016-09-13 17:32:43'),
(231, 2, 'fa-eye-slash', 1, '2016-09-13 17:32:57'),
(232, 2, 'fa-female', 1, '2016-09-13 17:33:37'),
(233, 2, 'fa-file-code-o', 1, '2016-09-13 17:33:47'),
(234, 2, 'fa-file-pdf-o', 1, '2016-09-13 17:33:56'),
(235, 2, 'fa-film', 1, '2016-09-13 17:34:13'),
(236, 2, 'fa-flag', 1, '2016-09-13 17:34:24'),
(237, 2, 'fa-flask', 1, '2016-09-13 17:34:33'),
(238, 2, 'fa-folder-open-o', 1, '2016-09-13 17:34:42'),
(239, 2, 'fa-glass', 1, '2016-09-13 17:35:03'),
(240, 2, 'fa-hand-rock-o', 1, '2016-09-13 17:35:12'),
(241, 2, 'fa-hand-pointer-o', 1, '2016-09-13 17:35:25'),
(242, 2, 'fa-headphones', 1, '2016-09-13 17:35:43'),
(243, 2, 'fa-history', 1, '2016-09-13 17:35:51'),
(244, 2, 'fa-hourglass-half', 1, '2016-09-13 17:36:18'),
(245, 2, 'fa-picture-o', 1, '2016-09-13 17:36:59'),
(246, 2, 'fa-info-circle', 1, '2016-09-13 17:37:08'),
(247, 2, 'fa-language', 1, '2016-09-13 17:37:19'),
(248, 2, 'fa-lemon-o', 1, '2016-09-13 17:37:27'),
(249, 2, 'fa-line-chart', 1, '2016-09-13 17:37:46'),
(250, 2, 'fa-magic', 1, '2016-09-13 17:37:55'),
(251, 2, 'fa-reply-all', 1, '2016-09-13 17:38:05'),
(252, 2, 'fa-map-o', 1, '2016-09-13 17:38:16'),
(253, 2, 'fa-microphone', 1, '2016-09-13 17:38:25'),
(254, 2, 'fa-minus-square', 1, '2016-09-13 17:38:35'),
(255, 2, 'fa-money', 1, '2016-09-13 17:39:11'),
(256, 2, 'fa-mouse-pointer', 1, '2016-09-13 17:39:20'),
(257, 2, 'fa-object-group', 1, '2016-09-13 17:39:33'),
(258, 2, 'fa-pencil-square-ofa-picture-o', 1, '2016-09-13 17:40:00'),
(259, 2, 'fa-plug', 1, '2016-09-13 17:40:15'),
(260, 2, 'fa-plus-square-o', 1, '2016-09-13 17:41:10'),
(261, 2, 'fa-qrcode', 1, '2016-09-13 17:41:20'),
(262, 2, 'fa-quote-left', 1, '2016-09-13 17:41:29'),
(263, 2, 'fa-refresh', 1, '2016-09-13 17:41:39'),
(264, 2, 'fa-rocket', 1, '2016-09-13 17:41:57'),
(265, 2, 'fa-search-minus', 1, '2016-09-13 17:42:07'),
(266, 2, 'fa-server', 1, '2016-09-13 17:42:18'),
(267, 2, 'fa-share-square', 1, '2016-09-13 17:42:29'),
(268, 2, 'fa-shopping-bag', 1, '2016-09-13 17:42:39'),
(269, 2, 'fa-sitemap', 1, '2016-09-13 17:43:03'),
(270, 2, 'fa-sort', 1, '2016-09-13 17:43:17'),
(271, 2, 'fa-sort-amount-desc', 1, '2016-09-13 17:55:05'),
(272, 2, 'fa-sort-numeric-asc', 1, '2016-09-13 17:55:18'),
(273, 2, 'fa-spinner', 1, '2016-09-13 17:55:31'),
(274, 2, 'fa-star', 1, '2016-09-13 17:55:39'),
(275, 2, 'fa-tablet', 1, '2016-09-13 17:56:19'),
(276, 2, 'fa-tasks', 1, '2016-09-13 17:56:48'),
(277, 2, 'fa-thumb-tack', 1, '2016-09-13 17:56:59'),
(278, 2, 'fa-thumbs-up', 1, '2016-09-13 17:57:22'),
(279, 2, 'fa-times-circle-o', 1, '2016-09-13 17:57:47'),
(280, 2, 'fa-toggle-off', 1, '2016-09-13 17:58:00'),
(281, 2, 'fa-trademark', 1, '2016-09-13 17:58:14'),
(282, 2, 'fa-trophy', 1, '2016-09-13 17:58:23'),
(283, 2, 'fa-umbrella', 1, '2016-09-13 17:58:34'),
(284, 2, 'fa-unlock-alt', 1, '2016-09-13 17:58:43'),
(285, 2, 'fa-user-plus', 1, '2016-09-13 17:58:54'),
(286, 2, 'fa-video-camera', 1, '2016-09-13 17:59:03'),
(287, 2, 'fa-volume-up', 1, '2016-09-13 17:59:11'),
(288, 2, 'fa-wifi', 1, '2016-09-13 17:59:20'),
(289, 2, 'fa-archive', 1, '2016-09-13 18:00:02'),
(290, 2, 'fa-arrows-v', 1, '2016-09-13 18:00:10'),
(291, 2, 'fa-at', 1, '2016-09-13 18:00:19'),
(292, 2, 'fa-ban', 1, '2016-09-13 18:00:31'),
(293, 2, 'fa-barcode', 1, '2016-09-13 18:00:46'),
(294, 2, 'fa-birthday-cake', 1, '2016-09-13 18:01:37'),
(295, 2, 'fa-bookmark-o', 1, '2016-09-13 18:01:55'),
(296, 2, 'fa-building', 1, '2016-09-13 18:02:06'),
(297, 2, 'fa-bus', 1, '2016-09-13 18:02:14'),
(298, 2, 'fa-calendar-check-o', 1, '2016-09-13 18:02:24'),
(299, 2, 'fa-calendar-times-o', 1, '2016-09-13 18:02:35'),
(300, 2, 'fa-cart-arrow-down', 1, '2016-09-13 18:03:50'),
(301, 2, 'fa-check', 1, '2016-09-13 18:04:11'),
(302, 2, 'fa-check-square-o', 1, '2016-09-13 18:04:20'),
(303, 2, 'fa-circle-o-notch', 1, '2016-09-13 18:04:30'),
(304, 2, 'fa-code', 1, '2016-09-14 09:15:49'),
(305, 2, 'fa-commenting-o', 1, '2016-09-14 09:16:16'),
(306, 2, 'fa-copyright', 1, '2016-09-14 09:16:27'),
(307, 2, 'fa-crop', 1, '2016-09-14 09:16:37'),
(308, 2, 'fa-cutlery', 1, '2016-09-14 09:18:05'),
(309, 2, 'fa-download &lt;i class=&quot;fa fa-download&quot;', 1, '2016-09-14 09:18:38'),
(310, 2, 'fa-envelope', 1, '2016-09-14 09:18:55'),
(311, 2, 'fa-exchange', 1, '2016-09-14 09:19:11'),
(312, 2, 'fa-external-link', 1, '2016-09-14 09:19:55'),
(313, 2, 'fa-eyedropper', 1, '2016-09-14 09:20:07'),
(314, 2, 'fa-fighter-jet', 1, '2016-09-14 09:20:19'),
(315, 2, 'fa-file-excel-o', 1, '2016-09-14 09:20:28'),
(316, 2, 'fa-filter', 1, '2016-09-14 09:21:28'),
(317, 2, 'fa-flag-checkered', 1, '2016-09-14 09:21:42'),
(318, 2, 'fa-folder', 1, '2016-09-14 09:21:55'),
(319, 2, 'fa-frown-o', 1, '2016-09-14 09:22:10'),
(320, 2, 'fa-globe', 1, '2016-09-14 09:22:37'),
(321, 2, 'fa-hand-lizard-o', 1, '2016-09-14 09:22:48'),
(322, 2, 'fa-heart', 1, '2016-09-14 09:23:27'),
(323, 2, 'fa-home', 1, '2016-09-14 09:23:37'),
(324, 2, 'fa-hourglass-o', 1, '2016-09-14 09:23:57'),
(325, 2, 'fa-inbox', 1, '2016-09-14 09:24:06'),
(326, 2, 'fa-laptop', 1, '2016-09-14 09:24:29'),
(327, 2, 'fa-level-down', 1, '2016-09-14 09:24:42'),
(328, 2, 'fa-location-arrow', 1, '2016-09-14 09:25:07'),
(329, 2, 'fa-magnet', 1, '2016-09-14 10:42:32'),
(330, 2, 'fa-map-pin', 1, '2016-09-14 10:42:46'),
(331, 2, 'fa-microphone-slash', 1, '2016-09-14 10:43:12'),
(332, 2, 'fa-minus-square-o', 1, '2016-09-14 10:43:27'),
(333, 2, 'fa-moon-o', 1, '2016-09-14 10:44:22'),
(334, 2, 'fa-music', 1, '2016-09-14 10:44:46'),
(335, 2, 'fa-object-ungroup', 1, '2016-09-14 10:45:10'),
(336, 2, 'fa-paw', 1, '2016-09-14 10:45:57'),
(337, 2, 'fa-percent', 1, '2016-09-14 10:46:10'),
(338, 2, 'fa-plus', 1, '2016-09-14 10:47:02'),
(339, 2, 'fa-power-off', 1, '2016-09-14 10:47:13'),
(340, 2, 'fa-question', 1, '2016-09-14 10:47:24'),
(341, 2, 'fa-quote-right', 1, '2016-09-14 10:47:38'),
(342, 2, 'fa-registered', 1, '2016-09-14 10:47:49'),
(343, 2, 'fa-search-plus', 1, '2016-09-14 10:48:30'),
(344, 2, 'fa-share-square-o', 1, '2016-09-14 10:48:51'),
(345, 2, 'fa-shopping-basket', 1, '2016-09-14 10:49:05'),
(346, 2, 'fa-sign-out', 1, '2016-09-14 10:49:16'),
(347, 2, 'fa-sliders', 1, '2016-09-14 10:49:28'),
(348, 2, 'fa-sort-alpha-asc', 1, '2016-09-14 10:49:41'),
(349, 2, 'fa-sort-numeric-desc', 1, '2016-09-14 10:50:04'),
(350, 2, 'fa-spoon', 1, '2016-09-14 10:50:16'),
(351, 2, 'fa-star-half', 1, '2016-09-14 10:50:27'),
(352, 2, 'fa-star-o', 1, '2016-09-14 10:50:37'),
(353, 2, 'fa-suitcase', 1, '2016-09-14 10:51:32'),
(354, 2, 'fa-thumbs-down', 1, '2016-09-14 10:52:04'),
(355, 2, 'fa-ticket', 1, '2016-09-14 10:52:14'),
(356, 2, 'fa-tint', 1, '2016-09-14 10:52:23'),
(357, 2, 'fa-toggle-on', 1, '2016-09-14 10:52:34'),
(358, 2, 'fa-trash', 1, '2016-09-14 10:52:46'),
(359, 2, 'fa-truck', 1, '2016-09-14 10:52:55'),
(360, 2, 'fa-user-secret', 1, '2016-09-14 10:53:29'),
(361, 2, 'fa-wrench', 1, '2016-09-14 10:54:01'),
(362, 4, 'fa-hand-o-right', 1, '2016-09-14 11:00:24'),
(363, 4, 'fa-hand-o-up', 1, '2016-09-14 11:01:06'),
(364, 4, 'fa-hand-o-down', 1, '2016-09-14 11:01:36'),
(365, 4, 'fa-hand-o-left', 1, '2016-09-14 11:02:10'),
(366, 5, 'fa-ambulance', 1, '2016-09-14 11:03:50'),
(367, 5, 'fa-subway', 1, '2016-09-14 11:04:20'),
(368, 5, 'fa-train', 1, '2016-09-14 11:05:58'),
(369, 7, 'fa-file', 1, '2016-09-14 11:10:27'),
(370, 7, 'fa-file-text', 1, '2016-09-14 11:19:35'),
(371, 7, 'fa-file-text-o', 1, '2016-09-14 11:20:20'),
(372, 7, 'fa-file-o', 1, '2016-09-14 11:20:39'),
(373, 6, 'fa-genderless', 1, '2016-09-14 11:21:36'),
(374, 6, 'fa-mars-stroke', 1, '2016-09-14 11:21:48'),
(375, 6, 'fa-neuter', 1, '2016-09-14 11:22:00'),
(376, 6, 'fa-venus-double', 1, '2016-09-14 11:22:11'),
(377, 6, 'fa-transgender', 1, '2016-09-14 11:22:31'),
(378, 6, 'fa-mars-stroke-h', 1, '2016-09-14 11:22:52'),
(379, 6, 'fa-venus-mars', 1, '2016-09-14 11:23:13'),
(380, 6, 'fa-mars', 1, '2016-09-14 11:23:27'),
(381, 6, 'fa-mars-stroke-v', 1, '2016-09-14 11:23:39'),
(382, 6, 'fa-transgender-alt', 1, '2016-09-14 11:24:06'),
(383, 6, 'fa-mars-double', 1, '2016-09-14 11:24:15'),
(384, 6, 'fa-mercury', 1, '2016-09-14 11:24:26'),
(385, 6, 'fa-venus', 1, '2016-09-14 11:24:36'),
(386, 10, 'fa-cc-amex', 1, '2016-09-14 11:29:07'),
(387, 10, 'fa-cc-mastercard', 1, '2016-09-14 11:29:17'),
(388, 10, 'fa-cc-diners-club', 1, '2016-09-14 11:29:37'),
(389, 10, 'fa-cc-paypal', 1, '2016-09-14 11:29:47'),
(390, 10, 'fa-cc-discover', 1, '2016-09-14 11:30:09'),
(391, 10, 'fa-cc-stripe', 1, '2016-09-14 11:30:18'),
(392, 10, 'fa-google-wallet', 1, '2016-09-14 11:30:28'),
(393, 10, 'fa-cc-jcb', 1, '2016-09-14 11:30:37'),
(394, 10, 'fa-cc-visa', 1, '2016-09-14 11:30:47'),
(395, 10, 'fa-paypal', 1, '2016-09-14 11:30:58'),
(396, 12, 'fa-btc', 1, '2016-09-14 11:33:01'),
(397, 12, 'fa-eur', 1, '2016-09-14 11:33:16'),
(398, 12, 'fa-gg-circle', 1, '2016-09-14 11:33:26'),
(399, 12, 'fa-krw', 1, '2016-09-14 11:33:34'),
(400, 12, 'fa-rub', 1, '2016-09-14 11:33:47'),
(401, 12, 'fa-ils', 1, '2016-09-14 11:33:57'),
(402, 12, 'fa-try', 1, '2016-09-14 11:34:53'),
(403, 12, 'fa-jpy', 1, '2016-09-14 11:35:02'),
(404, 12, 'fa-gbp', 1, '2016-09-14 11:35:21'),
(405, 12, 'fa-inr', 1, '2016-09-14 11:35:35'),
(406, 12, 'fa-usd', 1, '2016-09-14 11:36:16'),
(407, 12, 'fa-gg', 1, '2016-09-14 11:36:26'),
(408, 13, 'fa-align-center', 1, '2016-09-14 11:37:42'),
(409, 13, 'fa-bold', 1, '2016-09-14 11:37:53'),
(410, 13, 'fa-columns', 1, '2016-09-14 11:38:03'),
(411, 13, 'fa-file-text-o &lt;i class=&quot;fa fa-file-text-o', 1, '2016-09-14 11:38:24'),
(412, 13, 'fa-header', 1, '2016-09-14 11:39:29'),
(413, 13, 'fa-list', 1, '2016-09-14 11:39:42'),
(414, 13, 'fa-outdent', 1, '2016-09-14 11:39:51'),
(415, 13, 'fa-repeat', 1, '2016-09-14 11:40:02'),
(416, 13, 'fa-scissors', 1, '2016-09-14 11:40:12'),
(417, 13, 'fa-table', 1, '2016-09-14 11:40:22'),
(418, 13, 'fa-th-large', 1, '2016-09-14 11:40:31'),
(419, 13, 'fa-chain-broken', 1, '2016-09-14 11:40:43'),
(420, 13, 'fa-align-justify', 1, '2016-09-14 11:41:14'),
(421, 13, 'fa-link', 1, '2016-09-14 11:41:23'),
(422, 13, 'fa-files-o', 1, '2016-09-14 11:41:37'),
(423, 13, 'fa-indent', 1, '2016-09-14 11:58:20'),
(424, 13, 'fa-list-alt', 1, '2016-09-14 11:58:30'),
(425, 13, 'fa-paperclip', 1, '2016-09-14 11:58:40'),
(426, 13, 'fa-undo', 1, '2016-09-14 11:58:50'),
(427, 13, 'fa-strikethrough', 1, '2016-09-14 11:58:59'),
(428, 13, 'fa-text-height', 1, '2016-09-14 11:59:09'),
(429, 13, 'fa-th-list', 1, '2016-09-14 11:59:21'),
(430, 13, 'fa-align-left', 1, '2016-09-14 11:59:51'),
(431, 13, 'fa-floppy-o', 1, '2016-09-14 12:04:49'),
(432, 13, 'fa-italic', 1, '2016-09-14 12:06:53'),
(433, 13, 'fa-list-ol', 1, '2016-09-14 12:07:03'),
(434, 13, 'fa-paragraph', 1, '2016-09-14 12:07:11'),
(435, 13, 'fa-subscript', 1, '2016-09-14 12:07:32'),
(436, 13, 'fa-text-width', 1, '2016-09-14 12:07:42'),
(437, 13, 'fa-underline', 1, '2016-09-14 12:07:52'),
(438, 13, 'fa-align-right', 1, '2016-09-14 12:08:15'),
(439, 13, 'fa-clipboard', 1, '2016-09-14 12:08:32'),
(440, 13, 'fa-font', 1, '2016-09-14 12:09:01'),
(441, 13, 'fa-list-ul', 1, '2016-09-14 12:09:19'),
(442, 13, 'fa-superscript', 1, '2016-09-14 12:09:50'),
(443, 13, 'fa-th', 1, '2016-09-14 12:10:01'),
(444, 14, 'fa-angle-double-down', 1, '2016-09-14 12:11:24'),
(445, 14, 'fa-angle-down', 1, '2016-09-14 12:11:37'),
(446, 14, 'fa-arrow-circle-down', 1, '2016-09-14 12:11:47'),
(447, 14, 'fa-arrow-circle-o-right', 1, '2016-09-14 12:11:59'),
(448, 14, 'fa-arrow-down', 1, '2016-09-14 12:12:11'),
(449, 14, 'fa-caret-down', 1, '2016-09-14 12:12:34'),
(450, 14, 'fa-chevron-circle-down', 1, '2016-09-14 12:12:54'),
(451, 14, 'fa-chevron-down', 1, '2016-09-14 12:13:05'),
(452, 14, 'fa-long-arrow-up', 1, '2016-09-14 12:13:33'),
(453, 14, 'fa-angle-left', 1, '2016-09-14 12:14:15'),
(454, 14, 'fa-arrow-circle-left', 1, '2016-09-14 12:14:26'),
(455, 14, 'fa-arrow-circle-o-up', 1, '2016-09-14 12:14:42'),
(456, 14, 'fa-arrow-left', 1, '2016-09-14 12:14:53'),
(457, 14, 'fa-arrows-alt', 1, '2016-09-14 12:15:06'),
(458, 14, 'fa-caret-left', 1, '2016-09-14 12:15:16'),
(459, 14, 'fa-chevron-circle-left', 1, '2016-09-14 12:15:36'),
(460, 14, 'fa-chevron-left', 1, '2016-09-14 12:15:47'),
(461, 14, 'fa-long-arrow-down', 1, '2016-09-14 12:16:06'),
(462, 14, 'fa-angle-double-left', 1, '2016-09-14 12:16:30'),
(463, 14, 'fa-angle-double-up', 1, '2016-09-14 12:17:19'),
(464, 14, 'fa-angle-up', 1, '2016-09-14 12:17:30'),
(465, 14, 'fa-arrow-circle-o-left', 1, '2016-09-14 12:17:43'),
(466, 14, 'fa-arrow-circle-up', 1, '2016-09-14 12:17:56'),
(467, 14, 'fa-arrow-up', 1, '2016-09-14 12:18:06'),
(468, 14, 'fa-caret-up', 1, '2016-09-14 12:18:40'),
(469, 14, 'fa-chevron-circle-up', 1, '2016-09-14 12:18:50'),
(470, 14, 'fa-chevron-up', 1, '2016-09-14 12:19:00'),
(471, 14, 'fa-long-arrow-right', 1, '2016-09-14 12:19:16'),
(472, 15, 'fa-expand', 1, '2016-09-14 12:20:24'),
(473, 15, 'fa-pause', 1, '2016-09-14 12:20:34'),
(474, 15, 'fa-play-circle', 1, '2016-09-14 12:20:44'),
(475, 15, 'fa-step-forward', 1, '2016-09-14 12:21:00'),
(476, 15, 'fa-youtube-play', 1, '2016-09-14 12:21:20'),
(477, 15, 'fa-backward', 1, '2016-09-14 12:21:37'),
(478, 15, 'fa-fast-backward', 1, '2016-09-14 12:21:51'),
(479, 15, 'fa-pause-circle', 1, '2016-09-14 12:22:08'),
(480, 13, 'fa-play-circle-o', 1, '2016-09-14 12:22:21'),
(481, 13, 'fa-stop', 1, '2016-09-14 12:22:31'),
(482, 15, 'fa-compress', 1, '2016-09-14 12:22:42'),
(483, 15, 'fa-fast-forward', 1, '2016-09-14 12:22:55'),
(484, 15, 'fa-pause-circle-o', 1, '2016-09-14 12:23:03'),
(485, 15, 'fa-stop-circle', 1, '2016-09-14 12:23:28'),
(486, 13, 'fa-eject', 1, '2016-09-14 12:23:40'),
(487, 15, 'fa-forward', 1, '2016-09-14 12:23:53'),
(488, 15, 'fa-play', 1, '2016-09-14 12:24:02'),
(489, 15, 'fa-step-backward', 1, '2016-09-14 12:24:21'),
(490, 15, 'fa-stop-circle-o', 1, '2016-09-14 12:24:37'),
(491, 16, 'fa-500px', 1, '2016-09-14 12:27:49'),
(492, 16, 'fa-angellist', 1, '2016-09-14 12:30:57'),
(493, 16, 'fa-bitbucket', 1, '2016-09-14 12:31:11'),
(494, 16, 'fa-chrome', 1, '2016-09-14 12:32:08'),
(495, 16, 'fa-contao', 1, '2016-09-14 12:32:18'),
(496, 16, 'fa-deviantart', 1, '2016-09-14 12:32:28'),
(497, 16, 'fa-drupal', 1, '2016-09-14 12:33:06'),
(498, 16, 'fa-expeditedssl', 1, '2016-09-14 12:33:19'),
(499, 16, 'fa-facebook-official', 1, '2016-09-14 12:33:30'),
(500, 16, 'fa-flickr', 1, '2016-09-14 12:33:44'),
(501, 16, 'fa-forumbee', 1, '2016-09-14 12:33:55'),
(502, 16, 'fa-github', 1, '2016-09-14 12:34:49'),
(503, 16, 'fa-gratipay', 1, '2016-09-14 12:35:03'),
(504, 16, 'fa-google-plus', 1, '2016-09-14 12:35:13'),
(505, 16, 'fa-html5', 1, '2016-09-14 12:35:32'),
(506, 16, 'fa-joomla', 1, '2016-09-14 12:35:43'),
(507, 16, 'fa-leanpub', 1, '2016-09-14 12:35:54'),
(508, 16, 'fa-maxcdn', 1, '2016-09-14 12:36:06'),
(509, 16, 'fa-modx', 1, '2016-09-14 12:36:17'),
(510, 16, 'fa-openid', 1, '2016-09-14 12:36:27'),
(511, 16, 'fa-pinterest', 1, '2016-09-14 12:36:51'),
(512, 16, 'fa-qq', 1, '2016-09-14 12:37:01'),
(513, 16, 'fa-reddit-alien', 1, '2016-09-14 12:37:11'),
(514, 16, 'fa-safari', 1, '2016-09-14 12:37:23'),
(515, 16, 'fa-skype', 1, '2016-09-14 12:37:45'),
(516, 16, 'fa-stack-exchange', 1, '2016-09-14 12:39:23'),
(517, 16, 'fa-stumbleupon', 1, '2016-09-14 12:39:33'),
(518, 16, 'fa-trello', 1, '2016-09-14 12:39:48'),
(519, 16, 'fa-twitch', 1, '2016-09-14 12:40:06'),
(520, 16, 'fa-viacoin', 1, '2016-09-14 12:40:17'),
(521, 16, 'fa-vimeo-square', 1, '2016-09-14 12:40:26'),
(522, 16, 'fa-weibo', 1, '2016-09-14 12:40:36'),
(523, 16, 'fa-windows', 1, '2016-09-14 12:40:45'),
(524, 16, 'fa-xing', 1, '2016-09-14 12:40:55'),
(525, 16, 'fa-yahoo', 1, '2016-09-14 12:41:05'),
(526, 16, 'fa-adn', 1, '2016-09-14 12:45:55'),
(527, 16, 'fa-apple', 1, '2016-09-14 12:46:16'),
(528, 16, 'fa-bitbucket-square', 1, '2016-09-14 12:46:30'),
(529, 16, 'fa-codepen', 1, '2016-09-14 12:50:16'),
(530, 16, 'fa-css3', 1, '2016-09-14 12:50:30'),
(531, 16, 'fa-digg', 1, '2016-09-14 12:50:39'),
(532, 16, 'fa-edge', 1, '2016-09-14 12:51:12'),
(533, 16, 'fa-facebook-square', 1, '2016-09-14 12:51:30'),
(534, 16, 'fa-foursquare', 1, '2016-09-14 12:52:08'),
(535, 16, 'fa-github-alt', 1, '2016-09-14 12:52:28'),
(536, 16, 'fa-linkedin', 1, '2016-09-14 13:29:10'),
(537, 16, 'fa-meanpath', 1, '2016-09-14 13:29:33'),
(538, 16, 'fa-odnoklassniki', 1, '2016-09-14 13:29:45'),
(539, 16, 'fa-opera', 1, '2016-09-14 13:31:45'),
(540, 16, 'fa-pinterest-p', 1, '2016-09-14 13:32:02'),
(541, 16, 'fa-rebel', 1, '2016-09-14 13:32:12'),
(542, 16, 'fa-reddit-square', 1, '2016-09-14 13:32:23'),
(543, 16, 'fa-scribd', 1, '2016-09-14 13:32:37'),
(544, 16, 'fa-shirtsinbulk', 1, '2016-09-14 13:34:05'),
(545, 16, 'fa-slack', 1, '2016-09-14 13:34:15'),
(546, 16, 'fa-stack-overflow', 1, '2016-09-14 13:34:42'),
(547, 16, 'fa-stumbleupon-circle', 1, '2016-09-14 13:34:54'),
(548, 16, 'fa-tripadvisor', 1, '2016-09-14 13:35:04'),
(549, 16, 'fa-twitter', 1, '2016-09-14 13:35:14'),
(550, 16, 'fa-vine', 1, '2016-09-14 13:35:34'),
(551, 16, 'fa-weixin', 1, '2016-09-14 13:35:45'),
(552, 16, 'fa-wordpress', 1, '2016-09-14 13:35:55'),
(553, 16, 'fa-xing-square', 1, '2016-09-14 13:36:06'),
(554, 16, 'fa-y-combinator', 1, '2016-09-14 13:36:24'),
(555, 16, 'fa-youtube', 1, '2016-09-14 13:36:34'),
(556, 16, 'fa-behance', 1, '2016-09-14 13:37:24'),
(557, 16, 'fa-amazon', 1, '2016-09-14 13:38:38'),
(558, 16, 'fa-codiepie', 1, '2016-09-14 13:38:57'),
(559, 16, 'fa-dashcube', 1, '2016-09-14 13:39:06'),
(560, 16, 'fa-dribbble', 1, '2016-09-14 13:39:14'),
(561, 16, 'fa-empire', 1, '2016-09-14 13:39:28'),
(562, 16, 'fa-facebook', 1, '2016-09-14 13:39:39'),
(563, 16, 'fa-firefox', 1, '2016-09-14 13:39:49'),
(564, 16, 'fa-fonticons', 1, '2016-09-14 13:39:58'),
(565, 16, 'fa-empirefa-git', 1, '2016-09-14 13:40:16'),
(566, 16, 'fa-git', 1, '2016-09-14 13:41:59'),
(567, 16, 'fa-github-square', 1, '2016-09-14 13:42:12'),
(568, 16, 'fa-hacker-news', 1, '2016-09-14 13:42:40'),
(569, 16, 'fa-internet-explorer', 1, '2016-09-14 13:42:52'),
(570, 16, 'fa-lastfm', 1, '2016-09-14 13:43:03'),
(571, 16, 'fa-linkedin-square', 1, '2016-09-14 13:43:13'),
(572, 16, 'fa-medium', 1, '2016-09-14 13:43:25'),
(573, 16, 'fa-odnoklassniki-square', 1, '2016-09-14 13:43:35'),
(574, 16, 'fa-optin-monster', 1, '2016-09-14 13:43:46'),
(575, 16, 'fa-pied-piper-alt', 1, '2016-09-14 13:43:56'),
(576, 16, 'fa-pinterest-square', 1, '2016-09-14 13:44:06'),
(577, 16, 'fa-renren', 1, '2016-09-14 13:44:26'),
(578, 16, 'fa-sellsy', 1, '2016-09-14 13:44:38'),
(579, 16, 'fa-simplybuilt', 1, '2016-09-14 13:44:48'),
(580, 16, 'fa-slideshare', 1, '2016-09-14 13:45:00'),
(581, 16, 'fa-soundcloud', 1, '2016-09-14 13:45:13'),
(582, 16, 'fa-steam', 1, '2016-09-14 13:45:23'),
(583, 16, 'fa-tencent-weibo', 1, '2016-09-14 13:45:36'),
(584, 16, 'fa-tumblr', 1, '2016-09-14 13:45:48'),
(585, 16, 'fa-twitter-square', 1, '2016-09-14 13:45:59'),
(586, 16, 'fa-vk', 1, '2016-09-14 13:46:17'),
(587, 16, 'fa-whatsapp', 1, '2016-09-14 13:46:26'),
(588, 16, 'fa-android', 1, '2016-09-14 13:47:52'),
(589, 16, 'fa-behance-square', 1, '2016-09-14 13:48:06'),
(590, 16, 'fa-black-tie', 1, '2016-09-14 13:48:19'),
(591, 16, 'fa-buysellads', 1, '2016-09-14 13:48:30'),
(592, 16, 'fa-connectdevelop', 1, '2016-09-14 13:48:55'),
(593, 16, 'fa-delicious', 1, '2016-09-14 13:49:04'),
(594, 16, 'fa-dropbox', 1, '2016-09-14 13:49:15'),
(595, 16, 'fa-fort-awesome', 1, '2016-09-14 13:49:56'),
(596, 16, 'fa-get-pocket', 1, '2016-09-14 13:50:07'),
(597, 16, 'fa-git-square', 1, '2016-09-14 13:50:36'),
(598, 16, 'fa-google', 1, '2016-09-14 13:50:55'),
(599, 16, 'fa-google-plus-square', 1, '2016-09-14 13:51:05'),
(600, 16, 'fa-houzz', 1, '2016-09-14 13:51:15'),
(601, 16, 'fa-ioxhost', 1, '2016-09-14 13:51:24'),
(602, 16, 'fa-lastfm-square', 1, '2016-09-14 13:51:32'),
(603, 16, 'fa-linux', 1, '2016-09-14 13:51:46'),
(604, 16, 'fa-mixcloud', 1, '2016-09-14 13:51:58'),
(605, 16, 'fa-opencart', 1, '2016-09-14 13:52:07'),
(606, 16, 'fa-pagelines', 1, '2016-09-14 13:52:19'),
(607, 16, 'fa-pied-piper-pp', 1, '2016-09-14 13:52:29'),
(608, 16, 'fa-reddit', 1, '2016-09-14 13:53:06'),
(609, 16, 'fa-skyatlas', 1, '2016-09-14 13:53:36'),
(610, 16, 'fa-snapchat &lt;i class=&quot;fa fa-snapchat&quot;', 1, '2016-09-14 13:53:45'),
(611, 16, 'fa-spotify', 1, '2016-09-14 13:53:55'),
(612, 16, 'fa-steam-square', 1, '2016-09-14 13:54:04'),
(613, 16, 'fa-themeisle', 1, '2016-09-14 13:54:15'),
(614, 16, 'fa-tumblr-square', 1, '2016-09-14 13:54:26'),
(615, 16, 'fa-usb', 1, '2016-09-14 13:54:37'),
(616, 16, 'fa-vimeo', 1, '2016-09-14 13:54:48'),
(617, 16, 'fa-wikipedia-w', 1, '2016-09-14 13:55:08'),
(618, 16, 'fa-yelp', 1, '2016-09-14 14:56:37'),
(619, 16, 'fa-youtube-square', 1, '2016-09-14 14:56:51'),
(620, 17, 'fa-stethoscope', 1, '2016-09-14 14:57:38'),
(621, 17, 'fa-h-square', 1, '2016-09-14 14:57:54'),
(622, 17, 'fa-hospital-o', 1, '2016-09-14 14:58:05'),
(623, 17, 'fa-user-md', 1, '2016-09-14 14:58:16'),
(624, 17, 'fa-medkit', 1, '2016-09-14 14:58:35'),
(625, 3, 'fa-american-sign-language-interpreting', 1, '2016-09-14 17:03:07'),
(626, 3, 'fa-deaf', 1, '2016-09-14 17:03:29'),
(627, 3, 'fa-blind', 1, '2016-09-14 17:03:39'),
(628, 3, 'fa-braille', 1, '2016-09-14 17:04:20'),
(629, 3, 'fa-deaf', 1, '2016-09-14 17:04:30'),
(630, 3, 'fa-sign-language', 1, '2016-09-14 17:04:43');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
