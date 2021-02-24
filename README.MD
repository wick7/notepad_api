# Note Pad API

This is a CRUD API made with the Node.js Express framework. The API's purpose revolves around creating, reading, updating and deleting notes from a given MySQL database. The UI repo used in conjunction with this application can be found [here](https://github.com/wick7/notepad).

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install) to install all dependencies.

```bash
yarn
```

## MySQL Schema Info

```
id INT NOT NULL AUTO_INCREMENT,
user_id INT NULL,
text LONGTEXT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
PRIMARY KEY(id)
```

## Environment Variables

Create a .env file with the following variables

```
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## Usage

To start API run:

```bash
yarn run dev
```

API available at `http://localhost:3001/notes`
