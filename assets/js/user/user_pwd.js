$(function () {
    var form = layui.form;

    // 定义密码验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        }, repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致！';
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                /* if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                } */
                layui.layer.msg(res.message);
                //重置表单(中括号零的方式将一个jQuery对象转化为一个dom对象)
                $('.layui-form')[0].reset();
            }
        })
    })
})