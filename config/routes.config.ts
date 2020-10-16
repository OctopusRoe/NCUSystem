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



      // {
      //   path: '/index',
      //   name: 'index',
      //   icon: 'home',
      //   component: './IndexList/index'
      // },
      // {
      //   path: '/association',
      //   name: 'association',
      //   icon: 'Windows',
      //   component: './AssociationList/index',
      //   routes: [
      //     {
      //       path: '/association/apply',  
      //       name: 'apply',
      //       component: './AssociationList/apply/apply'
      //     },
      //     {
      //       path: '/association/settings',
      //       name: 'settings',
      //       component: './AssociationList/settings/settings'
      //     },
      //     {
      //       path: '/association/member',
      //       name: 'member',
      //       component: './AssociationList/member/member'
      //     },
      //     {
      //       path: '/association/recruitment',
      //       name: 'recruitment',
      //       component: './AssociationList/recruitment/recruitment'
      //     },
      //     {
      //       path: '/association/upgrade',
      //       name: 'upgrade',
      //       component: './AssociationList/upgrade/upgrade'
      //     },
      //     {
      //       path: '/association/delete',
      //       name: 'delete',
      //       component: './AssociationList/delete/delete'
      //     },
      //     {
      //       path: '/association/dynamics',
      //       name: 'dynamics',
      //       component: './AssociationList/dynamics/dynamics'
      //     },
      //     {
      //       path: '/association/active',
      //       name: 'active',
      //       component: './AssociationList/active/active'
      //     },
      //     {
      //       path: '/association/outlay',
      //       name: 'outlay',
      //       component: './AssociationList/outlay/outlay'
      //     },
      //     {
      //       path: '/association/outregistration',
      //       name: 'outregistration',
      //       component: './AssociationList/outregistration/outregistration'
      //     },
      //     {
      //       path: '/association/homepage',
      //       name: 'homepage',
      //       component: './AssociationList/homepage/homepage'
      //     },
      //     {
      //       path: '/association/changeoffice',
      //       name: 'changeoffice',
      //       component: './AssociationList/changeoffice/changeoffice'
      //     }
      //   ]
      // },
      // {
      //   path: '/guide',
      //   name: 'guide',
      //   icon: 'solution',
      //   component: './GuideList/index',
      //   routes: [
      //     {
      //       path: '/guide/studentleader',
      //       name: 'studentleader',
      //       component: './GuideList/studentleader/studentleader'
      //     },
      //     {
      //       path: '/guide/teacherleader',
      //       name: 'teacherleader',
      //       component: './GuideList/teacherleader/teacherleader'
      //     },
      //     {
      //       path: '/guide/list',
      //       name: 'list',
      //       component: './GuideList/list/list'
      //     },
      //     {
      //       path: '/guide/memberlist',
      //       name: 'memberlist',
      //       component: './GuideList/memberlist/memberlist'
      //     },
      //     {
      //       path: '/guide/registerapproval',
      //       name: 'registerapproval',
      //       component: './GuideList/registerapproval/registerapproval'
      //     },
      //     {
      //       path: '/guide/uplevel',
      //       name: 'uplevel',
      //       component: './GuideList/uplevel/uplevel'
      //     },
      //     {
      //       path: '/guide/logoutapproval',
      //       name: 'logoutapproval',
      //       component: './GuideList/logoutapproval/logoutapproval'
      //     },
      //     {
      //       path: '/guide/outsideapproval',
      //       name: 'outsideapproval',
      //       component: './GuideList/outsideapproval/outsideapproval'
      //     },
      //     {
      //       path: '/guide/outlayapproval',
      //       name: 'outlayapproval',
      //       component: './GuideList/outlayapproval/outlayapproval'
      //     },
      //     {
      //       path: '/guide/activeapproval',
      //       name: 'activeapproval',
      //       component: './GuideList/activeapproval/activeapproval'
      //     },
      //     {
      //       path: '/guide/dynamicsapproval',
      //       name: 'dynamicsapproval',
      //       component: './GuideList/dynamicsapproval/dynamicsapproval'
      //     },
      //     {
      //       path: '/guide/changeapproval',
      //       name: 'changeapproval',
      //       component: './GuideList/changeapproval/changeapproval'
      //     }
      //   ]
      // },
      // {
      //   path: '/examine',
      //   name: 'examine',
      //   icon: 'audit',
      //   component: './ExamineList/index',
      //   routes: [
      //     {
      //       path: '/examine/association',
      //       name: 'association',
      //       component: './ExamineList/association/association'
      //     },
      //     {
      //       path: '/examine/head',
      //       name: 'head',
      //       component: './ExamineList/head/head'

      //     },
      //     {
      //       path: '/examine/teacher',
      //       name: 'teacher',
      //       component: './ExamineList/teacher/teacher'
      //     }
      //   ]
      // },
      // {
      //   path: '/bigdata',
      //   name: 'bigdata',
      //   icon: 'Fund',
      //   component: './BigdataList/index'
      // },
      // {
      //   path: '/setting',
      //   name: 'setting',
      //   icon: 'setting',
      //   component: './SettingList/index',
      //   routes: [
      //     {
      //       path: '/setting/base',
      //       name: 'base',
      //       component: './SettingList/base/base'
      //     },
      //     {
      //       path: '/setting/control',
      //       name: 'control',
      //       component: './SettingList/control/control',
      //     },
      //     {
      //       path: '/setting/person',
      //       name: 'person',
      //       component: './SettingList/person/person'
      //     },
      //     {
      //       path: '/setting/usergroup',
      //       name: 'usergroup',
      //       component: './SettingList/userGroup/usergroup'
      //     }
      //   ]
      // },