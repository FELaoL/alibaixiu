// 退出登录start
$("#logout").on("click", function () {
	var isConfirm = confirm("您真的要退出吗？");
	if (isConfirm) {
		$.ajax({
			type: "post",
			url: "/logout",
			success: function () {
				location.href = "login.html";
			},
			error: function () {
				alert("退出失败");
			}
		});
	}
});
// 退出登录end
// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
// 展示登录用户信息start
// 向服务器发送请求，索要的登录用户信息
$.ajax({
	url: "/users/" + userId,
	type: "get",
	success: function (response) {
		$(".profile .name").html(response.nickName);
		if (response.avatar) {
			$(".profile .avatar").attr("src", response.avatar);
		}
	},
	error: function () {
		alert("获取登录用户信息失败");
	}
});
// 展示登录用户信息end
