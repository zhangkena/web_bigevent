$(function () {
    var layer = layui.layer;
    var form = layui.form;

    // 初始化富文本编辑器
    initEditor();


    //获取文章类别
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl_cate', res);
                $('[name=cate_id]').html(htmlStr);
                // 一定要调用form.render方法(因为这些选项是动态添加进去的，为了让layui监听到变化，需要调用form.render)
                form.render()
            }
        })
    }
    initCate();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#selFengmian').on('click', function () {
        $('#coverFile').click();
    })

    $('#coverFile').on('change', function (e) {
        // console.log(e); 
        var file = e.target.files[0];
        if (file.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //定义文章的发布状态
    var art_state = '已发布';
    $('#btnSave2').on('click', function () {
        art_state = '草稿';
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 基于form表单快速创建FormData对象
        var fd = new FormData($(this)[0]);

        fd.append('state', art_state);

        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publisherArt(fd);

            })
    })

    function publisherArt(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 如果向服务器提交的是FormData格式的数据，需要添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 发布成功后，跳转到文章列表页面
                location.href = '/article/art_list.html';

            }
        })
    }



})