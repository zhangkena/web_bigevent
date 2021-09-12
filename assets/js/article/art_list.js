$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 时间格式化
    template.defaults.imports.dateFormat = function (date) {
        const d = new Date();
        var y = d.getFullYear();
        var m = addZero(d.getMonth() + 1);
        var dd = addZero(d.getDate());

        var hh = addZero(d.getHours());
        var mm = addZero(d.getMinutes());
        var ss = addZero(d.getSeconds());

        return y + '-' + m + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;

    }

    // 定义补零函数
    function addZero(data) {
        return data > 9 ? data : '0' + data;
    }

    // 定义发送请求要用的参数
    var p = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示条数
        cate_id: '',//文章分类的id
        state: ''//文章状态
    }

    //获取文章列表数据，渲染表格
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderFenye(res.total);
            }
        })
    }
    initCate();
    initTable();



    //初始化分类下拉菜单
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr);
                form.render();

            }
        })
    }

    //筛选按钮提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        p.cate_id = cate;
        p.state = state;
        initTable();
    })

    // 定义渲染分页的方法
    function renderFenye(d) {
        // console.log(d);


        //执行一个laypage实例
        laypage.render({
            elem: 'fenye',
            count: d, //数据总数
            limit: p.pagesize,
            curr: p.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {//分页发生切换调用
                // console.log(obj.curr);
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }

            }

        });
    }


})