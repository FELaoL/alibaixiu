// 图片轮播数据添加start
// 当管理员选择文件的时候
$("#file").on("change", function () {
	// 用户选择到的文件
	var file = this.files[0];
	// 创建formData对象实现二进制文件上传
	var formData = new FormData();
	// 将管理员选择到的文件添加到formData对象中
	formData.append("image", file);
	// 向服务器端发送请求实现图片上传
	$.ajax({
		url: "/upload",
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			$("#image").val(response[0].image);
		},
		error: function () {
			alert("轮播图图片上传失败");
		}
	});
});
// 当轮播图表单发生提交行为的时候
$("#slidesForm").on("submit", function () {
	// 获取管理员在表单中输入的内容
	const formData = $(this).serialize();
	// 向服务器端发送请求 添加轮播图数据
	$.ajax({
		type: "post",
		url: "/slides",
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert("添加轮播图失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 图片轮播数据添加end
