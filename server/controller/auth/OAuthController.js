'use strict';

var request = require('superagent'),
    fun = require('fun-js');


function OAuthController () {
   
    /**
     * @route("/oauth")
     * 
     * @param {Request} req
     * @param {Response} res
     */
    function run (req, res) {
        if (req.param('state') !== req.session.state) {
            res.redirect('/?authFailure=State')
        }

        request
            .post('https://github.com/login/oauth/access_token')
            .send({
                client_id: 'a362e6a255a45c5e554a',
                client_secret: 'c003f892c3c8e97c4ffd65ced85b7e2377673090',
                code: req.param('code')
            })
            .end(function (err, data) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }

                req.session.token = data.body.access_token;
                res.redirect('/search');
            });
    }

    this.run = run;
}

var controller = new OAuthController();

module.exports = controller.run;