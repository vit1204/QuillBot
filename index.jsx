import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState('Hello, React!');

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <p>{message}</p>
        </div>
    );
}

export default App;
