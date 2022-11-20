// 验证模块
const Joi = require("joi");
// 用户模块
const { Comment } = require("../../../model/Comment");

module.exports = async (req, res) => {
	// 待修改评论id
	const id = req.params["id"];
	let comment = await Comment.findByIdAndUpdate(id, { $set: { state: req.fields.state } }, { new: true });
	// 响应
	res.send(comment);
};
