const mysql = require('../config/mysql')

let adress = [
   {
      "title": "Adress",
      "main": "481 Creekside Lane Avila",
      "second": "Beach, CA 93424"
   },
   {
      "title": "Phone",
      "main": "+53 345 7953 32453",
      "second": "+53 345 7557 822112",
   },
   {
      "title": "Email",
      "main": "yourmail@gmail.com",
   },

]


async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories
`);
   db.end();
   return categories;
}

async function getLatestPost(){
   let db = await mysql.connect();
   let [latestPostWidget] = await db.execute(`
   SELECT category_id , category_title , article_id , article_title , article_date, image_name
   FROM categories
   LEFT OUTER JOIN article ON fk_article_category_id = category_id
   INNER JOIN images ON image_id = fk_article_image_id
   WHERE article_id = (
      SELECT article_id
      FROM article
      WHERE fk_article_category_id = category_id
      ORDER BY article_date DESC
      LIMIT 1)
   ORDER BY article_date DESC
`)
   db.end();
   return latestPostWidget;
}

async function getLatestNews(){
   let db = await mysql.connect();
   let [latestNews] = await db.execute(`
   SELECT article_id, article_title, article_date
   FROM article
   ORDER BY article_date DESC
   LIMIT 4
`)
db.end();
return latestNews;
}


async function getLatestComment(){
   let db = await mysql.connect();
   let [latestComment] = await db.execute(`
   SELECT article_id, article_title, article_date, image_name, author_name
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      INNER JOIN authors ON author_id = fk_article_author_id
      ORDER BY article_date DESC
      LIMIT 4
