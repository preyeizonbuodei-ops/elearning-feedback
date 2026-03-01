const bcrypt = require('bcrypt');

exports.DoHash = async (value, saltvalue) => {
    try {
        const hashed = await bcrypt.hash(value, saltvalue)
        return hashed;
    } catch (error) {
        console.log(error)
    }
}
