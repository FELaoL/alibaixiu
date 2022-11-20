// 验证模块
const Joi = require("joi");
// 用户模块
const { User } = require("../../../model/User");
// 文件模块
const fs = require("fs");
// 路径处理
const path = require("path");
// 方法改造
const { promisify } = require("util");
// 删除文件
const unlink = promisify(fs.unlink);

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
			let user = await User.findByIdAndDelete(item);
			// 将删除的用户存储在数组中
			result.push(user);
			// 如果缩略图存在
			if (user.avatar) {
				// 删除缩略图
				await unlink(path.join(__dirname, "../", "../", "../", "public", user.avatar));
			}
		}
		// 响应
		res.send(result);
	} else {
		// 单个删除
		// 删除用户
		let user = await User.findByIdAndDelete(id);
		// 如果缩略图存在
		if (user.avatar) {
			// 删除缩略图
			await unlink(path.join(__dirname, "../", "../", "../", "public", user.avatar));
		}
		// 响应
		res.send(user);
	}
};
