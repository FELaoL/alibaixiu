// 验证模块
const Joi = require("joi");
// 分类模块
const { Category } = require("../../../model/Category");
// 文章模块
const { Post } = require("../../../model/Post");

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params["id"];
	// 如果id中存在-
	if (id.indexOf("-") != -1) {
		// 批量删除
		// 将字符串id分割为数组
		const ids = id.split("-");
		// 存储结果数组
		const result = [];
		for (const item of ids) {
			// 删除用户
			let category = await Category.findByIdAndDelete(item);
			// 将删除的用户存储在数组中
			result.push(category);
		}
		// 响应
		res.send(result);
	} else {
		// 单个删除
		// 删除分类
		let category = await Category.findByIdAndDelete(id);
		// 删除分类下面的文章
		let post = await Post.deleteMany({ category: id });
		// 响应
		res.send(category);
	}
};
