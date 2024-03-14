const endpoints = {
    gg: process.env.GOOGLE_API_KEY,
    baseUrl: process.env.NODE_ENV === 'development' ? process.env.BASE_URL_DEV : process.env.BASE_URL_DEV,
    socketUrl: process.env.NODE_ENV === 'development' ? process.env.SOCKET_URL_DEV : process.env.SOCKET_URL,
    login: '/user/login',
    signup: '/user/signup',
    forgotPassword: '/user/forgot/password',
    otpverification: '/user/confirmcode',
    resetPassword: '/user/reset/password',
    addDispatch: '/user/add/order',
    order: '/user/retrieve/all/order',
    retriveSingleorder: '/user/retrieve/single/order',
    retrievePrice: '/user/retrieve/price',
    retrieveOrder: '/user/retrieve/all/order',
    profile: '/user/update/profile',
    getProfile: '/user/profile',
    fundWallet: '/user/fund/wallet',
    retreive: '/user/retrieve/balance',
    history: '/user/retrieve/wallet/history',
    chat: '/user/chat/support',
    cancelOrder: '/user/cancel/order'

}

export default endpoints;