// ----------------文章分类数据获取----------------------------
// 向服务器端发送请求，索要分类数据
$.ajax({
	type: "get",
	url: "/categories",
	success: function (response) {
		var html = template("categoryTpl", {
			data: response
		});
		$("#categoryBox").html(html);
	},
	error: function () {
		alert("获取分类数据失败");
	}
});
// ---------------------查询列表数据----------------------
var category = null;
var state = null;
let page = 1;
function queryPosts() {
	console.log(category, state, page);
	const params = {};
	if (category) {
		params.category = category;
	}
	if (state) {
		params.state = state;
	}
	if (page) {
		params.page = page;
	}
	// 向服务器端发送请求，获取文章列表数据
	$.ajax({
		url: "/posts",
		type: "get",
		data: params,
		success: function (response) {
			var html = template("postsTpl", response);
			$("#postsBox").html(html);
			var page = template("pageTpl", response);
			$("#page").html(page);
		},
		error: function () {
			alert("获取文章列表失败");
		}
	});
}
// ------------------页面第一次进入加载数据--------------------------------
queryPosts();
// -------------------筛选按钮点击加载数据---------------------------------------
// 当用户进行文章列表筛选的时候
$("#filterForm").on("submit", function () {
	// 获取到管理员选择的过滤条件
	const formData = $(this).serialize();
	// 向服务器端发送请求，获取文章列表数据
	const paramsArr = formData.split("&");
	for (var i = 0; i < paramsArr.length; i++) {
		const keyValue = paramsArr[i].split("=");
		if (keyValue[0] == "category") {
			category = keyValue[1];
		}
		if (keyValue[0] == "state") {
			state = keyValue[1];
		}
	}
	page = 1;
	queryPosts();
	// 阻止表单默认提交行为
	return false;
});
// -----------------页数变化时需要重新查询页面数据--------------------------
function changePage(val) {
	page = val;
	queryPosts();
}
// ------------------------删除文章操作-------------------------------
// 当删除按钮被点击的时候
$("#postsBox").on("click", ".delete", function () {
	// 弹窗确认框和管理员确认是否真的要进行删除操作
	if (confirm("您真的要进行删除操作吗？")) {
		// 获取管理员要删除的文章的id
		var id = $(this).attr("data-id");
		// 向服务器端发送请求，执行删除操作
		$.ajax({
			type: "delete",
			url: "/posts/" + id,
			success: function () {
				location.reload();
			},
			error: function () {
				alert("文章删除失败");
			}
		});
	}
});
// -----------------------------------------------------------------------
