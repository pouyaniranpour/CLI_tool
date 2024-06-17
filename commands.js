import { program } from 'commander';

import { addItem, removeItem, findItem } from './index.js';

import inquirer from 'inquirer';

const prompt = inquirer.prompt;

program
    .version('1.0.0')
    .description('Item Management System')

// program
//     .command('add <title> <description> <start_price> <reserve_price>')
//     .alias('a')
//     .description('Add an item')
//     .action((title, description, start_price, reserve_price) => {
//         addItem({ title, description, start_price, reserve_price });
//     });

//Item questions

program
    .command('add')
    .alias('a')
    .description('Add an item')
    .action(() => {
        prompt(questions).then(answers => addItem(answers));
    });

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Item Name'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Item Description'
    },
    {
        type: 'input',
        name: 'start_price',
        message: 'Start Price'
    },
    {
        type: 'input',
        name: 'reserve_price',
        message: 'Reserve Price'
    }
]

program
    .command('find <item>')
    .alias('f')
    .description('Find an item')
    .action(itemName => findItem(itemName));
    

program
    .command('remove <itemName>')
    .alias('r')
    .description('Remove an item')
    .action( itemName => removeItem(itemName));

program.parse(process.argv);