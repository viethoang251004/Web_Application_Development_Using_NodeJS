
const getHomepage = (req, res) => {
    res.send('Hello world with nodemon!')
}

const getHoang = (req, res) => {
    res.send('Hello everybody!')
}

module.exports = {
    getHomepage
}