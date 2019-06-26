const mysql = require("../config/mysql");

async function getCategories() {
    let db = await mysql.connect();
    let [categories] = await db.execute(`
       SELECT category_id, category_title 
       FROM categories
 `);
    db.end();
    return categories;
}


module.exports = app => {

    // her placeres alle de routes administrations panelet har brug for 

    app.get("/admin/categories", async (req, res, next) => {
        // her skal alle kategorier hentes og sendes til template filen.....
        let categories = await getCategories();
        res.render("admin_categories", {
            "categories": categories
        })
    });

    app.post("/admin/categories", async (req, res, next) => {
        // her skal vi modtage form data og indsætte det i databasen
        // send bruger tilbage til kategori admin listen
        let title = req.body.category_title;

        let return_message = [];
        if (title == undefined || title == '') {
            return_message.push('Navn mangler');
        }

        if (return_message.length > 0) {
            // der er mindst 1 information der mangler, returner beskeden som en string.
            let categories = await getCategories(); // denne forklares lige om lidt!


            res.render('admin_categories', {
                'categories': categories,
                'return_message': return_message.join(', '),
                'category': req.body // læg mærke til vi "bare" sender req.body tilbage
            });

        }
        else {
            let db = await mysql.connect();
            let result = await db.execute(`
              INSERT INTO categories
              SET category_title = ?
             `, [title]);
            db.end();
            res.redirect("/admin/categories")
        }


    });

    app.get("/admin/categories/edit/:category_id", async (req, res, next) => {
        // denne route skal hente både alle kategorier og den ene kategori
        // data skal sendes til template filen

        let db = await mysql.connect();
        let [category] = await db.execute(`
      SELECT category_title
      FROM categories
      WHERE category_id = ?
      `, [req.params.category_id]);
        db.end();

        let categories = await getCategories();

        res.render("admin_categories", {
            "categories": categories,
            "category": category[0]
        })
    });

    app.post("/admin/categories/edit/:category_id", async (req, res, next) => {
        // tag form data og parameter fra endpoint og opdater databasen
        // send bruger tilbage til kategori admin listen





        let title = req.body.category_title;

        let return_message = [];
        if (title == undefined || title == '') {
            return_message.push('Navn mangler');
        }

        if (return_message.length > 0) {
            // der er mindst 1 information der mangler, returner beskeden som en string.
            let categories = await getCategories(); // denne forklares lige om lidt!


            res.render('admin_categories', {
                'categories': categories,
                'return_message': return_message.join(', '),
                'category': req.body, // læg mærke til vi "bare" sender req.body tilbage
            });

        }
        else {
            let db = await mysql.connect();
            let [result] = await db.execute(
        `   
            UPDATE categories 
            SET category_title = ?
            WHERE category_id = ?
        `,
                [title, req.params.category_id]
            );
            db.end();
            res.redirect("/admin/categories")
        }

    });


    app.get("/admin/categories/delete/:category_id", async (req, res, next) => {
        // benyt endpoint parameter til at slette en kategori fra databasen
        // send bruger tilbage til kategori admin listen

        let db = await mysql.connect();
        let [result] = await db.execute(`
        DELETE FROM categories
         WHERE category_id = ?`
         , [req.params.category_id]
        );
        db.end();
        res.redirect("/admin/categories")
    });
};