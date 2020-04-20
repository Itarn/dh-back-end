const router = require('koa-router')()
const { query } = require('../utils/aync-db')
const { QUERY_TABLE, QUERY_TABLE_WHERE, INSERT_TABLE, UPDATE_TABLE } = require('../utils/sql')

router.prefix('/admin')

router.post('/page/list', async (ctx, next) => {
  const data = await query(QUERY_TABLE('pagelist'))
  ctx.body = {
    code: 0,
    data: {
      list: data
    }
  }
})

router.post('/page/detail', async (ctx, next) => {
  const id = ctx.request.body.id

  const data = await query(QUERY_TABLE_WHERE('pagelist', { key: 'id', val: id }))
  ctx.body = {
    code: 0,
    data: data[0]
  }
})

router.post('/page/update', async (ctx, next) => {
  const id = ctx.request.body.id
  const modules = ctx.request.body.modules
  await query(UPDATE_TABLE('pagelist', { primaryKey: 'id', primaryVal: id }, { key: 'modules', val: `'${modules}'` }))
  ctx.body = {
    code: 0
  }
})

router.post('/page/add', async (ctx, next) => {
  // console.log('ctx:::', ctx)
  // console.log('ctx.request.body:::', ctx.request.body)
  // console.log('ctx.params:::', ctx.params)
  await query(INSERT_TABLE('pagelist', { key: '' }))
  ctx.body = {
    code: 0
  }
})

// router.get('/bar', async function (ctx, next) {
//   const data = await query(QUERY_TABLE('websites'))
//   ctx.body = {
//     code: 0,
//     data
//   }
// })

module.exports = router
