const User = require('./../../models/user')

exports.saveUser = async user => {
    const newUser = new User(user)
    return await newUser.save()
}

exports.findByKey = async key => await User.findOne({ key })

exports.findById = async _id => await User.findById(_id)

exports.updateToken = async (query, token) => await User.updateOne(query, { token })

exports.list = async (query = {}) => await User.find(query, 'key _id')
