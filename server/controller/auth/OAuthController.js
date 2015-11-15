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
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
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