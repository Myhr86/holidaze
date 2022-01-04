import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function DatePicker() {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())

    function onChange (calDate) {
    setCalDate(calDate)

    


}

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
        </div>
    )

}