`)
db.end();
return latestComment;
}


module.exports = (app) => {

   app.get('/database', async (req, res, next) => {
      let db = await mysql.connect();
      // udfør en (eller flere) forespørgel(er)
      let [products] = await db.execute('SELECT * FROM products');
      // afslut forbindelsen til databasen
      db.end();

      // res.send sender kun data med mellem paranteserne for hurtigt at udskrive noget
      // res.send(products);

      // res.render sender filen med som hedder products (filen er products.ejs men den sidste del skrives ikke)
      res.render('products', {
         'products': products
      })
   });



   app.get('/fisk/:antal/:type', async (req, res, next) => {

         let antal = {
            "fiskData": [req.params.fisk],
         }
         let type = {
            "typeData": [req.params.type],
         }
         
         let fisk = "her har du 3 fisk"


         let dataFisk = {
            // udskriver antallet i url og på siden
            antal: req.params.antal,
            type: req.params.type
         }

      res.render('fisk',{
         "fisk": fisk, 
         "dataFisk": dataFisk
      })
   });


   const editors = [
      {
         "img": "img/bg-img/1.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      },
      {
         "img": "img/bg-img/2.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      },
      {
         "img": "img/bg-img/3.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      },
      {
         "img": "img/bg-img/4.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      },
      {
         "img": "img/bg-img/5.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      },
      {
         "img": "img/bg-img/6.jpg",
         "text": "Orci varius natoque penatibus et magnis dis parturient montes.",
         "dateTime": "February 11, 2018"
      }
   ]

   const worldnews = [
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'February 11, 2018',
         "img": "img/bg-img/7.jpg"
      },
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'February 11, 2018',
         "img": "img/bg-img/8.jpg"
      },
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'February 11, 2018',
         "img": "img/bg-img/9.jpg"
      },
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'February 11, 2018',
         "img": "img/bg-img/10.jpg"
      },
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'February 11, 2018',
         "img": "img/bg-img/11.jpg"
      },
   ]

   const news = [
      {
         "number": 1,
         "text": "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
         "dateTime": 'APRIL 14, 2019'
      },
      {
         "number": 2,
         "text": " Consectetur adipiscing elit. Nam eu metus sit amet odio sodales placer.",
         "dateTime": 'APRIL 14, 2019'
      },
      {
         "number": 3,
         "text": " Adipiscing elit. Nam eu metus sit amet odio sodales placer. Sed varius leo.",
         "dateTime": 'APRIL 14, 2019'
      },
      {
         "number": 4,
         "text": " Eu metus sit amet odio sodales placer. Sed varius leo ac...",
         "dateTime": 'APRIL 14, 2019'
      },
   ]

   app.get('/', async (req, res, next) => {
      let db = await mysql.connect();

      let categories = await getCategories();
      
      // Sortere efter categori id og derefter deres date-time
      let latestPostWidget  = await getLatestPost();

      let latestNews  = await  getLatestNews();

      let [homeNews] = await db.execute(`
      SELECT article_id, article_title, article_date, image_name, article_likes, article_comment, article_content, category_title, category_id
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      INNER JOIN categories ON category_id = fk_article_category_id
      ORDER BY article_likes DESC
      LIMIT 4
      `);

   
      let [editors] = await db.execute(`
      SELECT article_id, image_name, article_title, article_date
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      ORDER BY image_id
      LIMIT 6
      `)


      let [worldnews] = await db.execute(`
      SELECT article_id, article_title, article_date, image_name
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      ORDER BY article_date DESC
      LIMIT 5
      `)

      db.end();

      let products = [
         {
            "name": "Product 1",
            "price": 100
         },
         {
            "name": "Product 2",
            "price": 200
         },
         {
            "name": "Product 3",
            "price": 300
         }
      ]

      let lækkerIs = [
         {
            "name": "Filur",
            "pris": 10
         },
         {
            "name": "Isbjørn",
            "pris": 12
         },
         {
            "name": "Twister",
            "pris": 15
         }
      ]

      let post = [
         {
            "img": "img/bg-img/19.jpg",
            "name": "FINANCE",
            "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         }
      ]

      res.render('home', {
         'title': 'Min Forside',
         'latestProducts': products,
         "latestPost": post,
         "latestNews": latestNews,
         "editorsPost": editors,
         "worldNews": worldnews,
         "categories": categories,
         "latestPostWidget": latestPostWidget,
         "homeNews": homeNews,
         // test
         "person": {
            "fornavn": "Lukas"
         },
         // test på lækker is
         'bedsteIs': lækkerIs,
         
      });
   });

   app.get('/categori/:category_id', async (req, res, next) => {
      let db = await mysql.connect();

      // Disse to variabler bruges til database udtræk
      let sql = "";
      let sqlValues = [];


      // Navigation menu
      let categories = await getCategories();

      // Lastest post
      let latestPostWidget  = await getLatestPost();

      // Most populair News
      let latestNews  = await  getLatestNews();
      
      // Latest Comments
      let latestComment = await getLatestComment();

      // version 1
      // sql = `
      // SELECT article_id, article_title, article_date, image_name, author_name
      // FROM article
      // INNER JOIN images ON image_id = fk_article_image_id
      // INNER JOIN authors ON author_id = fk_article_author_id
      // ORDER BY article_date DESC
      // LIMIT 4
      // `
      // sqlValues = [];

      // let [latestComment] = await db.execute(sql, sqlValues);

      // let [latestPostArea] = await db.execute(`
      // SELECT article_id, article_title, article_content, article_comment, article_likes, image_name, author_name, author_title
      // FROM article
      // INNER JOIN images ON image_id = fk_article_image_id
      // INNER JOIN authors ON author_id = fk_article_author_id
      // WHERE fk_article_category_id = ?
      // ORDER BY article_comment DESC
      // LIMIT 4 
      // `, [req.params.category_id]);


      // Henter artikler der tilhøre den kategori_id der er nævnt i url (ser WHERE clause)
      sql = `
      SELECT article_id, article_title, article_content, article_comment, article_likes, image_name, author_name, author_title
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      INNER JOIN authors ON author_id = fk_article_author_id
      WHERE fk_article_category_id = ?
      ORDER BY article_comment DESC
      LIMIT 4 
      `;
      sqlValues = [req.params.category_id]
      let [latestPostArea] = await db.execute(sql, sqlValues);

      db.end();

      let post = [
         {
            "img": "img/bg-img/19.jpg",
            "name": "FINANCE",
            "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         }
      ]

      let comment = [
         {
            "name": "Jamie Smith",
            "job": "Enough space for a whole line. I am a Web-udvikler",
            "img": "img/bg-img/29.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Christy Williams",
            "job": "Enough space for a whole line. I am a Web-designer",
            "img": "img/bg-img/30.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Sandy Doe",
            "job": " Enough space for a whole line. I am a Medie-grafiker",
            "img": "img/bg-img/31.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Christian Williams",
            "job": "Enough space for a whole line. I am a Nimbus 2000",
            "img": "img/bg-img/32.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         }
      ]

      res.render('categori', {
         'title': 'Kategori',
         "latestPost": post,
         "latestComment": latestComment,
         "latestNews": latestNews,
         "categories": categories,
         "latestNews": latestNews,
         "latestPostArea": latestPostArea,
         "latestPostWidget": latestPostWidget

      });
   });


   app.get('/post/:article_id', async (req, res, next) => {
      let db = await mysql.connect();

      try{
      let [article] = await db.execute(`
      SELECT image_name, article_id, article_title, article_content, article_likes, article_comment, author_name, author_title, author_about, category_title
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      INNER JOIN authors ON author_id = fk_article_author_id
      INNER JOIN categories ON category_id = fk_article_category_id
      WHERE article_id = ?
      `, [req.params.article_id]);

      // Disse to variabler bruges til database udtræk
      let sql = "";
      let sqlValues = [];


      // Navigation menu
      let categories = await getCategories();
      
      // Latest post
      let latestPostWidget  = await getLatestPost();

      // Most populair News
      let latestNews  = await  getLatestNews();
      
      // Latest Comment
      let latestComment = await getLatestComment();

      // version 1
      // sql = `
      // SELECT article_id, article_title, article_date, image_name, author_name
      // FROM article
      // INNER JOIN images ON image_id = fk_article_image_id
      // INNER JOIN authors ON author_id = fk_article_author_id
      // ORDER BY article_date DESC
      // LIMIT 4
      // `
      // sqlValues = [];

      // let [latestComment] = await db.execute(sql, sqlValues);

      // let [latestPostArea] = await db.execute(`
      // SELECT article_id, article_title, article_content, article_comment, article_likes, image_name, author_name, author_title
      // FROM article
      // INNER JOIN images ON image_id = fk_article_image_id
      // INNER JOIN authors ON author_id = fk_article_author_id
      // WHERE fk_article_category_id = ?
      // ORDER BY article_comment DESC
      // LIMIT 4 
      // `, [req.params.category_id]);


      // Henter artikler der tilhøre den kategori_id der er nævnt i url (ser WHERE clause)
      // sql = `
      // SELECT article_id, article_title, article_content, article_comment, article_likes, image_name, author_name, author_title
      // FROM article
      // INNER JOIN images ON image_id = fk_article_image_id
      // INNER JOIN authors ON author_id = fk_article_author_id
      // WHERE fk_article_category_id = ?
      // ORDER BY article_comment DESC
      // LIMIT 4 
      // `;

      // sqlValues = [req.params.category_id]

      // let [latestPostArea] = await db.execute(sql, sqlValues);


      db.end();

      let post = [
         {
            "img": "img/bg-img/19.jpg",
            "name": "FINANCE",
            "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "dateTime": "APRIL 14, 2019"
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "dateTime": "APRIL 14, 2019"
         }
      ]

      let comment = [
         {
            "name": "Jamie Smith",
            "job": "Enough space for a whole line. I am a Web-udvikler",
            "img": "img/bg-img/29.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Christy Williams",
            "job": "Enough space for a whole line. I am a Web-designer",
            "img": "img/bg-img/30.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Sandy Doe",
            "job": " Enough space for a whole line. I am a Medie-grafiker",
            "img": "img/bg-img/31.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         },
         {
            "name": "Christian Williams",
            "job": "Enough space for a whole line. I am a Nimbus 2000",
            "img": "img/bg-img/32.jpg",
            "dateTime": "06:34 AM, APRIL 14, 2018"
         }
      ]
   
      res.render('post', {
         'title': 'Kategori',
         "latestPost": post,
         "latestComment": latestComment,
         "latestNews": latestNews,
         "categories": categories,
         "latestNews": latestNews,
         // "latestPostArea": latestPostArea,
         "articleData": article,
         "latestPostWidget": latestPostWidget

      });
   }
   catch(error){
      console.log(error.message);
      
   }

   });

   // app.get('/categori', (req, res, next) => {

   //    let post = [
   //       {
   //          "img": "img/bg-img/19.jpg",
   //          "name": "FINANCE",
   //          "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"  
   //       },
   //       {
   //          "img": "img/bg-img/20.jpg",
   //          "name": "POLITICS",
   //          "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/21.jpg",
   //          "name": "HEALTH",
   //          "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/22.jpg",
   //          "name": "FINANCE",
   //          "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/23.jpg",
   //          "name": "TRAVEL",
   //          "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/24.jpg",
   //          "name": "POLITICS",
   //          "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
   //          "dateTime": "APRIL 14, 2019"
   //       }
   //    ]

   //    let comment = [
   //       {
   //          "name": "Jamie Smith",
   //          "job": "Enough space for a whole line. I am a Web-udvikler",
   //          "img": "img/bg-img/29.jpg",
   //          "dateTime": "06:34 AM, APRIL 14, 2018"
   //       },
   //       {
   //          "name": "Christy Williams",
   //          "job": "Enough space for a whole line. I am a Web-designer",
   //          "img": "img/bg-img/30.jpg",
   //          "dateTime": "06:34 AM, APRIL 14, 2018"
   //       },
   //       {
   //          "name": "Sandy Doe",
   //          "job": " Enough space for a whole line. I am a Medie-grafiker",
   //          "img": "img/bg-img/31.jpg",
   //          "dateTime": "06:34 AM, APRIL 14, 2018"
   //       },
   //       {
   //          "name": "Christian Williams",
   //          "job": "Enough space for a whole line. I am a Nimbus 2000",
   //          "img": "img/bg-img/32.jpg",
   //          "dateTime": "06:34 AM, APRIL 14, 2018"
   //       }
   //    ]



   //    res.render('categori',  {
   //       'title': 'Kategori',
   //       "latestPost": post,
   //       "latestComment": comment,
   //       "latestNews": news
   //    });
   // });

   // app.get('/post', async (req, res, next) => {
   //    let db = await mysql.connect();
   //    // Navigation menu
   //    let [categories] = await db.execute(`
   //    SELECT *
   //    FROM categories
   //    `);

   //    let [latestNews] = await db.execute(`
   //    SELECT article_id, article_title, article_date
   //    FROM article
   //    ORDER BY article_date DESC
   //    LIMIT 4
   //    `)

   //    let [latestComment] = await db.execute(`
   //    SELECT article_id, article_title, article_date, image_name, author_name
   //    FROM article
   //    INNER JOIN images ON image_id = fk_article_image_id
   //    INNER JOIN authors ON author_id = fk_article_author_id
   //    ORDER BY article_date DESC
   //    LIMIT 4
   //    `)
   //    db.end();

   //    let post = [
   //       {
   //          "img": "img/bg-img/19.jpg",
   //          "name": "FINANCE",
   //          "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/20.jpg",
   //          "name": "POLITICS",
   //          "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/21.jpg",
   //          "name": "HEALTH",
   //          "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/22.jpg",
   //          "name": "FINANCE",
   //          "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/23.jpg",
   //          "name": "TRAVEL",
   //          "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //          "dateTime": "APRIL 14, 2019"
   //       },
   //       {
   //          "img": "img/bg-img/24.jpg",
   //          "name": "POLITICS",
   //          "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
   //          "dateTime": "APRIL 14, 2019"
   //       }
   //    ]

   //    let comment = [
   //       {
   //          "name": "Jamie Smith",
   //          "job": "Enough space for a whole line. I am a Web-udvikler",
   //          "img": "img/bg-img/29.jpg"
   //       },
   //       {
   //          "name": "Janni Smith",
   //          "job": "Enough space for a whole line. I am a Web-designer",
   //          "img": "img/bg-img/30.jpg"
   //       },
   //       {
   //          "name": "Kirsten Smith",
   //          "job": " Enough space for a whole line. I am a Medie-grafiker",
   //          "img": "img/bg-img/31.jpg"
   //       },
   //       {
   //          "name": "Oliver Smith",
   //          "job": "Enough space for a whole line. I am a Nimbus 2000",
   //          "img": "img/bg-img/32.jpg"
   //       }
   //    ]

   //    let liveComment = [
   //       {
   //          "name": "Børge Hemming",
   //          "img": "img/bg-img/30.jpg",
   //          "time": "April 15, 2018 06:34"
   //       },
   //       {
   //          "name": "Biver Demming",
   //          "img": "img/bg-img/31.jpg",
   //          "time": "April 15, 2018 06:35"
   //       },
   //       {
   //          "name": "Buller flemming",
   //          "img": "img/bg-img/32.jpg",
   //          "time": "April 15, 2018 06:36"
   //       },
   //    ]

   //    res.render('post', {
   //       'title': 'Article',
   //       "latestPost": post,
   //       "latestComment": latestComment,
   //       "latestNews": latestNews,
   //       "commentArea": liveComment,
   //       "categories": categories,

   //    });
   // });

   app.get('/about', async (req, res, next) => {


      // Navigation menu
      let categories = await getCategories();

      


      let aboutText = [
         {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales placerat. Sed varius leo ac leo fermentum, eu cursus nunc maximus. Integer convallis nisi nibh, et ornare neque ullamcorper ac. Nam id congue lec tus, a venenatis massa. Maecenas justo libero, vulputate vel nunc id, blandit feugiat sem."
         },
         {
            "text": "Donec gravida non metus blandit facilisis. Cras tincidunt, lorem aliquam molestie eleifend, libero dui volutpat dui, nec sodales massa libero ut metus. Mauris pretium elit ut dapibus consequat. Nam ut lorem nec sem dignissim gravida. Duis fringilla."
         },
         {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur, purus imperdiet volutpat tincidunt, eros sem mollis quam, ut placerat urna neque at massa. Proin vitae pulvinar justo. Donec vel placerat enim, at ultricies risus.."
         },
         {
            "text": "Donec turpis erat, scelerisque id euismod sit amet, fermentum vel dolor. Nulla facilisi. Sed pellentesque lectus et accumsan aliquam. Fusce lobortis cursus quam, id mattis sapien. Aliquam erat volutpat. Aliquam placerat, est quis sagittis tincidunt, ipsum eros posuere mi, ut finibus quam sem eget ex."
         },
      ]

      let aboutCounter = [
         {
            "counter": "12",
            "title": "News Article",
            "text": "Donec turpis erat, scelerisq"
         },
         {
            "counter": "45",
            "title": "Reporters",
            "text": "Donec turpis erat, scelerisq"
         },
         {
            "counter": "25",
            "title": "Awards Won",
            "text": "Donec turpis erat, scelerisq"
         },
         {
            "counter": "17",
            "title": "Years old",
            "text": "Donec turpis erat, scelerisq"
         },
      ]

      let aboutPictures = [
         {
            "name": "James Williams",
            "job": "Senior Editor",
            "img": "img/bg-img/t1.jpg"
         },
         {
            "name": "Christinne Smith",
            "job": "Senior Editor",
            "img": "img/bg-img/t2.jpg"
         },
         {
            "name": "Alicia Dormund",
            "job": "Senior Editor",
            "img": "img/bg-img/t3.jpg"
         },
         {
            "name": "Steve Duncan",
            "job": "Senior Editor",
            "img": "img/bg-img/t4.jpg"
         },
         {
            "name": "James Williams",
            "job": "Senior Editor",
            "img": "img/bg-img/t5.jpg"
         },
         {
            "name": "Christinne Smith",
            "job": "Senior Editor",
            "img": "img/bg-img/t6.jpg"
         },
         {
            "name": "Alicia Dormund",
            "job": "Senior Editor",
            "img": "img/bg-img/t7.jpg"
         },
         {
            "name": "Steve Duncan",
            "job": "Senior Editor",
            "img": "img/bg-img/t8.jpg"
         }
      ]

      res.render('about', {
         'title': 'About us',
         "textForAbout": aboutText,
         "counter": aboutCounter,
         "aboutFromPictures": aboutPictures,
         "categories": categories
      });
   });



   app.get('/contact', async (req, res, next) => {

      let categories = await getCategories();

      res.render('contact', {
         'title': 'Kontakt',
         "formularAdress": adress,
         "categories": categories
      });
   });



   //  tilføjes i routes.js filen f.eks. lige under app.get('/contact') endpoint
   app.post('/contact', async (req, res, next) => {
      // indsamling af værdierne og oprettelse af de nødvendige variabler.
      let name = req.body.name;
      let email = req.body.email;
      let subject = req.body.subject;
      let message = req.body.message;
      let contactDate = new Date();

      // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
      let return_message = [];
      if (name == undefined || name == '') {
         return_message.push('Navn mangler');
      }
      if (email == undefined || email == '') {
         return_message.push('Email mangler');
      }
      if (subject == undefined || subject == '') {
         return_message.push('Emne mangler');
      }
      if (message == undefined || message == '') {
         return_message.push('Beskedteksten mangler');
      }

      // dette er et kort eksempel på strukturen, denne udvides selvfølgelig til noget mere brugbart
      // hvis der er 1 eller flere elementer i `return_message`, så mangler der noget
      if (return_message.length > 0) {
         // der er mindst 1 information der mangler, returner beskeden som en string.
         let categories = await getCategories(); // denne forklares lige om lidt!

         res.render('contact', {
            'title': 'Kontakt',
            "formularAdress": adress,
            'categories': categories,
            'return_message': return_message.join(', '),
            'values': req.body // læg mærke til vi "bare" sender req.body tilbage

         });

      } else {
         let db = await mysql.connect();
         let result = await db.execute(`
         INSERT INTO messages 
            (message_name, message_email, message_subject, message_text, message_date) 
         VALUES 
            (?,?,?,?,?)`, [name, email, subject, message, contactDate]);
         db.end();

         // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
         if (result[0].affectedRows > 0) {
            return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
         } else {
            return_message.push('Din besked blev ikke modtaget.... ');
         }

         let categories = await getCategories(); // denne har jeg ikke forklaret endnu! 
         res.render('contact', {
            'title': 'Kontakt',
            "formularAdress": adress,
            'categories': categories,
            'return_message': return_message.join(', '),
            'values': []
         });
      }
   });

};