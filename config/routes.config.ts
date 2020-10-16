// 路由规则

interface FileType {
  fileName: string
  path: string
  children: string[]
  icon: string
}

// 首页
const indexData: FileType = {
  fileName: 'IndexList',
  path: 'index',
  icon: 'home',
  children: []
}

// 社团管理
const associationData: FileType = {
  fileName: 'AssociationList',
  path: 'association',
  icon: 'windows',
  children: [
    'apply',
    'settings',
    'member',
    'recruitment',
    'upgrade',
    'delete',
    'dynamics',
    'active',
    'outlay',
    'outregistration',
    'homepage',
    'changeoffice']
}

// 社团指导
const guideData: FileType = {
  fileName: 'GuideList',
  path: 'guide',
  icon: 'solution',
  children: [
    'studentleader',
    'teacherleader',
    'list',
    'memberlist',
    'registerapproval',
    'uplevel',
    'logoutapproval',
    'outsideapproval',
    'outlayapproval',
    'activeapproval',
    'dynamicsapproval',
    'changeapproval'
  ]
}

// 考核管理
const examineData: FileType = {
  fileName: 'ExamineList',
  path: 'examine',
  icon: 'audit',
  children: [
    'association',
    'head',
    'teacher'
  ]
}

// 社团大数据
const bigdataData: FileType = {
  fileName: 'BigdataList',
  path: 'bigdata',
  icon: 'fund',
  children: []
}

// 系统设置
const settingData: FileType = {
  fileName: 'SettingList',
  path: 'setting',
  icon: 'setting',
  children: [
    'base',
    'control',
    'person',
    'userGroup'
  ]
}

function CreateRouter( fileData: FileType ) {
  const routes: any = {
    path: `/${fileData.path}`,
    name: `${fileData.path}`,
    icon: `${fileData.icon}`,
    component: `./${fileData.fileName}/index`
  }

  const childrenRoutes: any = {
    routes: []
  }

  if (fileData.children.length === 0) {
    return routes
  }

  childrenRoutes.routes = fileData.children.map((item: string, index: number) => {
    return (
      {
        path: `/${fileData.path}/${item}`,
        name: `${item}`,
        component: `./${fileData.fileName}/${item}/${item}`,
      }
    )
  })

  return {...routes, ...childrenRoutes}

}

export default [{
  path: '/',
  // component: '../layouts/SecurityLayout',
  routes: [{
    path: '/',
    name: 'test',
    component: '../layouts/BasicLayout',
    // authority: ['admin', 'user'],
    routes: [{
        path: '/',
        redirect: '/index',
      },
      // 首页 router
      CreateRouter(indexData),
      // 社团管理 router
      CreateRouter(associationData),
      // 社团指导 router
      CreateRouter(guideData),
      // 考核管理 router
      CreateRouter(examineData),
      // 社团大数据 router
      CreateRouter(bigdataData),
      // 系统设置 router
      CreateRouter(settingData),
      {
        component: './404'
      }
    ]
  }]
}]
