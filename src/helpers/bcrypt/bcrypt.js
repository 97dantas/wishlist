const bcrypt = require('bcryptjs')

exports.generateHash = (data) => {
    const salt = bcrypt.genSaltSync(13)
    return bcrypt.hashSync(data, salt)
}

exports.compare = (password, hash) => bcrypt.compareSync(password, hash)
