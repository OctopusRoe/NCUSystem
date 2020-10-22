// 个人资料组件

import React from 'react'

import StudentInfo, { Student } from './components/student'
import WorkerInfo, { Worker } from './components/worker'

const politicalList = ['中共党员', '中共预备党员', '共青团员', '群众', '其他']

export interface UserInfoProps {
  isStudent: boolean
  info: Student | Worker | any
}

const UserInfo: React.FC<UserInfoProps> = (props) => {

  return (
    <>
      {/* <StudentInfo info={studentInfo} political={politicalList} /> */}
      {
        props.isStudent ?
          <StudentInfo info={props.info} political={politicalList} />
          :
          <WorkerInfo info={props.info} />
      }
    </>
  )
}

export default UserInfo