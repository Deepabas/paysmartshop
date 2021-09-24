
Handlebars.registerHelper('greeting', function() {
    return new Handlebars.SafeString( '<i>Hello World</i>' );
});
$(document).ready(function(){
var template = $('#handlebars-demo').html();

var context = { "name" : "Ritesh Kumar", "occupation" : "developer" ,"mobile": "7639111370" ,"email":"sivithra@brokenglass.co.in","education":"Bsc"};

//Compile the template data into a function
var templateScript = Handlebars.compile(template);

var html = templateScript(context);
//html = 'My name is Ritesh Kumar . I am a developer.'

$('#title').append(html);
});