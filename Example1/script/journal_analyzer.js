var gatherCorrelations = (function () {
    'use strict';

    function phi(table) {
        return (table[3] * table[0] - table[2] * table[1]) /
            Math.sqrt((table[2] + table[3]) *
                      (table[0] + table[1]) *
                      (table[1] + table[3]) *
                      (table[0] + table[2]));
    }

    function hasEvent(event, entry) {
        return entry.events.indexOf(event) !== -1;
    }

    function tableFor(event, journal) {
        var table = [0, 0, 0, 0],
            entry,
            index,
            i;

        for (i = 0; i < journal.length; i++) {
            entry = journal[i];
            index = 0;
            if (hasEvent(event, entry)) {
                index += 1;
            }
            if (entry.squirrel) {
                index += 2;
            }
            table[index] += 1;
        }
        return table;
    }

    return function (journal) {
        var phis = {},
            events,
            event,
            entry,
            i;

        for (entry = 0; entry < journal.length; entry++) {
            events = journal[entry].events;
            for (i = 0; i < events.length; i++) {
                event = events[i];
                if (!(event.hasOwnProperty('phis'))) {
                    phis[event] = phi(tableFor(event, journal));
                }
            }
        }
        return phis;
    };
}());