var path = require('path');
var fs = require('fs');
var exten = process.argv[2];
var substring = process.argv[3];
var found = 0;

if (process.argv.length < 4) { // check args
    return console.log('USAGE: node search [EXT] [TEXT]');
}

function search_dir(dr, files) {
    files = files || fs.readdirSync(dr);
    files.forEach(function (file) {
        var f_dir = path.join(dr, file);
        if (fs.statSync(f_dir).isDirectory()) { // check dir
            search_dir(f_dir, fs.readdirSync(f_dir))
         }
        else {
            if (file.split('.').pop() == exten){
                var contents = fs.readFileSync(f_dir, 'utf8');
                if (contents.indexOf(substring) >= 0) {
                    found++;
                    console.log(process.cwd() + '/' + f_dir); // sucsess to file file with ext and content
                }
            }
        }
    })
}

search_dir('.'); // start for search in current dir
if(found == 0){
    return console.log('no file was found');
}
    

