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
    'addresslist',
    'upgrade',
    'delete',
    'outlay',
    'outregistration',
    'homepage',
    'chronicle'
  ]
}

// 招新管理
const recruitment: FileType = {
  fileName: 'RecruitmentList',
  path: 'recruitment',
  icon: 'smile',
  children: [
    'square', // 招新广场
    'setting', // 招新设置
    'admin', // 招新管理
    // 'statistic', // 招新统计
  ]
}

// 活动管理
const active: FileType = {
  fileName: 'ActiveList',
  path: 'active',
  icon: 'contacts',
  children: [
    'square', // 活动广场
    'admin',
    'approval'
  ]
}

// 社团指导
const guideData: FileType = {
  fileName: 'GuideList',
  path: 'guide',
  icon: 'solution',
  children: [
    'registerapproval',
    'memberlist',
    'recruitmentapproval',
    'studentleader',
    'uplevel',
    'logoutapproval',
    'outsideapproval',
    'outlayapproval',
    'annual',
  ]
}

// 指导老师管理
const teacherData: FileType = {
  fileName: 'TeacherList',
  path: 'teacher',
  icon: 'form',
  children: [
    'store',
    'list',
    'examine'
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
    'userGroup',
    'punish',
    'message'
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
      // 招新管理 router
      CreateRouter(recruitment),
      // 活动管理 router
      CreateRouter(active),
      // 社团指导 router
      CreateRouter(guideData),
      // 指导老师管理 router
      CreateRouter(teacherData),
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
