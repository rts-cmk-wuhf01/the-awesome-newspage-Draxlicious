const mysql = require("../config/mysql");


// en asynkron funktion der er oprettet ude af score og kan blive kaldt overalt
// kræver en await for at blive kørt med sql
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

    // http://localhost:3000/admin/categories
    // her placeres alle de routes administrations panelet har brug for 
    app.get("/admin/categories", async (req, res, next) => {
        // her skal alle kategorier hentes og sendes til template filen.....

        // her bliver oprettet en variabel der awaiter getcategories funktionen
        let categories = await getCategories();

        res.render("admin_categories", {
            "categories": categories
        })
    });

    app.post("/admin/categories", async (req, res, next) => {
        // her skal vi modtage form data og indsætte det i databasen
        // send bruger tilbage til kategori admin listen

        // opretter en variabel til name attributten category_title
        let title = req.body.category_title;

        // opretter et tomt array der kan pushes data ind i. Siger hvis title er undefined eller tomt så push navn mangler
        let return_message = [];
        if (title == undefined || title == '') {
            return_message.push('Navn mangler');
        }

        if (return_message.length > 0) {
            // der er mindst 1 information der mangler, returner beskeden som en string.
            let categories = await getCategories(); // denne forklares lige om lidt!

            // res.render filerne bliver sammensat hvis længden er mere end 1
            // giver mig categories, returner et komma mellem rum fra return_message og sender req.body tilbage
            res.render('admin_categories', {
                'categories': categories,
                'return_message': return_message.join(', '),
                'category': req.body // læg mærke til vi "bare" sender req.body tilbage
            });

        }
        // hvis ikke skal den redirect mig tilbage til start siden
        else {
            let db = await mysql.connect();
            
            // denne variabel udskriver vi med et sigende navn for at forklare men ikke nødvendigvis at kalde den andre steder.
            // INSERT INTO vælger den tabel i din database som du vil arbejde med.
            // SET vægler den kolonne i den tabel du har valgt at arbejde i.
            // category_title indsætter den næste oprettelse i tabellen.
            let result = await db.execute(`
              INSERT INTO categories
              SET category_title = ?
             `, [title]);
            db.end();
            res.redirect("/admin/categories")
        }
    });

    // min route til rediger
    app.get("/admin/categories/edit/:category_id", async (req, res, next) => {
        // denne route skal hente både alle kategorier og den ene kategori
        // data skal sendes til template filen

        // fortæller category_title skal være det samme som category_id i url
        let db = await mysql.connect();
        let [category] = await db.execute(`
      SELECT category_title
      FROM categories
      WHERE category_id = ?
      `, [req.params.category_id]);
        db.end();

        // udskriver categories metoden med al indhold i den
        let categories = await getCategories();

        // siger hvad der må køres på siden
        res.render("admin_categories", {
            "categories": categories,
            // udskriver den første da det ikke er et array
            "category": category[0]
        })
    });

    app.post("/admin/categories/edit/:category_id", async (req, res, next) => {
        // tag form data og parameter fra endpoint og opdater databasen
        // send bruger tilbage til kategori admin listen




        // opretter en variabel så jeg ikke behøver skrive den lange values hver gang og det har et sigende navn.
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
            // opdater i category og sætter category's indhold til at være det samme som categoryid
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

        // sletter fra categories hvor categorid der er trykket på
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