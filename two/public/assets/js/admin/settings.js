// 网站设置start
// 获取到管理员选择到的图片
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
		},
		error: function () {
			alert("logo图片上传失败");
		}
	});
});
