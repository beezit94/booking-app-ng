const User = require('../models/user.model');
var validator = require('email-validator');
const { normalizeErrors } = require('../helpers/mpngoose');
var bcryptjs = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let fetchedUser;
  if (!password || !email) {
    return res.status(422).send({
      errors: [{ title: 'Data Missing', detail: 'Provide email and passowrd' }]
    });
  }

  User.findOne({ email }, (err, user) => {
    fetchedUser = user;
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [{ title: 'Invalid user', detail: 'User doesnot exist' }]
      });
    }
    return bcryptjs.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(403).send({
          errors: [
            {
              title: 'Invalid Credentials',
              detail: 'Wrong Email or Password'
            }
          ]
        });
      }
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.JWT_SECRET,
        { expiresIn: '1hr' }
      );
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user.id
      });
    });
  });
};

module.exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  validEmail = validator.validate(email);

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: 'Data missing!', detail: 'Provide email and password!' }
      ]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid passsword!',
          detail: 'Password is not a same as confirmation!'
        }
      ]
    });
  }

  if (!validEmail) {
    return res.status(422).send({
      errors: [{ title: 'Invalid email', detail: 'Enter a valid email!!' }]
    });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid email!',
            detail: 'User with this email already exist!'
          }
        ]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json({ registered: true });
    });
  });
};

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      { title: 'Not authorized!', detail: 'You need to login to get access!' }
    ]
  });
  // try {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const decodedToken = jwt.verify(token, config.JWT_SECRET);
  //   req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: 'You are not authenticated!' });
  // }
}
