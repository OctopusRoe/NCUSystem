// 废弃组件

// 社团指导 通讯录组件

import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import TeacherList from './components/teacherList'
import StudentList from './components/studentList'

const Address: React.FC<{}> = (props) => {

  const [ key, setkey ] = useState<string>('teacher')

  const tabList = [
    {
      key: 'teacher',
      tab: '指导老师',
    },
    {
      key: 'student',
      tab: '学生负责人',
    }
  ]

  const renderChildren = () => {
    switch (key) {
      case 'teacher':
        return <TeacherList />;
      case 'student':
        return <StudentList />;
      default:
        break;
    }
    return null
  }

  return (
    <PageHeaderWrapper
      tabList={tabList}
      onTabChange={(key: string)=>setkey(key)}
    >
      {renderChildren()}
    </PageHeaderWrapper>
  )
}

export default Address