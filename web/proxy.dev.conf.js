/**
 * Prevent browser call
 *
 * @param {any} req
 * @param {any} res
 * @param {any} proxyOptions
 * @returns
 */
const preventBrowserCalls = function(req, res, proxyOptions) {
    if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        return '/index.html';
    }
    req.headers['X-Custom-Header'] = 'yes';
};

const PROXY_CONFIG = [
    {
        context: ['/users', '/reference', '/oauth','/img','/attachment', '/internationalization', '/menu'],
        target: 'https://shared-alb-dev-alb-117769970.us-east-1.elb.amazonaws.com',
        secure: false,
        bypass: preventBrowserCalls
    }
];
module.exports = PROXY_CONFIG;
