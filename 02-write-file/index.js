const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(filePath);

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('Type smth, pls');

rl.on('line', (input) => {
  if (input == 'exit') process.exit(0);
  console.log(`Received: ${input}`);
  stream.write(input + '\n');
});
 