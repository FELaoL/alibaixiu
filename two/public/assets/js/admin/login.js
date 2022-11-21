// 登录功能start
// 选择登录按钮并为其添加点击事件
$("#loginBtn").on("click", function () {
	// 获取用户输入的邮箱地址
	var email = $("#email").val();
	// 获取用户输入的密码
	var password = $("#password").val();
	// 判断用户是否输入了邮箱地址
	if (email.trim().length === 0) {
		alert("请输入邮箱");
		return;
	}
	// 判断用户是否输入了密码
	if (password.trim().length === 0) {
		alert("请输入密码");
		return;
	}
	$.ajax({
		type: "post",
		url: "/login",
		data: {
			email,
			password
		},
		success: function (response) {
			// 对用户的角色进行判断
			// 如果是管理员就跳转到数据管理的首页面
			// 如果是普通用户，就跳转到网站的首页面
			// 登录成功，跳转到数据管理的首页面
			if (response.role === "admin") {
				location.href = "/admin/index.html";
			} else {
				location.href = "/index.html";
			}
		},
		error: function () {
			// 登录失败
			alert("用户名或者密码错误");
		}
	});
	return false;
});
// 登录功能end
