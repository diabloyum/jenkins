/**
 * prevent browser call
 *
 * @param {any} req
 * @param {any} res
 * @param {any} proxyOptions
 * @returns
 */
const preventBrowserCalls = function (req, res, proxyOptions) {
    if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        return '/index.html';
    }
    req.headers['X-Custom-Header'] = 'yes';
};

const PROXY_CONFIG = [
    {
        context: ['/reference', '/oauth','/user', '/friend'
            , '/img', '/collect', '/internationalization', '/menu', '/company', '/attachment', '/comment', '/order', '/check', '/things', '/gongxu'],
        target: 'http://localhost:8081',
        secure: false,
        bypass: preventBrowserCalls
    }
];
module.exports = PROXY_CONFIG;
