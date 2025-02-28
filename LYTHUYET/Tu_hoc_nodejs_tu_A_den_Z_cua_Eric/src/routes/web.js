const express = require('express');
const { getHomepage, getHoang } = require('../controllers/homeController')
const router = express.Router();

// router.Method('/route', handler)
// file nay chi goi toi cac routes trong file homeController
router.get('/', getHomepage);

router.get('/hoang', getHoang);

router.get('/hocnodejscoban', (req, res) => {
    // res.send('<h1>Học code cơ bản với Hoàng</h1>')
    res.render('sample.ejs')
});

module.exports = router; // export default