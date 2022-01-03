const router = require('express').Router();
const {addComment, addReply, removeComment, removeReply} = require('../../controllers/comment-controller');

// Set up POST at api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);

// Set up UPDATE and DELETE at /api/comments/:pizzaId/:commentId
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

// Set up DELETE at /api/comments/:pizzaId/:commentId/:replyId
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
