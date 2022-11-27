// ---------------文章封面图片上传----------------------------------
// 当管理员选择文件的时候，触发事件
$("#parentBox").on("change", "#feature", function () {
	// 获取到管理员选择到的文件
	var file = this.files[0];
	// 创建formData对象，实现二进制文件上传
	var formData = new FormData();
	// 将管理员选择到的文件追加到formData对象中
	formData.append("cover", file);
	// 实现文章封面图片上传
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数类型
		contentType: false,
		success: function (response) {
			$("#thumbnail").val(response[0].cover);
			$(".thumbnail").show().attr("src", response[0].cover);
		},
		error: function () {
			alert("文章封面上传失败");
		}
	});
});
// ------------------添加文章页面分类下拉选数据------------------------------
//  向服务器端发送请求，获取文章分类数据
$.ajax({
	type: "get",
	url: "/categories",
	success: function (response) {
		var html = template("categoryTpl", {
			data: response
		});
		$("#category").html(html);
	},
	error: function () {
		alert("获取分类数据失败");
	}
});
// ---------------------添加文章--------------------------------------
// 当添加文章表单提交的时候
$("#addForm").on("submit", function () {
	// 获取到管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求，实现添加文章功能
	$.ajax({
		type: "post",
		url: "/posts",
		data: formData,
		success: function () {
			// 文章添加成功，跳转到文章列表页面
			location.href = "/admin/posts.html";
		},
		error: function () {
			alert("创建文章失败");
		}
	});
	// 阻止表单默认提交的行为
	return false;
});
// -------------------显示编辑文章的信息--------------------------------
// 获取浏览器地址栏中的id参数
var id = getUrlParams("id");
if (id != -1) {
	// 根据id获取文章的详细信息
	$.ajax({
		type: "get",
		url: "/posts/" + id,
		success: function (response) {
			$.ajax({
				type: "get",
				url: "/categories",
				success: function (categories) {
					response.categories = categories;
					var html = template("modifyTpl", response);
					$("#parentBox").html(html);
					$(".thumbnail").show().attr("src", response.thumbnail);
				},
				error: function () {
					alert("获取分类数据失败");
				}
			});
		},
		error: function () {
			alert("获取文章详细信息失败");
		}
	});
}
// ----------------------文章编辑提交------------------------------------------
// 当修改文章信息表单发生提交行为的时候
$("#parentBox").on("submit", "#modifyForm", function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 获取管理员正在修改的文章id值
	var id = $(this).attr("data-id");
	$.ajax({
		type: "put",
		url: "/posts/" + id,
		data: formData,
		success: function () {
			location.href = "/admin/posts.html";
		},
		error: function () {
			alert("文章信息修改失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// ------------------------------------------------------------------------------------------
