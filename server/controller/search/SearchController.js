'use strict';

function SearchController () {
   
    /**
     * @route("/search")
     * 
     * @param {Request} req
     * @param {Response} res
     */
    function run (req, res) {
        if (!req.session.token) {
            res.redirect('/');
        }

        res.render('search/search.html', {
            token: req.session.token
        });
    }


    this.run = run;
}

var controller = new SearchController();

module.exports = controller.run;