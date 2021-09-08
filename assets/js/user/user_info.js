$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必需在1~6个字符之间！';
            }
        }
    })

    //获取用户信息
    getUserInfo();


    function getUserInfo() {
        //发起Ajax请求获取用户信息
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用form.val()给表单赋值
                layui.form.val('formUserInfo', res.data);
            }
        })
    }


    // 重置
    $('#btnReset').on('click', function (e) {
        //阻止重置直接清除表单数据
        e.preventDefault();
        getUserInfo()
    })

    //提交
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }
                layui.layer.msg('修改用户信息成功！')
                //调用父页面的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})
