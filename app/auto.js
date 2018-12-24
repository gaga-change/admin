const MenuSchema = require('./menu/menuSchema')

/** 自动路由绑定 */
module.exports = (opt) => {
    opt.type = opt.type || 'api'
    // let menu = new MenuSchema(opt)

    return async (ctx, next) => {
        let d = Date.now()
        await MenuSchema.updateOne(opt, {
            $inc: {
                num: 1
            }
        }, {
            upsert: true
        })
        console.log('menu-save-time:',  Date.now() - d + 'ms')
        await next()        
    }
}