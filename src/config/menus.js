import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    SettingOutlined
} from "@ant-design/icons";
export const mainMenu = [
    {
        label: "Home",
        key: "/",
        icon: <UploadOutlined />,
    },
    {
        label: "Test Redux",
        key: "/testRedux",
        icon: <UserOutlined />
    },
    {
        label: "Test Hooks",
        key: "/testHooks",
        icon: <VideoCameraOutlined />
    },
    {
        label: "Test Mobx",
        key: "/testMobx",
        icon: <VideoCameraOutlined />
    },
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