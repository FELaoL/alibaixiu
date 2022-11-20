// 验证模块
const Joi = require("joi");
// 分类模块
const { Comment } = require("../../../model/Comment");

module.exports = async (req, res) => {
	// 获取评论id
	const id = req.params["id"];
	// 删除分类
	let comment = await Comment.findByIdAndDelete(id);
	// 响应
	res.send(comment);
};
