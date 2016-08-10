-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 02, 2016 at 02:08 PM
-- Server version: 5.6.31
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wheris`
--

-- --------------------------------------------------------

--
-- Table structure for table `beacons`
--

CREATE TABLE IF NOT EXISTS `beacons` (
  `id` int(99) NOT NULL,
  `bname` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `uuid` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(99) NOT NULL,
  `name` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'unknown',
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `colour` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lat` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `lon` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `flag` int(2) NOT NULL,
  `status` int(2) NOT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `beacons`
--

INSERT INTO `beacons` (`id`, `bname`, `uuid`, `user_id`, `name`, `location`, `image`, `colour`, `lat`, `lon`, `flag`, `status`, `date`) VALUES
(12, 'AVAVA_02647', 'D1:B0:75:4F:19:54', 14, 'Wallet', 'unknown', 'wallet', 'f39c12', '2.938255', '101.6220215', 0, 1, '2016-08-02 10:01:22 PM'),
(13, 'AVAVA_02585', 'D0:B2:F3:D2:D4:EC', 14, 'Beg', 'unknown', 'boy', 'f39c12', '3.1290819', '101.7143574', 0, 1, '2016-07-30 04:10:24 PM'),
(9, 'AVAVA_02670', 'F6:FD:8E:52:A3:79', 13, 'My wallet', 'unknown', 'wallet', '27ae60', '3.1290819', '101.7143574', 0, 1, '2016-07-30 04:10:24 PM'),
(14, 'AVAVA_02649', 'D8:61:D0:43:4D:A8', 14, 'Adam', 'unknown', 'boy', 'f39c12', '2.9381777', '101.6219989', 0, 1, '2016-07-29 01:30:39 PM'),
(15, 'AVAVA_02641', 'D1:B0:75:4F:19:54', 9, 'Kunci', 'unknown', 'boy', 'f39c12', '2.9382181', '101.6219737', 0, 1, '2016-07-28 10:19:37 AM'),
(16, 'AVAVA_02588', 'D0:B2:F3:D2:D4:EC', 14, 'Kucing1', 'unknown', 'pet', 'f39c12', '3.2019739', '101.7176807', 0, 1, '2016-07-29 12:58:22 PM'),
(20, 'AVAVA_00478', 'D2:4B:55:21:A7:4D', 13, 'Hakimi', 'unknown', 'boy', 'f39c12', '3.1290819', '101.7143574', 0, 1, '2016-07-30 04:10:25 PM'),
(19, 'MI', '88:0F:10:35:B3:7A', 15, 'Nurul', 'unknown', 'boy', 'f39c12', '3.1290819', '101.7143574', 0, 1, '2016-07-30 04:10:27 PM');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(250) NOT NULL,
  `beacon_id` int(250) NOT NULL,
  `location_name` varchar(250) NOT NULL,
  `lat` varchar(250) NOT NULL,
  `lon` varchar(250) NOT NULL,
  `date` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `beacon_id`, `location_name`, `lat`, `lon`, `date`) VALUES
(1, 12, 'cyberjaya', '2.5', '2.5', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(99) NOT NULL,
  `name` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `sms_code` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `device_type` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `device_id` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `notify` int(99) NOT NULL DEFAULT '0',
  `status` int(2) NOT NULL,
  `password` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `sms_code`, `device_type`, `device_id`, `notify`, `status`, `password`) VALUES
(13, 'Akmal ', 'akmalakhpah@gmail.com ', '', 'SVKTO0', 'Android', 'eOT_1vBUNLw:APA91bGrIBj7sbEbvH2AsTS_nSGr9rU3bzJZ4dx3D0ix9ZzdkCsDW39JqeLWdBWCRdf8BHtyB6x6oZrd4zQ9p4KZfrjleeyu1NVMiGXCyfIa82TgH_Xvq-3kQ86AYqr_36vwnNenYhI5', 9, 0, '1234567890'),
(15, 'Shahiran', 'mshahiranzabedin@gmail.com', '', 'KDDXMA', 'Android', 'null', 1, 0, 'ms250890s'),
(16, 'Shah', 'yiori049@gmail.com', '', '7DACIT', 'Android', 'e6ZIUV37np0:APA91bFCA4j2Bmd3tzCtSCmeOGFHFvuEtubNJmmaofrkODa_TO_2mXTXDcBd-nmsLVc82Q57kTuUDv8429LwkJJni34CXgMZrqNbjq9uNqtE3HaumgXNDyds5xU-bfbrGn8PWL11Ul1f', 0, 0, 'ms250890'),
(9, 'iphone', 'iphone', '', 'R4KHWT', 'iOS', 'b7f131e4206585b3f457b246b39c53a7d55bd06e5c636ce7f1654c714f3ac808', 1, 0, 'iphone'),
(14, 'android', 'android', '', 'PFULWC', 'Android', 'dPSONHZE_Tk:APA91bFoveFbmE2uSrWgapmCbCoYWQoZ0tWAq9YVkPZU1x08nWBfmIf8XhcPRxbTLDIIY2p-6yKZoZYUxDfX1rO_R0ZPH14yK0zuFV4c8xrh5IdPUQA3dVJ1c4lB3LMwq0gvRzPk5Cz_', 4, 0, 'android');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beacons`
--
ALTER TABLE `beacons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beacons`
--
ALTER TABLE `beacons`
  MODIFY `id` int(99) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(99) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
