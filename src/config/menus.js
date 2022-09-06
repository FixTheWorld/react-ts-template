import {
    HomeOutlined,
    UserOutlined,
    ReadOutlined,
    LogoutOutlined,
    SettingOutlined
} from "@ant-design/icons";
export const mainMenu = [
    {
        label: "首页",
        key: "/home",
        icon: <HomeOutlined />,
    },
    {
        label: "用户管理",
        key: "/users",
        icon: <UserOutlined />,
        children: [
            { label: '角色管理', key: '/users/roles' },
            { label: '权限管理', key: '/users/limits' }
        ]
    }, {
        label: "文章管理",
        key: "/articles",
        icon: <ReadOutlined />,
        children: [
            { label: '文章列表', key: '/articles/list' }
        ]
    }
];

export const userMenu = [
    {
        label: "设置",
        key: "settings",
        icon: <SettingOutlined />,
    },
    {
        label: "注销",
        key: "logout",
        icon: <LogoutOutlined />
    },
];