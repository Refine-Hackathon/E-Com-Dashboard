import React from "react";
//import { LoginPage } from './pages/auth/customLoginPage'
import { Refine, AuthProvider } from "@pankod/refine-core";
//import { authProvider } from "./authProvider";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { host } from "utils/api";
import icon from "../src/assets/icon.webp";
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    FormControlLabel,
    Checkbox,
    ReadyPage,
    ErrorComponent, AuthPage
} from "@pankod/refine-mui";
import {
    AccountCircleOutlined,
    ChatBubbleOutline,
    PeopleAltOutlined,
    StarOutlineRounded,
    VillaOutlined,
    StorefrontOutlined,
    ListAltOutlined,
    AddShoppingCartOutlined,
    SellOutlined,
    HomeOutlined,
    CategoryOutlined
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "contexts";


import {
    Home,
    Products,
    ProductShow,
    Agents,
    MyProfile,
    PropertyDetails,
    AllProperties,
    CreateProperty,
    AgentProfile,
    EditProperty,
    Storehome,
} from "pages";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});
let role = 'admin'
let uid = 0
function App() {
    const authProvider: AuthProvider = {
        login: async ({ email, password }) => {
            const response = await fetch(
                "http://localhost:9000/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                },
            );

            const data = await response.json();
            if (response.status === 200) {
                //role = data["role"];
                console.log(data[0].user_id);
                localStorage.setItem('role', data[0].username);
                localStorage.setItem('uid', data[0].user_id);
                localStorage.setItem("email", data[0].email);
            }
            else {
                return Promise.reject();
            }

            localStorage.setItem("email", email);
            return Promise.resolve();
        },
        register: (params) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.email);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: (params) => {
            if (params.newPassword) {
                //we can update password here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        forgotPassword: (params) => {
            if (params.email) {
                //we can send email with forgot password link here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        logout: () => {
            role = "no-user"
            localStorage.removeItem("email");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("email")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                name: localStorage.getItem('role'),
                avatar: icon,
            }),
    };

    const RememeberMe = () => {
        const { register } = useFormContext();

        return (
            <FormControlLabel
                sx={{
                    span: {
                        fontSize: "12px",
                        color: "text.secondary",
                    },
                }}
                color="secondary"
                control={
                    <Checkbox
                        size="small"
                        id="rememberMe"
                        {...register("rememberMe")}
                    />
                }
                label="Remember me"
            />
        );
    };



    //         if (token) {
    //             return Promise.resolve();
    //         }
    //         return Promise.reject();
    //     },

    //     getPermissions: () => Promise.resolve(),
    //     getUserIdentity: async () => {
    //         const user = localStorage.getItem("user");
    //         if (user) {
    //             return Promise.resolve(JSON.parse(user));
    //         }
    //     },
    // };
    let role = 'admin'

    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>

                <Refine
                    dataProvider={dataProvider(`${host}/products`)}
                    routerProvider={{
                        ...routerProvider,
                        routes: [
                            {
                                path: "/auth/register",
                                element: <AuthPage type="register" />,
                            },

                        ],
                    }}
                    accessControlProvider={{
                        can: async ({ resource, action, params }) => {
                            if (resource === "dashboard" && action === "list" && role !== 'admin') {
                                return Promise.resolve({
                                    can: false,
                                    reason: "Unauthorized",
                                });
                            }
                            return Promise.resolve({ can: true });
                        },
                    }}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: 'dashboard',
                            icon: <VillaOutlined color="primary" />,
                            options: { label: "Admin-Space" },

                        },
                        {
                            name: 'store',
                            //parentName : 'dashboard',
                            icon: <StorefrontOutlined color="primary" />,
                            options: { label: "Store" },

                        },

                        {
                            name: "reviews",
                            parentName: 'dashboard',
                            list: Home,
                            icon: <StarOutlineRounded color="primary" />,
                        }, {
                            name: "messages",
                            parentName: 'dashboard',
                            list: Home,

                            icon: <ChatBubbleOutline color="primary" />,
                        }, 
                        {
                            name: "properties",
                            parentName: 'dashboard',
                            list: AllProperties,

                            // list : Products,
                            options: { label: "Manage Store" },
                            show: PropertyDetails,
                            create: CreateProperty,
                            edit: EditProperty,

                            icon: <CategoryOutlined color="primary" />,
                        }, 
                        {
                            name: 'store',
                            //parentName : 'dashboard',
                            icon: <StorefrontOutlined color="primary" />,
                            options: { label: "Store" },
                        },
                        
                        {
                            name: "agents",
                            parentName: 'dashboard',
                            //list: Agents,
                            //show: AgentProfile,
                            icon: <PeopleAltOutlined color="primary" />,

                        },
                        {
                            name: "reviews",
                            parentName: 'dashboard',
                            list: Home,
                            icon: <StarOutlineRounded color="primary" />,
                        },
                        {
                            name: "messages",
                            parentName: 'dashboard',
                            list: Home,

                            icon: <ChatBubbleOutline color="primary" />,

                        },


                        {
                            name: "my-profile",
                            parentName: 'dashboard',
                            options: { label: "My Profile " },
                            //list: MyProfile,
                            icon: <AccountCircleOutlined color="primary" />,
                        },
                        {
                            name: "Home",
                            parentName: 'store',
                            options: { label: "Home" },
                            icon: <HomeOutlined color="primary" />,
                            list: Storehome
                        },
                        {
                            name: "Categories",
                            parentName: 'store',
                            icon: <CategoryOutlined color="primary" />,
                        },

                        { name: 'Product/Jeans', options: { label: "Jeans" }, parentName: 'Categories', icon: <SellOutlined color="primary" />, list: Products, show: ProductShow },
                        { name: 'Product/Shoes', options: { label: "Shoes" }, parentName: 'Categories', icon: <SellOutlined color="primary" />, list: Products, show: ProductShow },
                        { name: 'Product/Tshirts', options: { label: "Tshirts" }, parentName: 'Categories', icon: <SellOutlined color="primary" />, list: Products, show: ProductShow },
                        { name: 'Product/Jackets', options: { label: "Jackets" }, parentName: 'Categories', icon: <SellOutlined color="primary" />, list: Products, show: ProductShow },

                        {
                            name: "Orders",
                            parentName: 'store',
                            icon: <ListAltOutlined color="primary" />,
                            list: Home
                        }, {
                            name: "Cart",
                            parentName: 'store',
                            list: Home,
                            icon: <AddShoppingCartOutlined color="primary" />,
                            options: { label: "Cart" },
                        }

                    ]}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}


                    authProvider={authProvider}
                    LoginPage={() => (
                        <AuthPage
                            rememberMe={<RememeberMe />}
                        />
                    )}

                // DashboardPage={Home}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;