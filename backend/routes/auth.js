const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Posts = require('../models/Posts');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

router.post('/addpost', verifyToken, (req, res, next) => {
  console.log('testing if this shit works')
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log(authData)
      res.status(403).json(err);
    } else {
      let post = req.body;
      post.userID = authData.user._id
      Posts.create(post).then((WereAddingApost) => {
        res.json({ WereAddingApost });
      });
    }
  })
})


router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => {
      jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
        req.login(user, function (err, result) {
          res.status(201).json({ ...user._doc, token })
        })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    });
});


router.get('/user', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      console.log(authData.user, 'yolo')
      User.findById(authData.user._id).then(user => {
        res.status(200).json(user)
      }).catch(err => res.status(500).json(err))

    }
  });
});


router.get('/newpost', (req, res) => {
  res.render('/newpost')

})

router.get('/getposts', (req, res) => {
  console.log(req.query)
  let query = JSON.parse(req.query['0'])
  console.log(query)
  const {filter, projection, options} = query
  console.log(filter)
  console.log(projection)
  console.log(options)
  Posts.find(filter, projection, options).populate("userID").sort({ date: -1 }).then(posts => {
    console.log(posts)
    res.status(200).json({ posts })
  })
})


router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
    res.status(200).json({ ...user._doc, token });
  })
});


router.post("/showDetails", verifyToken, (req, res) => {
  console.log("From Line 95: ", req.body);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    // console.log("From Line 97: ", authData);
    if (err) {
      res.status(403).json(err);
    } else {
      Posts.findById(
        req.body.postId

      ).then((user) => {
        console.log(req.body.postId)
        console.log(user)
        res.json({ user });
      });
    }
  });
});








router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});





function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}



// Verify Token
function verifyToken(req, res, next) {
  console.log('verify')
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403)//.json({err:'not logged in'});
  }

}

// router.post('/addpost',(req, res, next) => {

// console.log("in add post", req.body)
// res.json({hello:false})

// })





module.exports = router;
