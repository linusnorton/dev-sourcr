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

        res.render('index/index.html', {
            oAuthState: req.session.state
        });
    }


    this.run = run;
}

var controller = new IndexController();

module.exports = controller.run;