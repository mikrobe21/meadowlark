let express = require('express');

let app = express();

let fortune = require('./lib/fortune.js');

app.use(express.static(__dirname + '/public'));

let handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){ 
    res.render('home');
});
app.get('/about', (req, res) => {
    res.render('about', {fortune : fortune.getFortune() })
});
    // custom 404 page
app.use(function(req, res, next){ 
    res.status(404)
    res.render('404');
});

// 500 error handler
app.use(function(err, req, res, next){ 
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' ); });   
