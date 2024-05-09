const { db } = require("../../database/init");

async function getProduceByPlu(plu) {
  const stmnt = db.prepare("SELECT * FROM PRODUCE WHERE plu =?");
  const info = await stmnt.get(plu);
  return info;
}

async function getAllProduce() {
  const stmnt = db.prepare("SELECT * FROM PRODUCE ");
  const info = await stmnt.all();
  return info;
}

async function addProduce(plu, name, price) {
  const stmnt = db.prepare(
    `INSERT INTO PRODUCE (PLU,NAME,PRICE) VALUES(?,?,?)`
  );
  const info = await stmnt.run(plu, name, price);
  return info;
}

async function deleteProduceByPlu(plu) {
  const stmnt = db.prepare("DELETE FROM PRODUCE where plu=? ");
  const info = await stmnt.run(plu);
  return info;
}

module.exports = {
  getProduceByPlu,
  getAllProduce,
  addProduce,
  deleteProduceByPlu,
};
