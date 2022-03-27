const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getAllComments,
	getComment,
	createComment,
	editComment,
	deleteComment,
} = require('../controllers/comments');

router.route('/').post(createComment).get(getAllComments);
router
	.route('/:commentID')
	.get(getComment)
	.patch(editComment)
	.delete(deleteComment);

module.exports = router;
