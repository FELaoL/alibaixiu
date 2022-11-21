// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
// 热门推荐start
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
	}
});
// 热门推荐end
// 随机推荐start
// 向服务器端发送请求，索要随机推荐数据
$.ajax({
	url: "/posts/random",
	type: "GET",
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
// 随机推荐end

// 最新评论start
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
                <img src="{{$value.author.avatar}}" alt="">
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
// 最新评论end

// 菜单start
// 向服务器端发送请求，索要文章分类列表数据
$.ajax({
	url: "/categories",
	type: "GET",
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
// 菜单end
