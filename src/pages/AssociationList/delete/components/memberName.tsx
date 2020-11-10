// 注销申请的 成员列表组件

import React from 'react'

interface MemberNameProps {
  valueList: any[]
  index: number
}

const MemberName: React.FC<MemberNameProps> = (props) => {
  const { valueList, index } = props
  return (
    <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
      <div style={{padding: '4px 11px'}}>
        {valueList[index] && valueList[index].two}
        {/* {memberList[item.name] && memberList[item.name].two} */}
      </div>
    </div>
  )
}

export default MemberName