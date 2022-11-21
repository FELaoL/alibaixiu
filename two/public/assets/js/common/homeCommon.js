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
