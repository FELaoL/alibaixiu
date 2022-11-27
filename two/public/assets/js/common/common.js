// ------------------------------------------菜单或者文章分类数据--------------------------------------------------------------------
// 向服务器端发送请求，索要文章分类列表数据
$.ajax({
	type: "get",
	url: "/categories",
	success: function (response) {
		var navTpl = `
            {{each data}}
                <li><a href="/list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `;
		var html = template.render(navTpl, { data: response });
		$("#topNavBox").html(html);
		$("#navBox").html(html);
	},
	error: function () {
		alert("获取分类数据失败");
	}
});
// -------------------------------------随机推荐----------------------------------------------------------------------
// 向服务器端发送请求，索要随机推荐数据
$.ajax({
	type: "get",
	url: "/posts/random",
	success: function (response) {
		var randomTpl = `
            {{each data}}
            <li>
                <a href="/detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
                </a>
            </li>
            {{/each}}
        `;
		var html = template.render(randomTpl, { data: response });
		$("#randomBox").html(html);
	},
	error: function () {
		alert("获取随机推荐数据失败");
	}
});
// ------------------------------热门推荐数据展示----------------------------------------------------------------------
// 向服务器端发送请求，索要热门推荐数据
$.ajax({
	type: "get",
	url: "/posts/recommend",
	success: function (response) {
		// 为了讲模板变成公共的，所以将模板写在了js文件中
		var recommendTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <img src="{{$value.thumbnail}}" alt="" />
                    <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `;
		var html = template.render(recommendTpl, { data: response });
		// 将拼接好的热门推荐数据显示在了页面中
		$("#recomendBox").html(html);
	},
	error: function () {
		alert("获取热门推荐数据失败");
	}
});
// -----------------------------点赞操作--------------------------------------------------------
// 当点赞按钮发生点击事件时
$(".likeBox").on("click", ".like", function (e) {
	const id = $(this).attr("data-id");
	// 向服务器端发送请求，执行点赞操作
	$.ajax({
		type: "post",
		url: "/posts/fabulous/" + id,
		success: function () {
			alert("点赞成功，感谢您的支持！");
			location.reload();
		},
		error: function () {
			alert("点赞失败");
		}
	});
	return false;
});
// -----------------------搜索功能-------------------------------------
// 获取到搜索表单，并为其添加表单提交事件
$(".search form").on("submit", function () {
	// 获取到用户在表单中输入的搜索关键字
	var keys = $(this).find(".keys").val();
	// 跳转到搜索结果页面，并且将用户输入的搜索关键字传递到搜索结果页面
	location.href = "/list.html?key=" + keys;
	// 阻止表单默认提交行为
	return false;
});
// ------------------------最新评论-----------------------------------
// 向服务器端发送请求，索要最新评论数据
$.ajax({
	url: "/comments/lasted",
	type: "get",
	success: function (response) {
		var commentTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                    <div class="avatar">
                        {{if $value.author.avatar}}
                        <img src="{{$value.author.avatar}}" alt="" />
                        {{else}}
                        <img src="../assets/img/default.png" alt="" />
                        {{/if}}
                    </div>
                    <div class="txt">
                    <p>
                        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                    </div>
                </a>
            </li>  
            {{/each}}
        `;
		var html = template.render(commentTpl, {
			data: response
		});
		$("#commentBox").html(html);
	},
	error: function () {
		alert("获取最新评论失败");
	}
});
// ------------------------------------------------------------------------------
