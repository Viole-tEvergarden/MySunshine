import Cookie from "js-cookie";

export default {
    namespaced: true, // 命名空间模块
    state: {
        userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : "",
        tokenInfo: Cookie.get("tokenInfo") ? JSON.parse(Cookie.get("tokenInfo")) : "",
        routes: Cookie.get("routes") ? JSON.parse(Cookie.get("routes")) : [],
        username: 'admin',
    },
    getters: {},
    mutations: {
        setUserInfo(state, user) {
            //用户信息，随用随存，不设时限，随浏览器关闭而清除
            state.userInfo = user;
            if (user) {
                Cookie.set("userInfo", JSON.stringify(user));
            } else {
                Cookie.remove("userInfo");
            }
        },
        setTokenInfo(state, token) {
            //token信息，执行登录操作时进行保存
            state.tokenInfo = token;
            if (token) {
                Cookie.set(
                    "tokenInfo", 
                    JSON.stringify(token), 
                    // {expires: 7} ,//设置时间
                );
            } else {
                Cookie.remove("tokenInfo");
            }
        },
        setRoutes(state, routes) {
            //路由信息
            state.routes = routes;
            if (routes) {
                Cookie.set("routes", JSON.stringify(routes));
            } else {
                Cookie.remove("routes");
            }
        },
        setUsername(state, name) {
            state.name = name;
        },
    },
    actions: {
        setUserInfoAsync(context, user) {
            context.commit("setUserInfo", user);
        },
    },
};

