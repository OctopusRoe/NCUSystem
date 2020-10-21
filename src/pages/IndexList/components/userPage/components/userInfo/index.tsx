// 个人资料组件

import React from 'react'

import StudentInfo from './components/student'
import WorkerInfo from './components/worker'

const info = {
  nation: ['汉族', '满族', '其他族'],
  birthPlace: ['江西', '中国', '亚洲'],
  college: ['信息工程学院', '医学院', '建筑工程学院'],
  className: ['班级1', '班级2', '班级3', '班级4'],
  specialty: ['专业1', '专业2', '专业3'],
  educational: ['4年制', '3年制']
}

const UserInfo: React.FC<{}> = (props) => {

  return (
    <>
      <StudentInfo info={info} />
    </>
  )
}

export default UserInfo