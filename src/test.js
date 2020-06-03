const axios = require('axios')

axios.request({ url: 'http://rap2.taobao.org:38080/app/mock/254918/edition/list', method: 'GET', data: {} })
    .then(res => {
        console.log(res.data)
    })