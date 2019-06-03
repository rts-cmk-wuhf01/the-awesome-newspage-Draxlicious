module.exports = (app) => {

      
   
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

   app.get('/', (req, res, next) => {

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
         "worldNews": worldnews
      });
   });

   app.get('/categori', (req, res, next) => {
      

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
         "latestNews": news
      });
   });

   app.get('/post', (req, res, next) => {
      
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
      
      res.render('post',  {   
         'title': 'Article',
         "latestPost": post,
         "latestComment": comment,
         "latestNews": news
      });
   });

   app.get('/about', (req, res, next) => {
      res.render('about',  {
         'title': 'About us'
      });
   });

   app.get('/contact', (req, res, next) => {
      res.render('contact',  {
         'title': 'Kontakt'
      });
   });

};