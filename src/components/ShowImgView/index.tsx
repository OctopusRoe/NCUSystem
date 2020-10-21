// 图片预览 组件

// 对 React 的 Antd 的 Image 组件进行2次封装

import React, { useRef } from 'react'

import { Image } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import styles from './styles.less'

export interface ShowImageProps {
  src: string
  id: string
  style: any
}

const ShowImage: React.FC<ShowImageProps> = (props) => {
  const { src, id, style } = props

  const imageRef = useRef(null)

  const preview = () => {
    document.getElementById(id)?.click()
  }

  return (
    <div className={styles['show-img-view-box']} style={style}>
      <div className={styles['img-vie-box']}>
        <div className={styles['icon-box']}>
          <a title={"预览图片"} onClick={preview}>
            <EyeOutlined size={12} />
          </a>
        </div>
        <div ref={imageRef}>
          <Image
            src={src}
            className={styles['img-box']}
            fallback={require('@/assets/images/fail.png')}
            id={id}
          />
        </div>
      </div>
    </div>
  )
}

export default ShowImage