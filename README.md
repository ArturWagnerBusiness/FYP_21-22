# How to run

Firstly go to `./back-end/` and run `npm i` to install the packages.

Then do the same in `./front-end/`

Once you have installed all the dependencies you can run the project with client only or full start. (You must be in `./front-end/`) Running client takes only a few seconds where the entire server might take up till a minute.

### run React only

> npm run client

### Build react project and start express server.

> npm start

## NOTE: MySQL server is needed

Can be run at port localhost:3306 (The server will try to connect to server below)

```javascript
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
});
```

A database called `db` needs to exist with a table called `pages`.

You can extract it from `./db.sql`

example at `./.env` can be moved into `./back-end/.env` with your own parameters inside it.

```sql
CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `email` varchar(11) NOT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`))
);
```

**TIP:** `id` is has to be later set to `Primary key` and `Auto Incremental`

# Entries for API `./back-end/` (Might be outdated for now)

    Format: [Request] [Path] [Body Requirements]

**POST** `/api/authenticate/request` - [email]

Will send an message to the selected **email** by attaching a domain name to it. Send from **email** from `./.env`

**POST** `/api/authenticate/provide` - [email, code]

Once **email** and correct **code** are provided then a verification token will be created and send to the user

**POST** `/api/questions/create` - [email, token, page]

**Email** and **token** to confirm who is creating the question. Data for the question must be found in **page**

**GET** `/api/questions/:id`

Question html gets generated from the data received from the mysql server.

**GET** `/api/exercises/content/:time/:email/:page"`

Sends first 10 questions offset by (_:page_-1)\*10 created by _:email_. It is possible to select _:email_ "**all**" to get questions made by all. Parameter _:time_ can be inserted to get all **recent** for example

**GET** `/api/exercises/count/:email/"`

Get amount of questions for _:email_ or **all**
