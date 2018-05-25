module.exports = function(app, passport) {

  //home page w/ login links
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });


  //login
  //show login forms
  app.get('/login', function(req, res){
    //render the page and pass in any flash data if it exists
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  //process the login form
  //app.post('/login', doo passport stuff);


  //signup
  app.get('/signup', function(req, res){
    //render page, pass flash data
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });

  //process signup form
  //app.post('/signup', doo passport stuff);


  //profile section
  //use route middleware to verify this (isloggedin)
  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user //get the user out of session and pass  to template
    });
  });


  //logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //route middleware to make sure user is logged in
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();

    //if not redirect to home
    res.redirect('/');
  }

  app.post('/signup', passport.authenticate('local-signup',{
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));


  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));


}
