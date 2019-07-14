const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        user_details: {
            name: 'Somebody', 
            hobbies: 'Cricket, Reading', 
            private_data: 'Cant access without logging in',
        }
    })
});

module.exports = router;