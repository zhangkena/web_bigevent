//在发起Ajax请求之前，会先调用ajaxPrefilter函数，在这个函数中，统一拼接请求的根路径
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //给有权限的接口统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //给全局的Ajax请求挂在complete函数
    options.complete = function (res) {
        //console.log('执行了回调');
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token，并跳转至首页
            localStorage.removeItem('token');
            location.href = '/login.html';

        }
    }
})