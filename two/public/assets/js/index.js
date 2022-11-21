// 轮播图数据展示start
// 向服务器端发送请求， 索要轮播图数据
$.ajax({
	type: "get",
	url: "/slides",
	success: function (response) {
		var html = template("slideTpl", {
			data: response
		});
		$("#slidesBox").html(html);
		var htmlC = template("cursorTpl", {
			datas: response
		});
		$(".cursor").html(htmlC);

		var swiper = Swipe(document.querySelector(".swipe"), {
			auto: 3000,
			transitionEnd: function (index) {
				// index++;

				$(".cursor span").eq(index).addClass("active").siblings(".active").removeClass("active");
			}
		});

		// 上/下一张
		$(".swipe .arrow").on("click", function () {
			var _this = $(this);

			if (_this.is(".prev")) {
				swiper.prev();
			} else if (_this.is(".next")) {
				swiper.next();
			}
		});
	},
	error: function () {
		alert("获取轮播图列表失败");
	}
});
// 轮播图数据展示end
// 最新发布start
$.ajax({
	type: "get",
	url: "/posts/lasted",
	success: function (response) {
		var html = template("lastedTpl", {
			datas: response
		});
		$("#lastedBox").html(html);
	},
	error: function () {
		alert("获取最新发布的文章失败");
	}
});
// 最新发布end
