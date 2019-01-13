/**
 * 分页器
 */

function Page(obj) {
    this.page = parseInt(obj.page) || 1
    this.pageSize = parseInt(obj.pageSize) || 20
}

module.exports = Page