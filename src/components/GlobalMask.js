import React, { Component } from 'react'
import { Spin } from 'antd'

import style from './GlobalMask.css'

export default () => {
    return (
        <div className={style.GlobalMask} >
            <Spin delay={20} />
        </div>
    )
}
