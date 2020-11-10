// 社团主页 组件

import React from 'react'
import { connect } from 'umi'

const HomePage: React.FC<{}> = (props) => {
  return (
    <>社团主页</>
  )
}

export default connect((state)=>{
  return {test: state}
})(HomePage)