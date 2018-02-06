'use strict';
import RequestUtils from '../utils/RequestUtils';

export default class WatchdogCommand {
    constructor(msg) {
        const request = new RequestUtils();
        let watchdogMessage = '```\n';
        msg.reply('Here are the current Watchdog stats:');
        request._request('watchdogstats', null, null, (err, watchdog) => {
            if(err != null) {
                msg.channel.send('Whoops! Something went wrong. Try again later...')
            }

            for(const i in watchdog) {
                switch(i) {
                    case 'watchdog_lastMinute':
                        watchdogMessage += 'Bans in the last minute: ' + watchdog[i] + '\n';
                        break;
                    case 'staff_rollingDaily':
                        watchdogMessage += 'Bans by staff in the last day: ' + watchdog[i] + '\n';
                        break;
                    case 'watchdog_total':
                        watchdogMessage += 'Total Watchdog bans: ' + watchdog[i] + '\n';
                        break;
                    case 'watchdog_rollingDaily':
                        watchdogMessage += 'Bans in the last day: ' + watchdog[i] + '\n';
                        break;
                    case 'staff_total':
                        watchdogMessage += 'Total staff bans: ' + watchdog[i] + '\n';
                        break;
                }
            }
            watchdogMessage += '```';
            msg.channel.send(watchdogMessage);
        });
    }
}