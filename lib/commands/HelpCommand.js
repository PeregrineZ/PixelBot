'use strict';
const commands = [];
commands['~pixel help'] = 'Displays this message.';
commands['~pixel watchdog'] = 'Displays the current Watchdog stats';

export default class HelpCommand {
    constructor(msg) {
        let helpMessage = '```\n';
        msg.reply('Here is a list of all my commands:');
        for(const i in commands) {
            helpMessage += i + " - " + commands[i] + '\n';
        }
        helpMessage += '```';
        msg.channel.send(helpMessage);
    }
}