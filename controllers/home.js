var Titles = require('../models/Titles');
var Contents = require('../models/Contents');

module.exports = {
    index: function* (scope) {
    
        scope.content = "this is testjfwopfgjwegw"; 
        yield this.render("index");
    
    },

    getAllTitles: function* (){

    	let all = yield Titles.getAll()
			this.renderJSON(all)

    },

    getContent: function* (){

    	let all = yield Contents.getContentById()
			this.renderJSON(all)

    }
};