module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home',  {
         'title': 'Min Forside'
      });
   });

   app.get('/categori', (req, res, next) => {
      res.render('categori',  {
         'title': 'Kategori'
      });
   });

   app.get('/post', (req, res, next) => {
      res.render('post',  {   
         'title': 'Article'
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