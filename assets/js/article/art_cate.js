$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl', res);
                $('tbody').html(htmlStr);

            }
        })
    }
    initArtCateList();


    var addIndex = null;
    //给添加类别按钮绑定点击事件
    $('#addCate').on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })

    })

    // 通过代理给 确认添加 按钮绑定提交事件 因为弹出层是通过js添加的，需要用代理
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //根据索引关闭弹出层
                layer.close(addIndex);
                initArtCateList();
            }
        })
    })

    //为编辑按钮绑定事件
    var editIndex = null;
    $('tbody').on('click', '#edit', function () {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        })

        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data);
            }
        })
    })

    // 通过代理，为 确认修改 按钮绑定事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //根据索引关闭弹出层
                layer.close(editIndex);
                initArtCateList();
            }
        })
    })

    //通过代理为删除按钮绑定点击事件
    $('tbody').on('click', '#del', function () {
        var id = $(this).attr('data-id');
        // console.log('ok');
        console.log(id);
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    initArtCateList();
                }
            })

            layer.close(index);
        });
    })

})