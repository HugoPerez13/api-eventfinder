const jwt = require("jsonwebtoken");

class JwtControl {
    static generate(id, alias) {
        return jwt.sign({ id, alias }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

    static verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = JwtControl;