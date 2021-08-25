//在发起Ajax请求之前，会先调用ajaxPrefilter函数，在这个函数中，统一拼接请求的根路径
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})