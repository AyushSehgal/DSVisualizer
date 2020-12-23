var files = [];
var committed = false;
var added = false;
var workingDirectory = "./"

var termObj = $('#terminal').terminal({
    mkdir: (args) => {mkdir(args)},
    pwd: () => {termObj.echo(workingDirectory)},
    ls: () => {ls()},
    cd: () => {cd()},
    touch: (args)=> {touch(args)},
    git: (command, args) => {
        switch(command) {
            case "add":
                git_add(args)
                break;
            case "commit":
                git_commit()
                break;
        }
    }
    
}, {checkArity: false, greetings: "Welcome to Terminal! \nTips:\n\tMake your own dummy files using the file keyword\n\tExample:\n\t\t\tfile [filename.extension]\n\t\t\tgit add [filename.extension] OR git add .\n\t\t\tgit commit -m \"Your message here\"\n\t\t\tgit push"});

function mkdir(name) {
    if (name === undefined) {
        termObj.echo('Please specify directory name');
        return;
    }
    let updatedDirectory = workingDirectory + name;
    termObj.echo(updatedDirectory);
}
function cd() {
    return 0
}
function ls() {
    files.forEach((label) => {termObj.echo(label)});
}
function touch(name) {
    if (name === undefined) {
        termObj.echo('Please specify filename and extension');
        return;
    }
    let fileName = name;
    files.push(fileName);
}

function git_add(args) {
    if (args === undefined) {
        termObj.echo('Please specify a file or multiple files to stage.')
        return;
    }

    $('#staged').append($('<div class="col"><figure><figcaption style="font-size:12px">' + args + '</figcaption><img src="./images/file.png" width="40" height="40"/></figure></div>'))
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

