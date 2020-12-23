var termObj = $('#terminal').terminal({
    
    git: (command) => {
        switch(command) {
            case "add":
                git_add()
                break;
            case "commit":
                git_commit()
                break;
        }
    }
    
}, {greetings: "Welcome to Terminal! \nTips:\n\tMake your own dummy files using the file keyword\n\tExample:\n\t\t\tfile [filename.extension]\n\t\t\tgit add [filename.extension] OR git add .\n\t\t\tgit commit -m \" Your message here\"\n\t\t\tgit push"});

var fileID = 0;
var committed = false;
var added = false;
function git_add() {
    $('#staged').append($('<div class="col"><figure><figcaption style="font-size:12px">Img:' + fileID + '</figcaption><img src="./images/file.png" id="' + fileID + '" width="40" height="40"/></figure></div>'))
    fileID++
    added = true;
}


function git_commit() {
    if (added && !committed) {
        $('#commit').append($('<div class="col"><figure><figcaption style="font-size:12px">Img:' + added + '</figcaption><img src="./images/folder.png" width="40" height="40"/></figure></div>'))
        committed = true;
    } else if (committed) {
        termObj.echo('Nothing to commit')
    } else {
        termObj.echo('Please add before committing ')
    }
}

