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
            case "push":
                git_push()
                break;
            case "branch": 
                git_branch(args)
                break;
            case "auto":
                git_auto()
                break;
            default:
                termObj.echo('This command does not exist.');
        }
    }
    
}, {
    checkArity: false, 
    name: 'DSVisualizer', 
    greetings: "Welcome to Terminal! \nTips:\n\tMake your own dummy files using the file keyword\n\tExample:\n\t\t\ttouch [filename.extension]\n\t\t\tgit add [filename.extension] OR git add .\n\t\t\tgit commit -m \"Your message here\"\n\t\t\tgit push\n\tOR type \"git auto\" to do all of the above in one command"
});

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
var pushed = false;
var closedAdd = [];

function git_add(args) {  
    $('#visual').show();
    if (args.length == 0) {
        termObj.echo('Please specify a file or multiple files to stage.')
        return;
    }
    if (args == ".") {
        if (files.length == 0) {
            termObj.echo('No files exist, please create them using the touch command.')
            return;
        }
        
        files.forEach((item) => { 
            if (!closedAdd.includes(item)) {
                $('#staged').append($('<div class="col"><figure><img src="./images/file.png" width="40" height="40"/><figcaption style="font-size:12px; text-align: center">' + item + '</figcaption></figure></div>'))
                closedAdd.push(item)
                pushed = false;
                committed = false;
            } else {
                termObj.echo(item + ' is already staged. Now please commit')
            }
        });
        return;
    }

    for (var i = 0; i < args.length; i++) {
        if (args[i] === undefined) {
            termObj.echo('Please specify a file or multiple files to stage.')
            return;
        }
    
        if (closedAdd.includes(args[i])) {
            termObj.echo(args[i] + ' is already staged. Now please commit')
            return;
        }

        if (!files.includes(args[i])) {
            termObj.echo('The file specified does not exist.')
            return;
        }
        $('#staged').append($('<div class="col"><figure><img src="./images/file.png" width="40" height="40"/><figcaption style="font-size:12px; text-align: center">' + args[i] + '</figcaption></figure></div>'))
        closedAdd.push(args[i]);
        pushed = false;
        committed = false;
    }   
}

var commitMessages = [];
function git_commit(message) {
    if (message[0] != "-m") {
        termObj.echo("Please format your commit as follows: \n\t\tgit commit -m \"message goes here\"");
        return;
    }
    if (message.length != 2) {
        termObj.echo("Please format your commit as follows: \n\t\tgit commit -m \"message goes here\"");
        return;
    }
    const mssg = message[1]
    if (closedAdd.length != 0) {
        $('#commit').append($('<div class="col"><figure><img src="./images/folder.png" width="40" height="40"/><figcaption style="font-size:12px; text-align: center">' + mssg + '</figcaption></figure></div>'))
        commitMessages.push(mssg);
        committed = true;
    } else if (committed) {
        termObj.echo('Nothing to commit')
    } else {
        termObj.echo('Please add before committing')
    }
}
var lineLength = 65;
var nodeDiameter = 50;
var nodeRadius = nodeDiameter / 2;
var startLine = 0;
var startNode = lineLength;
var masterYNode = 0;
var masterYLine = 25;
var draw;
var line;
var circle;

function drawNode(container) {
    draw = SVG().addTo(container).size(300,300);
    line = draw.line(0, 0, lineLength, 0).move(startLine, nodeRadius).stroke({ color: '#555', width: 10, linecap: 'square' })
    circle = draw.circle(nodeDiameter).fill('#555').move(startNode, 0);
    
    startLine = startLine + lineLength + nodeDiameter;
    startNode = startNode + startLine + lineLength;
}

function git_push() {
    if (!committed) {
        termObj.echo('Please commit before pushing.');
        return;
    }
    if (pushed) {
        termObj.echo('Nothing to push.');
        return;
    }
    
    $('#pc').append($('<img src="./images/desktop.png" />'));
    setTimeout(() => {$('#load').append($('<img id="1" src="./images/file.png" width="40" height="40"/>'))}, 250);
    setTimeout(() => {$('#load').append($('<img id="2" src="./images/file.png" width="40" height="40"/>'))}, 500);
    setTimeout(() => {$('#load').append($('<img id="3" src="./images/file.png" width="40" height="40"/>'))}, 750);
    setTimeout(() => {$('#hub').append($('<img src="./images/github.png" style="float: right;" width="50" height="50"/>'))}, 1000);
    setTimeout(() => {
        $('#load').empty(); 
        // $('#master').append($('<div class="col"><div class="circle"></div><p>' + commitMessages.pop() +'</p></div>'));
        $('#master').append($('<br />'));
        drawNode('#master');
        console.log('new start value ' + newStart);
        drawNode('#master');
        $('#pc').empty(); 
        $('#hub').empty()
    }, 1250);

}

function git_branch(name) {
    
    
}

function git_auto() {
    termObj.echo('Auto Generate Commit Process')
    setTimeout(() => {termObj.echo('> touch sample.txt'); touch("sample.txt");}, 500);
    setTimeout(() => {termObj.echo('> git add .'); git_add(["sample.txt"]);}, 650);
    setTimeout(() => {termObj.echo('> git commit -m \"Initial Commit\"'); git_commit(["-m", "Initial Commit"]);}, 750);
    setTimeout(() => {termObj.echo('> git push'); git_push();}, 1500);
}

