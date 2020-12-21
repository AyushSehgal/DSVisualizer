$('body').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                    '. Welcome to this terminal.');
    }
}, {
    greetings: 'Hi, Welcome to Terminal'
});

