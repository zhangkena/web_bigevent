$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui中获取form对象
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })
    var layer = layui.layer;
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！请登录');
            $('#link_login').click();
            $('#form_reg [name=username]').val('');
            $('#form_reg [name=password]').val('');
            $('#form_reg [name=repassword]').val('');
        })
    })


    //监听登录表单提交事件
    $('#form_login').on('click', function (e) {
        e.preventDefault();
        $.post('/api/login', { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功！')
            //将登录成功后得到的token字符串保存到localStorage中
            localStorage.setItem('token', res.token);
            location.href = '/index.html';
        })
    })
})