layui.define(function (exports) {
    var admin = (layui.$, layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin);
    window.LOGOUT = admin.events.logout = function () {
        admin.req({
            url: "/api/users/logout",
            type: "get",
            dataType: 'text',
            success: function (e) {
                admin.exit(function () {
                    location.href = "/user/login.html"
                })
            }
        })
    }, exports("common", {})
    // 刷新验证码
    layui.$('.captcha').click(function (e) {
        var target = layui.$(e.target)
        target.attr('src', '/tools/captcha?v=' + Date.now())
    })
});