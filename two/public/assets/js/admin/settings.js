// -----------------------显示网站设置数据------------------------------------
// 向服务器端发送请求，索要网站设置数据
$.ajax({
	type: "get",
	url: "/settings",
	success: function (response) {
		if (response) {
			// 将logo地址存储在隐藏域中
			$("#preview").attr("src", response.logo);
			// 将logo显示在页面中
			$("#hiddenLogo").val(response.logo);
			// 将网站标题显示在页面中
			$('input[name="title"]').val(response.title);
			// 将是否开启评论功能显示在页面中
			$('input[name="comment"]').prop("checked", response.comment);
			// 将评论是否经过人工审核显示在页面中
			$('input[name="review"]').prop("checked", response.review);
		}
	},
	error: function () {
		alert("获取网站设置失败");
	}
});
// 2. 判断服务器端返回的数据是否为真，如果为真，将数据展示在表单中
// ----------------------------网站设置文章上传------------------------------------------
// 当管理员选择logo图片时
$("#logo").on("change", function () {
	// 获取到管理员选择到的图片
	const file = this.files[0];
	// 创建formData对象，实现二进制文件上传
	const formData = new FormData();
	// 将管理员选择到的文件添加到formData对象中
	formData.append("logo", file);
	// 向服务器端发送请求，实现文件上传
	$.ajax({
		url: "/upload",
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			$("#hiddenLogo").val(response[0].logo);
			// 将logo图片显示在页面中
			$("#preview").attr("src", response[0].logo);
		},
		error: function () {
			alert("logo图片上传失败");
		}
	});
});
// -----------------------------------网站设置提交----------------------------------------------
// 当网站设置表单发生提交行为时
$("#settingsForm").on("submit", function () {
	// 获取到管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求，实现网站设置数据添加功能
	$.ajax({
		url: "/settings",
		type: "post",
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert("更新网站设置失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// --------------------------------------------------------------------------
