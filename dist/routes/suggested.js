

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _UserService = require('../services/UserService');

const _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const router = _express2.default.Router();

//  GET suggested users

router.get('/', (req, res) => {
    const substring = req.query.loginSubstring || '';
    const limit = req.query.limit || 5;
    _UserService2.default.getSuggestedUsers(substring, limit).then((result) => {
        res.send(result);
    });
});

module.exports = router;
