import { useState, useEffect } from 'react';
import moment from 'moment';

// could do with refactoring later - but this is fairly simple for now
export const Timer = (props) => {
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        if (!props.won) {
            setTimeout(() => tick(), 1000);
        }
    });

    function tick() {
        setCurrentTime(moment());
    }

    function getTimeAsString() {
        const secondsTotal = currentTime.diff(props.timeGameStarted, 'seconds');
        if (secondsTotal <= 0) {
            return '00:00';
        }
        const duration = moment.duration(secondsTotal, 'seconds');
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        let returnString = '';

        returnString += hours ? '' + hours + ':' : '';
        returnString += minutes ? (minutes < 10 ? '0' : '') + minutes + ':' : '00:';
        returnString += seconds < 10 ? '0' + seconds : seconds;

        return returnString;
    }

    return (
        <div className="status__time">{getTimeAsString()}</div>
    )
}
