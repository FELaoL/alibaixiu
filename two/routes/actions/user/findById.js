// 验证模块
const Joi = require("joi");
// 用户模块
const { User } = require("../../../model/User");

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params["id"];
	// 查询用户信息
	const user = await User.findById(id).select("-password");
	// 响应
	return res.send(user);
};
