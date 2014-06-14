'use strict';

function SignOutController () {
   
    /**
     * @route("/sign-out")
     * 
     * @param {Request} req
     * @param {Response} res
     */
    function run (req, res) {
        req.session.token = undefined;
        res.redirect('/');
    }

    this.run = run;
}

var controller = new SignOutController();

module.exports = controller.run;