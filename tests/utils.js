const db = require("../database/init");

// To initialize DB for testing which will be temporary
async function createDB() {
  await db.init();
}

async function getRecordFromDB(table, field, value) {
  const raw = `SELECT * FROM ${table} WHERE ${field}=? `;
  const stmnt = db.db.prepare(raw);
  const data = stmnt.get(value);
  return data;
}

async function addToDB(table, fields, records) {
  const raw = `INSERT INTO ${table} (${fields.join(",")}) VALUES(${fields
    .map((v) => `:${v}`)
    .join(",")})`;

  const stmnt = db.db.prepare(raw);
  for (const record of records) {
    await stmnt.run(record);
  }
}

module.exports = {
  createDB,
  getRecordFromDB,
  addToDB,
};
