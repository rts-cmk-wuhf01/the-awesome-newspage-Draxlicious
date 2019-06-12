const mysql = require('../config/mysql')

module.exports = (app) => {

   app.get('/database',  async (req,res,next)=>{
      let db = await mysql.connect();
      // udfør en (eller flere) forespørgel(er)
      let [products] = await db.execute('SELECT * FROM products');
      // afslut forbindelsen til databasen
      db.end();

      // res.send(products);

      res.render('products', {
         'products': products
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
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'February 11, 2018',
            "img": "img/bg-img/7.jpg"
         },
         {
            "number": 1,
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'February 11, 2018',
            "img": "img/bg-img/8.jpg"
         },
         {
            "number": 1,
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'February 11, 2018',
            "img": "img/bg-img/9.jpg"
         },
         {
            "number": 1,
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'February 11, 2018',
            "img": "img/bg-img/10.jpg"
         },
         {
            "number": 1,
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'February 11, 2018',
            "img": "img/bg-img/11.jpg"
         },
      ]

      const news = [
         {
            "number": 1,
            "text":  "Amet, consectetur adipiscing elit. Nam eu metus sit amet odio sodales.",
            "dateTime": 'APRIL 14, 2019'
         },
         {
            "number": 2,
            "text":  " Consectetur adipiscing elit. Nam eu metus sit amet odio sodales placer.",
            "dateTime": 'APRIL 14, 2019'
         },
         {
            "number": 3,
            "text":  " Adipiscing elit. Nam eu metus sit amet odio sodales placer. Sed varius leo.",
            "dateTime": 'APRIL 14, 2019'
         },
         {
            "number": 4,
            "text":  " Eu metus sit amet odio sodales placer. Sed varius leo ac...",
            "dateTime": 'APRIL 14, 2019'
         },
      ]

   app.get('/', async (req, res, next) => {
      let db = await mysql.connect();
      let [categories] = await db.execute(`
      SELECT *
      FROM categories
      `);
      
      let [latestPostWidget] = await db.execute(`
      SELECT article_id, image_name, article_title, article_date, category_title, category_id
      FROM article
      INNER JOIN images ON image_id = fk_article_image_id
      INNER JOIN categories ON category_id = fk_article_category_id
      ORDER BY article_date DESC
      LIMIT 6
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

      res.render('home',  {
         'title': 'Min Forside',
         'latestProducts': products,
         'bedsteIs': lækkerIs,
         "latestPost": post,
         "latestNews": news,
         "editorsPost": editors,
         "worldNews": worldnews,
         "categories": categories,
         "latestPostWidget": latestPostWidget
      });   
   });

   app.get('/categori/:category_id', async (req, res, next) => {
      let db = await mysql.connect();
      
      let [articles] = await db.execute(`
      SELECT *
      FROM article 
      WHERE fk_article_category_id = ?`, [req.params.category_id]);

      // Navigation menu
      let [categories] = await db.execute(`
      SELECT *
      FROM categories
      `);
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
      
      res.render('categori',  {
         'title': 'Kategori',
         "latestPost": post,
         "latestComment": comment,
         "latestNews": news,
         "articles": articles,
         "categories": categories

      });
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

   app.get('/post', async (req, res, next) => {
      let db = await mysql.connect();
      // Navigation menu
      let [categories] = await db.execute(`
      SELECT *
      FROM categories
      `);
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
            "img": "img/bg-img/29.jpg"
         },
         {
            "name": "Janni Smith",
            "job": "Enough space for a whole line. I am a Web-designer",
            "img": "img/bg-img/30.jpg"
         },
         {
            "name": "Kirsten Smith",
            "job": " Enough space for a whole line. I am a Medie-grafiker",
            "img": "img/bg-img/31.jpg"
         },
         {
            "name": "Oliver Smith",
            "job": "Enough space for a whole line. I am a Nimbus 2000",
            "img": "img/bg-img/32.jpg"
         }
      ]
      
      let liveComment = [
         {
            "name": "Børge Hemming",
            "img": "img/bg-img/30.jpg",
            "time": "April 15, 2018 06:34"
         },
         {
            "name": "Biver Demming",
            "img": "img/bg-img/31.jpg",
            "time": "April 15, 2018 06:35"
         },
         {
            "name": "Buller flemming",
            "img": "img/bg-img/32.jpg",
            "time": "April 15, 2018 06:36"
         },
      ]

      res.render('post',  {   
         'title': 'Article',
         "latestPost": post,
         "latestComment": comment,
         "latestNews": news,
         "commentArea": liveComment,
         "categories": categories
      });
   });

   app.get('/about', async (req, res, next) => {
      let db = await mysql.connect();
      // Navigation menu
      let [categories] = await db.execute(`
      SELECT *
      FROM categories
      `);
      db.end();
      
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

      res.render('about',  {
         'title': 'About us',
         "textForAbout": aboutText,
         "counter": aboutCounter,
         "aboutFromPictures": aboutPictures,
         "categories": categories
      });
   });
   


   app.get('/contact', async (req, res, next) => {
      let db = await mysql.connect();
      // Navigation menu
      let [categories] = await db.execute(`
      SELECT *
      FROM categories
      `);
      db.end();

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

      res.render('contact',  {
         'title': 'Kontakt',
         "formularAdress": adress,
         "categories": categories
      });
   });

};