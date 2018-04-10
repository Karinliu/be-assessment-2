/* eslint-disable semi */

var express = require('express')
var find = require('array-find')
var slug = require('slug')
var bodyParser = require('body-parser')
var multer = require('multer')
var mysql = require('mysql')
var argon2 = require('argon2')
var session = require('express-session')
var override = require('method-override')

require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect


var upload = multer({dest: 'static/upload/'})

express()
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))
  .use(express.static('static'))
  .use(bodyParser.urlencoded({extended: true}))
  .use('/image', express.static('./images'))
  .use('/image', express.static('./profilepic'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/profiles', profiles)
  .get('/login',loginForm)  ///login
  .post('/login', login)
  .get('/', index)
  .get('/makeprofile', makeprofileForm)
  .post('/makeprofile', makeprofile)
  .get('/:id', profile)
  .delete('/delete/:id',remove)
  .post('/delete/:id',remove)
  .get('/updateprofile',updateprofileForm)
  // .put('/updateprofile',updateprofile)
  .get('/logout', logout)
  .use(notFound)
  .listen(8000)

  function profiles(req, res, next) {
    connection.query('SELECT * FROM newprofile', done)

    function done(err, data) {
      if (err) {
        next(err)
      } else {
        res.render('list.ejs', {data: data, user: req.session.user
        })
      }
    }
  }

function profile(req, res, next) {
  var id = req.params.id
  connection.query('SELECT * FROM newprofile WHERE id = ?',
    id,
    detail
  )

  function detail(err, data) {
    if (err) {
      next(err)
    } else if (data.length === 0) {
      next()
    } else {
      res.render('detail.ejs', {data: data[0],
        user: req.session.user
      })
    }
  }
}

function index(req, res) {
  // req.url === '/'
  res.render('index.ejs',  {user: req.session.user
  });
 }

//Form will be load in to log in.
function loginForm(req, res) {
  res.render('login.ejs', {user: req.session.user
  });
 }

//When person is going to log in
 function login(req, res, next) {
  var email = req.body.email
  var password = req.body.password

//if email or password is not right.
  if (!email || !password) {
    res
      .status(400)
      .send('Gebruikersnaam of wachtwoord kloppen niet!')
    return
  }
//Search in table newprofile where the email is "..."
  connection.query('SELECT * FROM newprofile WHERE email = ?',
    email,
    done
  )

  function done(err, data) {
    var user = data && data[0]

    if (err) {
      next(err)
    } else if (user) {
      argon2 //verify the password if it is right.
        .verify(user.hash, password)
        .then(onverify, next)
    }
     else {
      res //email does not exist.
        .status(401)
        .send('Email bestaat niet!')
      }
    }
    function onverify(match) {
      //logged in!
      if (match) {
          req.session.user = {email: email.user}

          res.redirect('/')
      } else {
        res.status(401).send('Wachtwoord of email klopt niet')
      }
    }
  }


//error page will be loaded.
function notFound(req, res) {
  res.status(404).render('error.ejs', {user: req.session.user
  })
}

//CREATE PROFILE (render the page with the form.)
function makeprofileForm(req, res){
  res.render('makeprofile.ejs', {user: req.session.user
  })
}

//make profile
function makeprofile(req, res, next) {
  var email = req.body.email
  var password = req.body.password
  var name = req.body.name
  var place = req.body.place
  var gender = req.body.gender
  var choosegender = req.body.choosegender
  var description = req.body.description
  var animals = req.body.animals
  var travel = req.body.travel
  var drink = req.body.drink
  var food = req.body.food
  var family = req.body.family
  var movie = req.body.movie
  var smoke = req.body.smoke
  var sport = req.body.sport
  var birthday = req.body.birthday
  var characteristics = req.body.characteristics
  var profilepicture = req.body.profilepicture
  var min = 5
  var max = 20

  if (!email || !password) {
    res
      .status(400)
      .send('Je email of wachtwoord zijn niet goed ingevuld!')

    return
}

  if (password.length < min || password.length > max) {
    res
      .status(400)
      .send(
        'Wachtwoord moet tussen de ' + min +
        ' en de ' + max + ' karakters zijn'
      )
    return
  }
//Search if the email is already used.
  connection.query('SELECT * FROM newprofile WHERE email = ?',
    email,
    done
  )

  function done(err, data) {
    if (err) {
      next(err)
    } else if (data.length !== 0) {
      res.status(409).send('Email is al in gebruik.')
    } else {
      argon2.hash(password).then(onhash, next)
    }
    //Put into table.
    function onhash(hash) {
        connection.query('INSERT INTO newprofile SET ?', {
          email: email,
          hash: hash,
          gender:gender,
          choosegender:choosegender,
          description:description,
          name:name,
          place:place,
          birthday:birthday,
          characteristics:characteristics,
          profilepicture:profilepicture,
          animals:animals,
          travel:travel,
          drink:drink,
          food:food,
          family:family,
          movie:movie,
          smoke:smoke,
          sport:sport,
        }, oninsert)

        function oninsert(err) {
          if (err) {
          req.session.user = {email: email};
            next(err)
          } else {
            // Signed up!
            res.redirect('/')
          }
        }
      }
    }
}

//DELETE PROFILE
function remove (req, res, next) {
    var user = { id: req.params.id }

    connection.query('DELETE FROM newprofile WHERE id = ' + req.params.id, user, removed)
     function removed(err, result) {
            if (err) {
                // redirect to profiles list page
                res.redirect('/profiles')
            } else {
                // redirect to profiles list page
                res.redirect('/profiles')
            }
    }
}

// EDIT PROFILE
function updateprofileForm(req, res, next){
  if (req.session.user) {
        var user = req.session.user.email
        connection.query('SELECT * FROM newprofile WHERE email = ?', user, done)

        function done(err, data) {
            res.render('updateprofile.ejs', {
                data: data
            })
        }
    } else {
        res.redirect("/login");
    }
}


function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
}


//Bron push form: https://www.hacksparrow.com/form-handling-processing-in-express-js.html
//http://blog.chapagain.com.np/node-js-express-mysql-simple-add-edit-delete-view-crud/
