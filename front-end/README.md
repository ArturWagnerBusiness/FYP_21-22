# README.md W.I.P

run React only

> npm run client

Build react project and start express server.

> npm start

## NOTE: MySQL server is needed

Can be run at port localhost:3306

A database called `db` needs to exist with a table called `pages`.

```sql
CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `email` varchar(11) NOT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`))
);
```

`id` is has to be later set and `Primary key` and `Auto Incremental`
