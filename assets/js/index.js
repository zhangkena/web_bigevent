$(function () {
    // 获取用户信息
    getUserInfo();

    $('#exit').on('click', function () {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 先清空本地存储的token，然后跳转到登录页面
            localStorage.removeItem('token');
            location.href = '/login.html';

            // 关闭询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        },
        complete: function (res) {
            /*  //console.log('执行了回调');
             console.log(res);
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 //强制清空token，并跳转至首页
                 localStorage.removeItem('token');
                 location.href = '/login.html';
 
             } */
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#wel').html('欢迎&nbsp;&nbsp;' + user.username);
    if (user.user_pic !== null) {
        //有头像
        $('.avatar').attr('src', user.user_pic).show();
        $('.zimu').hide();
    } else {
        $('.avatar').hide();
        var first = name[0].toUpperCase();
        $('.zimu').html(first).show();
    }
}

