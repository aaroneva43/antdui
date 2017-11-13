import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { Menu, Dropdown, Icon, message } from 'antd'

import _ from 'lodash'

class Nav extends React.PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        menuData: PropTypes.array
    }

    currentPath = []

    getCurrentPath(location) {
        // if (!location || !menuData || !menuData.length) return []

        // const { location, menuData } = this.props

        // let currentPath = location.path.split('/')
        // currentPath.shift()

        // for (let i = 0; i < currentPath.length; i++) {

        // }




    }

    /**
     * @param path: Array
     */
    findMenuByPath(menuData, path) {
        path = _.cloneDeep(path)

        let menu = {}

    }

    render() {

        const { location, menuData } = this.props

        const paths = location.path

        const menu1st = (
            <Menu>
                {_.castArray(menuData || []).map((itm) => {
                    return <Menu.Item key={itm.url} >{itm.name}</Menu.Item>
                })}
            </Menu>
        )

        return (

            <Dropdown overlay={menu1st}>
                <a href="javascript:;">
                    Menu1st <Icon type="down" />
                </a>
            </Dropdown>

        )
    }

}

export default Nav