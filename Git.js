$('#terminal').terminal({
    git: {
        hello: () => {this.echo('Welcome')},
        add: () => {git_add()},
        commit: () => git_commit()
    
    
    
    },
}, {greetings: "Welcome to Terminal"});

var fileID = 0
function git_add() {
    $('#staged').append($('<div class="col" style="float:left"><figure><figcaption style="font-size:12px">Img:' + fileID + '</figcaption><img src="./images/file.png" id="' + fileID + '" width="40" height="40"/></figure></div>'))
    fileID++
}

function git_commit() {
    return 0;
}

