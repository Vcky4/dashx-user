const endpoints = {
    gg: 'AIzaSyDJ_sm-EFNvOBvTLMKbDi8CAT8G21GxDvQ',
    baseUrl: 'https://dashx-cc5d52b5155a.herokuapp.com',
    socketUrl: 'wss://expressryderv2.adaptable.app',
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
    retreive:'/user/retrieve/balance'

}

export default endpoints;