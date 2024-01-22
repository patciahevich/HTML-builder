// const readline = require('readLine');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const PATH = path.join('02-write-file', 'greeting.txt');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Hello! Write some text! ',
});

fs.open(PATH, 'w', (err) => {
  if (err) throw err;
  rl.prompt();
  rl.on('SIGINT', () => {
    console.log('Text is added to the file');
    rl.close();
  });
  rl.on('line', (answer) => {
    if (answer !== 'exit') {
      fs.appendFile('./02-write-file/greeting.txt', `\n${answer}`, (err) => {
        if (err) throw err;
      });
    } else {
      console.log('Text is added to the file');
      rl.close();
    }
  });
});
