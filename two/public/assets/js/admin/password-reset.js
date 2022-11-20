// 修改密码 start
// 当修改密码表单发生提价行为的时候
$("#modifyForm").on("submit", function () {
	var formData = $(this).serialize();
	$.ajax({
		type: "put",
		url: "/users/password",
		data: formData,
		success: function () {
			location.href = "/admin/login.html";
		},
		error: function () {
			alert("密码修改失败");
		}
	});
	// 阻止表单默认提交的行为
	return false;
});
// 修改密码end
