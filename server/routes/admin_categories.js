const mysql = require("../config/mysql");

module.exports = app => {

   // her placeres alle de routes administrations panelet har brug for 

   app.get("/admin/categories", async (req, res, next) => {
    // her skal alle kategorier hentes og sendes til template filen.....
  });

  app.post("/admin/categories", async (req, res, next) => {
    // her skal vi modtage form data og indsætte det i databasen
    // send bruger tilbage til kategori admin listen
  });

  app.get("/admin/categories/edit/:category_id", async (req, res, next) => {
    // denne route skal hente både alle kategorier og den ene kategori
    // data skal sendes til template filen
  });

  app.post("/admin/categories/edit/:category_id", async (req, res, next) => {
    // tag form data og parameter fra endpoint og opdater databasen
    // send bruger tilbage til kategori admin listen

    
    let [result] = await db.execute(
        `
            UPDATE categories 
            SET category_title = ?
            WHERE category_id = ?`,
        [category_title, category_id]
      );
  });

  app.get("/admin/categories/delete/:category_id", async (req, res, next) => {
    // benyt endpoint parameter til at slette en kategori fra databasen
    // send bruger tilbage til kategori admin listen

    let [result] = await db.execute('DELETE FROM categories WHERE category_id = ?', [category_id]);
  });
};