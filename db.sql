-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2022 at 09:28 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `exercise` int(11) NOT NULL,
  `user` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `exercise`, `user`) VALUES
(1, 1, 'k100'),
(2, 1, 'k70'),
(13, 1, 'k1909979'),
(14, 2, 'k1909979'),
(15, 4, 'k1909979'),
(16, 6, 'k70'),
(17, 7, 'k70'),
(18, 17, 'k1909979'),
(19, 5, 'k1909979'),
(20, 16, 'k1909979'),
(22, 20, 'k1909979'),
(23, 21, 'k1909979'),
(24, 22, 'k1909979'),
(25, 23, 'k1909979'),
(26, 22, 'k342342'),
(27, 21, 'k342342'),
(28, 22, 'k70');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `email` varchar(11) NOT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `email`, `date_added`, `data`) VALUES
(1, 'k1909979', '2022-03-03', '{\"title\":\"\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Random page\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://google.com\",\"selfHost\":false},{\"type\":\"text\",\"order\":2,\"content\":\"Some more content<strong>Testing!</strong>\\nNew line\\n<img src=\\\"#\\\" alt=\\\":)\\\">\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":3,\"content\":\"print(\\\"Google is a cool website\\\")\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(2, 'k1909979', '2022-03-03', '{\"title\":\"\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Random page\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://google.com\",\"selfHost\":false},{\"type\":\"text\",\"order\":2,\"content\":\"Some more content<strong>Testing!</strong>\\nNew line\\n<img src=\\\"#\\\" alt=\\\":)\\\">\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":3,\"content\":\"print(\\\"Google is a cool website\\\")\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(3, 'k1909979', '2022-03-03', '{\"title\":\"\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Random page\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://google.com\",\"selfHost\":false},{\"type\":\"text\",\"order\":2,\"content\":\"Some more content<strong>Testing!</strong>\\nNew line\\n<img src=\\\"#\\\" alt=\\\":)\\\">\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":3,\"content\":\"print(\\\"Google is a cool website\\\")\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(4, 'k1909979', '2022-03-03', '{\"title\":\"\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Random page\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://google.com\",\"selfHost\":false},{\"type\":\"text\",\"order\":2,\"content\":\"Some more content<strong>Testing!</strong>\\nNew line\\n<img src=\\\"#\\\" alt=\\\":)\\\">\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":3,\"content\":\"print(\\\"Google is a cool website\\\")\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(5, 'k1909979', '2022-03-03', '{\"title\":\"r4534534\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Text\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://www.spiritanimal.info/pictures/cat/Cat-Spirit-Animal-3.jpg\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"print(\\\"Hello World\\\");\\nprint(\\\"Let the game start\\\");\\nexit(0);\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(6, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[],\"tests\":[]}'),
(7, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(8, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(9, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(10, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(11, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(12, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(13, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(14, 'k70', '2022-03-04', '{\"title\":\"hii\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"im new\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(15, 'k1909979', '2022-03-04', '{\"title\":\"Title doesn\'t save yet\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"A box with text in it. :D\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":1,\"content\":\"print(\\\"CODE!!!!\\\")\\nexit(0) // New line here\",\"language\":\"Javascript\"},{\"type\":\"image\",\"order\":2,\"content\":\"https://image\",\"selfHost\":false}],\"tests\":[]}'),
(16, 'k1909979', '2022-03-07', '{\"title\":\"Hello\",\"content\":[{\"type\":\"image\",\"order\":0,\"content\":\"hhttpweirewjtiewr\",\"selfHost\":false},{\"type\":\"text\",\"order\":1,\"content\":\"text\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":2,\"content\":\"prinmt(\\\"hello\\\")\",\"language\":\"Javascript\"}],\"tests\":[]}'),
(17, 'k1909979', '2022-03-10', '{\"title\":\"Final test\",\"description\":\"This exercise will be generated as a test to see if the title and description work as intended.\\nNew line 1.\\nNew line 2.\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Arial font size 12. Should be in the database.\\nBut no rendered YET!\\nTEST!\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"image\",\"order\":1,\"content\":\"https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg\",\"selfHost\":false},{\"type\":\"code\",\"order\":2,\"content\":\"(()=>{\\n    let x = \\\"Cool thing!\\\";\\n    console.log(\\\"NOT\\\" + x);\\n})()\",\"language\":\"Javascript\"},{\"type\":\"text\",\"order\":3,\"content\":\"Above this should be a nice block of self-run code.\",\"fontFamily\":\"Courier New\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false}],\"tests\":[]}'),
(18, 'k1909979', '2022-03-11', '{\"title\":\"Title\",\"description\":\"rjetwrotirt\\nwtrrte\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"text\",\"fontFamily\":\"Garamond\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":1,\"content\":\"print(\\\"e\\\")\",\"language\":\"Javascript\"},{\"type\":\"text\",\"order\":2,\"content\":\"e\",\"fontFamily\":\"\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"text\",\"order\":3,\"content\":\"d\",\"fontFamily\":\"\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false}],\"tests\":[]}'),
(20, 'k1909979', '2022-03-31', '{\"title\":\"Cheese\",\"description\":\"Cheese tester\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Testing code\\nPut \\\"print(`cheese`)\\\" in the editor and test\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false}],\"tests\":[{\"type\":\"codeIncludes\",\"content\":\"print(`cheese`)\"}]}'),
(21, 'k1909979', '2022-03-31', '{\"title\":\"Cheese Fixed!\",\"description\":\"Cheese tester\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"Testing code\\nPut \\\"print(\\\"cheese\\\")\\\" in the editor and test\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false}],\"tests\":[{\"type\":\"codeIncludes\",\"content\":\"print(\\\"cheese\\\")\"}]}'),
(22, 'k1909979', '2022-03-31', '{\"title\":\"bread\",\"description\":\"bread\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"bread\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false},{\"type\":\"code\",\"order\":1,\"content\":\"console.log(\\\"bread\\\")\",\"language\":\"Javascript\"}],\"tests\":[{\"type\":\"codeIncludes\",\"content\":\"bread\"}]}'),
(23, 'k1909979', '2022-03-31', '{\"title\":\"bread2\",\"description\":\"bread\",\"content\":[{\"type\":\"text\",\"order\":0,\"content\":\"bread\",\"fontFamily\":\"Arial\",\"fontSize\":12,\"isBold\":false,\"isItalic\":false,\"isUnderlined\":false}],\"tests\":[{\"type\":\"testFinalOutput\",\"content\":\"bread\"}]}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercise` (`exercise`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`exercise`) REFERENCES `pages` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
