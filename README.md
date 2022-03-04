# How to run

Firstly go to `./back-end/` and run `npm i` to install the packages.

Then do the same in `./front-end/`

Once you have installed all the dependencies you can run the project with client only or full start. (You must be in `./front-end/`) Running client takes only a few seconds where the entire server might take up till a minute.

### run React only

> npm run client

### Build react project and start express server.

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

**TIP:** `id` is has to be later set to `Primary key` and `Auto Incremental`

# Entries for API `./back-end/`

    Format: [Request] [Path] [Body Requirements]

**POST** `/api/authenticate/request` - [email]

Will send an message to the selected **email** by attaching a domain name to it. Send from **email** from `./.env`

**POST** `/api/authenticate/provide` - [email, code]

Once **email** and correct **code** are provided then a verification token will be created and send to the user

**POST** `/api/questions/create` - [email, token, page]

**Email** and **token** to confirm who is creating the question. Data for the question must be found in **page**

**GET** `/api/questions/:id`

Question html gets generated from the data received from the mysql server.

**GET** `/api/questions/recent/:email/:page"`

Sends first 10 questions offset by (:page-1)\*10 created by :email. It is possible to is :email "**all**" to get questions made by all
