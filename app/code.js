module.exports = {

    /** 成功 */
    Success: 200,

    /** 创建成功，要返回数据  */
    Create: 201,

    /** 删除数据成功，但不返回数据 */
    NoContent: 204,

    /** 参数异常 */
    BadRequest: 400,

    /** 未被授权：认证信息不正确 */
    Unauthorized: 401,

    /** 禁止访问 */
    Forbidden: 403,

    /** 找不到数据 */
    NotFound: 404
}