require("dotenv").config();

const fs = require("fs");

const path = require("path");

const db = require("../src/helpers/db");

const { promisify } = require("util");

const read = promisify(fs.readFile);

const createTable = async () => {
	try {
		const dataPath = path.join(__dirname, `../data/tables.sql`);
		const data = await read(dataPath);
		const sqlQueryString = data.toString();
		await db.query(sqlQueryString);
		console.info(`✅ All tables are  successfully created.`);
	} catch (e) {
		console.error(`❌ Tables are  not created.`);
		console.error(e);
	}
	db.pool.end();
};

createTable();
