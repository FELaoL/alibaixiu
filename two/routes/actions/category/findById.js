// 验证模块
const Joi = require("joi");
// 分类模型
const { Category } = require("../../../model/Category");

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params["id"];
	// 查询用户信息
	const category = await Category.findById(id);
	// 响应
	return res.send(category);
};
