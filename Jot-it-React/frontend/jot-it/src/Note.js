import React from 'react';
import { useState } from 'react';

export default function ControlledComponent() {
    const [note, setNote] = useState('');

    const handleChange = (event) => {
        setNote(event.target.value);
        console.log("Event has been logged:, ", event.target.value);
    }

    return (
        <input
            placeholder="Insert Note"
            type="text"
            value={note}
            onChange={handleChange}
        >
        </input>
    );
}

