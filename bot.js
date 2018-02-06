'use strict';
const winston = require("winston");
const Discord = require("discord.js");
const auth = require('./auth.json');
const tsFormat = new Date().toLocaleTimeString();
const prefix = '~pixel';

import Commands from './lib/commands/Commands';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console ({
            timestamp: tsFormat,
            colorize: true
        })
    ]
});

logger.level = 'debug';

const bot = new Discord.Client();

bot.on('ready', () => {
   logger.info('Connected.');
   logger.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
    if(msg.author.bot) return;
    if(msg.content.substring(0, 6).toLowerCase() === prefix) {
        let args = msg.content.substring(6).toLowerCase().split(' ').slice(1);
        new Commands(msg, args);
    }
});

bot.login(auth.token);