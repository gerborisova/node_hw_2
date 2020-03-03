

const _express = _interopRequireDefault(require('express'));

const _UserService = _interopRequireDefault(require('../services/UserService'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

const router = _express.default.Router(); //  GET suggested users


router.get('/', (req, res) => {
    const substring = req.query.loginSubstring || '';
    const limit = req.query.limit || 5;

    _UserService.default.getSuggestedUsers(substring, limit).then((result) => {
        res.send(result);
    });
});
module.exports = router;
