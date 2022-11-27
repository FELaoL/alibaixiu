// -------------------处理日期时间格式-----------------------------------------------
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
// -------------------从浏览器的地址栏中获取查询参数-------------------------------------------
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split("&");
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split("=");
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}
// -----------------------------------------------------------------------------------------------------
