module.exports = (app) => {

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
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         }
      ]

      res.render('home',  {
         'title': 'Min Forside',
         'latestProducts': products,
         'bedsteIs': lækkerIs,
         "latestPost": post
      });
   });

   app.get('/categori', (req, res, next) => {

      let post = [
         {
            "img": "img/bg-img/19.jpg",
            "name": "FINANCE",
            "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         }
      ]

      res.render('categori',  {
         'title': 'Kategori',
         "latestPost": post
      });
   });

   app.get('/post', (req, res, next) => {
      
      let post = [
         {
            "img": "img/bg-img/19.jpg",
            "name": "FINANCE",
            "text": "1Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/20.jpg",
            "name": "POLITICS",
            "text": "2Sed a elit euismod augue semper congue sit amet ac sapien.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/21.jpg",
            "name": "HEALTH",
            "text": "3Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/22.jpg",
            "name": "FINANCE",
            "text": "4Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/23.jpg",
            "name": "TRAVEL",
            "text": "5Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
            "hour": "7:00",
            "date": 14
         },
         {
            "img": "img/bg-img/24.jpg",
            "name": "POLITICS",
            "text": "6Augue semper congue sit amet ac sapien. Fusce consequat.",
            "hour": "7:00",
            "date": 14
         }
      ]

      res.render('post',  {   
         'title': 'Article',
         "latestPost": post
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