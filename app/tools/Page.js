/**
 * 分页器
 */

function Page(obj) {
    this.page = obj.page || 1
    this.pageSize = obj.pageSize || 20
}

module.exports = Page