'use strict';
import HelpCommand from './HelpCommand';
import WatchdogCommand from './WatchdogCommand';

export default class Commands {
    constructor(msg, args) {
        switch(args[0]) {
            case 'help':
                new HelpCommand(msg);
                break;

            case 'watchdog':
                new WatchdogCommand(msg);
                break;
        }
    }
}