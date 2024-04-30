const Database = require("better-sqlite3");
const db = new Database(process.env.DB_SOURCE, { verbose: console.log }); //process.env.DB_SOURCE = './database/produces.db';
const fs = require("fs");

async function init() {
  const script = fs.readFileSync("./database/scripts/query.sql", "utf-8");
  await db.exec(script);
}

module.exports = {
  db,
  init,
};
