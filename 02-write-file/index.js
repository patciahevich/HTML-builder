// const readline = require('readLine');
const fs = require('fs');
const readline = require('readline'); 


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'What is your name?      '
});


fs.open('./02-write-file/greeting.txt', 'w', (err) => {
  if(err) throw err;
  rl.prompt();
  rl.on('line', (name) => {
    fs.appendFile('./02-write-file/greeting.txt', `Hi, ${name}!`, (err) => {
      if(err) throw err;
      console.log(`   Hi, ${name}!`);
      rl.close();
  });
  });
});