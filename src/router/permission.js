import Layout from '@/pages/layout/index.vue';
// 处理router 公共参数
/** [{ 
  *   component :  "Layout"
      createTime : "2021-06-21 08:39:21"
      creatorId :  "689608538980989440"
      deletedFlag :  0
      hidden :  null
      httpMethod :  ""
      httpMethodName :  null
      icon :  "el-icon-tickets"
      id :  "689610089464183296"
      isWord :  false
      keepAlive :  false
      name :  "日志"
      parentId :  "0"
      permitUrl :  ""
      redirect :  "/log/logQuery"
      routeName :  "log"
      routeUrl :  "/log"
      sortNo :  1
      tenantId :  1
      treePath :  "0001"
      type :  "catalog"
      typeName :  null
      updateTime :  "2021-06-21 08:39:21"
      updaterId :  "689608538980989440"
      visibleFlag :  true
    }]
 */
function handleRouter(element) {
  let { name, keepAlive, icon, routeName, routeUrl, visibleFlag, component, isWord } = element
  
  let modules = import.meta.glob('../pages/**/*/*.vue');
  element.component = (element.parentId === '0' || element.parentId === null) ? Layout : modules[`../pages${component}.vue`];
  element.path = routeUrl
  element.name = routeName
  element.hidden = !visibleFlag
  element.meta = {
    title: name,
    keepAlive: keepAlive,
    icon: icon ? icon : '',
    isWord: isWord
  }
  if(!element.meta.icon) delete element.meta.icon
  return element
}

//递归方法 生成权限菜单 tree 数据
export function generatorRouter(data) {
  data.forEach(element => {
    let parentId = element.parentId
    if (element.parentId === null || element.parentId == '0') {
      element.parentId = '0'
      handleRouter(element)
    } else {
      delete element.redirect // 删除非一级菜单的redirect
      data.forEach(item => {
        if (item.id == parentId) {
          //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!item.children) {
            item.children = []
          }
          handleRouter(element)
          item.children.push(element)
        }
      })
    }
  })
  data = data.filter(el => el.parentId === '0' || el.parentId === null) //这一步是过滤，按树展开，将多余的数组剔除
  data.push({
    path: '/:pathMatch(.*)',
    hidden: true, //不在slider显示
    component: () =>
      import('@/pages/404.vue'),
    meta: { keepalive: true },
    name: 'notfound'
  })
  return data
}