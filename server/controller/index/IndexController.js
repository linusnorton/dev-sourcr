'use strict';

function IndexController () {
   
    /**
     * @route("/")
     * 
     * @param {Request} req
     * @param {Response} res
     */
    function run (req, res) {
        req.session.state = Math.random() + '';

        res.render('controller/index/index.html', {
            oAuthState: req.session.state,
            clientId: process.env.CLIENT_ID
        });
    }


    this.run = run;
}

var controller = new IndexController();

module.exports = controller.run;