import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { Menu, Dropdown, Icon, message } from 'antd'

import _ from 'lodash'

class Nav extends React.PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        menuData: PropTypes.array
    }

    currentPath = ''

    render() {

        const { location, menuData } = this.props

        const menu1st = (
            <Menu>
                {_.castArray(menuData || []).map((itm) => {
                    return <Menu.Item key={itm.path} >{itm.name}</Menu.Item>
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