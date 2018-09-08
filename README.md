# homework-uploader-api

The api for the homework uploader.

## Usage

1. Install Node

The node version I tested is Node v8.9.0.

2. Clone this repo

```bash
git clone https://github.com/delbertbeta/homework-uploader-api.git
```

3. Install dependencies

```bash
cd homework-uploader-api
npm install
```

4. Install MariaDB or MySQL server (Optional)

**Now we support SQLite, MariaDB and MySQL is optional now.**

Just follow your own way to install it and create a database and a user for the api service.

5. Rename config.example.js to config.js and fill in the blank

Fill it with your database type, name, username, password, url.

6. Start the API

```bash
node app.js
```

or you can use `pm2` or `forever` to make it can restore automatically from unexpected errors. :D