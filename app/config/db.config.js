module.exports = (function() {
    return {
        local:{
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '1234qwer',
            database: 'venom'

        },
        dev: { //development
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        production: { //production
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();