// 添加用户start
$("#userForm").on("submit", function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: "post",
		url: "/users",
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert("用户添加失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 添加用户end

// 用户头像上传start
// 当用户选择文件的时候
$("#modifyBox").on("change", "#avatar", function () {
	var formdata = new FormData();
	// 用户选择到的文件
	formdata.append("avatar", this.files[0]);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formdata,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数类型
		contentType: false,
		success: function (response) {
			// 实现头像预览功能
			$("#preview").attr("src", response[0].avatar);
			$("#hiddenAvatar").val(response[0].avatar);
		},
		error: function () {
			alert("头像上传失败");
		}
	});
});
// 用户头像上传end

// 展示用户列表start
// 向服务器端发送请求，索要用户列表数据
$.ajax({
	type: "get",
	url: "/users",
	success: function (response) {
		// 使用模板引擎将数据和HTML字符串进行拼接
		var html = template("userTpl", {
			data: response
		});
		// 将拼接好的字符串显示在页面中
		$("#userBox").html(html);
	},
	error: function () {
		alert("获取用户列表失败");
	}
});
// 展示用户列表end

// 用户信息展示start
// 通过事件委托的方式为编辑按钮添加点击事件
$("#userBox").on("click", ".edit", function () {
	// 获取被点击用户的id的值
	var id = $(this).attr("data-id");
	// 根据id获取用户的详细信息
	$.ajax({
		type: "get",
		url: "/users/" + id,
		success: function (response) {
			var html = template("modifyTpl", response);
			$("#modifyBox").html(html);
		},
		error: function () {
			alert("查询用户信息失败");
		}
	});
});
// 用户信息展示end

// 用户信息修改start
$("#modifyBox").on("submit", "#modifyForm", function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr("data-id");
	// 发送请求，修改用户信息
	$.ajax({
		type: "put",
		url: "/users/" + id,
		data: formData,
		success: function (response) {
			// 修改用户信息成功，重新加载页面
			location.reload();
		},
		error: function () {
			alert("用户更新失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 用户信息修改end
