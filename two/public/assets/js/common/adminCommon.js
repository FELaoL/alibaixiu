// ----------------退出登录------------------------------------
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
// --------------展示登录用户信息--------------------------------
// 向服务器发送请求，索要的登录用户信息
$.ajax({
	type: "get",
	url: "/users/" + userId,
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
// ---------------------------------------------------------------
