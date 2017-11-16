import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { Menu, Dropdown, Icon, message } from 'antd'
import { Link } from 'react-router-dom'


import _ from 'lodash'

const SubMenu = Menu.SubMenu

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
     * @param path: String
     */
    findMenuByPath(menuData, path, single = true) {

        path = path.split('/').splice(1)

        let menus = []

        let find = (menu) => { }
        try {
            let root = menuData[path]
            menus.push(root)

            if (root.children) { }

        } catch (e) {

        }



    }

    renderMenu(menu) {
        let me = this

        if (menu.depth === 0) {
            return (
                <SubMenu title={<span><Icon type="setting" />{}</span>}>
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2"><Link to='http://www.baidu.com'>dddddddDDD</Link></Menu.Item>
                </SubMenu>
            )
        }


    }

    render() {

        const me = this

        const { location, menuData } = this.props

        const paths = location.pathname.split('/').splice(1)

        _.castArray(menuData || []).forEach(function (itm) {

        }, this)

        const menu1st = (
            <Menu>
                {
                    _.castArray(menuData || []).map((itm) => {
                        return <Menu.Item key={itm.url} >{itm.name}</Menu.Item>
                    })
                }
            </Menu>
        )

        return (

            // <Dropdown overlay={menu1st}>
            //     <a href="javascript:;">
            //         Menu1st <Icon type="down" />
            //     </a>
            // </Dropdown>
            _.isArray(menuData) && menuData.length ?

                <Menu
                    mode="horizontal"
                >
                    {me.renderMenu(menuData[0])}
                    <Menu.Item key="app" disabled>
                        <Icon type="appstore" />Navigation Two
                </Menu.Item>
                    <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2"><Link to='http://www.baidu.com'>dddddddDDD</Link></Menu.Item>
                    </SubMenu>

                </Menu>
                :
                <div></div>

        )
    }

}

export default Nav