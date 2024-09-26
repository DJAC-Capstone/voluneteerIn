const router = require('express').Router();
const bcrypt = require('bcrypt')
const { User, Session } = require('../db');
const Events = require('../db/models/Events');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ include: [Events] });
    res.send(users);
  } catch (err) {
    next(err);
  }
});
router.get('/get-user', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.user.id, { include: [Events] })
      res.send(singleUser)
  }
  catch (err) {
      next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, { include: [Events] });
    if (!singleUser) {
      const error = new Error('USER NOT FOUND');
      error.status = 404;
      throw error;
    }
    res.status(200).send(singleUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
  const updatedUser = await User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    },
    { returning: true, where: { id: req.params.id} },
  );
  res.send(updatedUser);
} catch (err) {
  next(err);
}
});

router.delete('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);
    await singleUser.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


router.put('/follow/frined', async (req, res, next) => {
  try {
    const followedUser = await User.findByPk(req.body.id);
    const user=await followedUser.update({friends: req.body.arr });    
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { password, email, first_name, last_name,phone } = req.body
    const hashedPw = await bcrypt.hash(password, 10)
    const newUser = await User.create(
      {
        password: hashedPw,
        email,
        first_name,
        last_name,
        phone
      });
      const usersSession = await Session.findByPk(req.sid)
      await usersSession.setUser(newUser)
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
