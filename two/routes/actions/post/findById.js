// 验证模块
const Joi = require("joi");
// 用户模块
const { Post } = require("../../../model/Post");

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params["id"];
	// 查询文章信息
	const post = await Post.findOne({ _id: id }).populate("author category");
	// 增加文章阅读数量
	post.meta.views = post.meta.views + 1;
	// 保存
	await post.save();
	// 响应
	return res.send(post);
};
