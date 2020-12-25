/** Static Variables */
var files = [];
var directories = [""];
var relationships = {home: []};

var workingDirectory = "./"
var currentDirectory = "home"

/** Instantiate JQuery Terminal */
var termObj = $('#terminal').terminal({
    mkdir: (args) => {mkdir(args)},
    pwd: () => {termObj.echo(workingDirectory)},
    ls: () => {ls()},
    cd: (args) => {cd(args)},
    touch: (args)=> {touch(args)},
    git: (command, ...args) => {
        switch(command) {
            case "add":
                git_add(args)
                break;
            case "commit":
                git_commit(args)
                break;
        }
    }
    
}, {checkArity: false, greetings: "Welcome to Terminal! \nTips:\n\tMake your own dummy files using the file keyword\n\tExample:\n\t\t\ttouch [filename.extension]\n\t\t\tgit add [filename.extension] OR git add .\n\t\t\tgit commit -m \"Your message here\"\n\t\t\tgit push"});

/** Functional Elements - Basic Terminal Commands */
function mkdir(name) {
    if (name === undefined) {
        termObj.echo('Please specify directory name');
        return;
    }
    let updatedDirectory = ""
    if (workingDirectory === "./") {
        updatedDirectory = workingDirectory + name; 
    } else {
        let currDirectory = directories[directories.length - 1];
        relationships[currDirectory].push(name);
        updatedDirectory = workingDirectory + "/" + name;
    }
    directories.push(name);
    relationships[name] = [];
    termObj.echo(updatedDirectory);
    
}
function cd(name) {
    if (name === ".." || name === "./.." || name === "/..") {
        let currDirectory = directories[directories.length - 1];
        workingDirectory = workingDirectory.replace('\/' + currDirectory, '');
        if (workingDirectory === ".") {
            workingDirectory = "./"
        }
        termObj.echo(workingDirectory);
        return;
    }
    if (name === ".") {
        termObj.echo(workingDirectory);
        return;
    }
    if (name === undefined) {
        workingDirectory = "./"
        termObj.echo(workingDirectory);
        return;
    }
    if (directories.includes(name)) {
        if (workingDirectory != "./") {
            name = "/" + name;
        } 
        if (currentDirectory === name) {
            termObj.echo(workingDirectory)
        }
        currentDirectory = name;
        workingDirectory += name;
        termObj.echo(workingDirectory);
    } else {
        termObj.echo('Requested Directory does not exist');
    }

}
function ls() {
    relationships[currentDirectory].forEach((label) => {termObj.echo(label)});
}

function touch(name) {
    if (name === undefined) {
        termObj.echo('Please specify filename and extension');
        return;
    }
    relationships[currentDirectory].push(name);
    files.push(name);
    
}

/** Functional Elements - Git Commands */
var committed = false;
var added = false;
var closedAdd = [];

function git_add(args) {
    if (args === undefined) {
        termObj.echo('Please specify a file or multiple files to stage.')
        return;
    }
    if (closedAdd.includes(args)) {
        termObj.echo('This file/folder is already staged. Now please commit')
        return;
    }

    if (args == ".") {
        if (files.length == 0) {
            termObj.echo('No files exist, please create them using the touch command.')
            return;
        }
        files.forEach((item) => { $('#staged').append($('<div class="col"><figure><figcaption style="font-size:12px">' + item + '</figcaption><img src="./images/file.png" width="40" height="40"/></figure></div>'))})
        closedAdd.push(args);
        added = true;
        return;
    }

    if (!files.includes(args) && !directories.includes(args)) {
        termObj.echo('The file specified does not exist.')
        return;
    }
    
    $('#staged').append($('<div class="col"><figure><figcaption style="font-size:12px">' + args + '</figcaption><img src="./images/file.png" width="40" height="40"/></figure></div>'))
    added = true;
    closedAdd.push(args);
}


function git_commit(message) {
    console.log(message);
    if (message[0] != "-m") {
        termObj.echo("Please format your commit as follows: \n\t\tgit commit -m \"message goes here\"");
        return;
    }
    if (message.length != 2) {
        termObj.echo("Please format your commit as follows: \n\t\tgit commit -m \"message goes here\"");
        return;
    }
    const mssg = message[1]
    if (added && !committed) {
        $('#commit').append($('<div class="col"><figure><figcaption style="font-size:12px">' + mssg + '</figcaption><img src="./images/folder.png" width="40" height="40"/></figure></div>'))
        committed = true;
    } else if (committed) {
        termObj.echo('Nothing to commit')
    } else {
        termObj.echo('Please add before committing')
    }
}

