const User = require('../models/user')

exports.createUser = async (req, res) => {
  const user = new User(req.body)
  try {
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.status(201).send()
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.status(201).send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove()
    res.status(201).send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
}