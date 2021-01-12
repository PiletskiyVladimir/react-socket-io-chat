import React from 'react';

import './emptypage.css';

function EmptyPage () {
    return (
        <div className="messages-block">
            <p className="empty-page-message">
                Your dialog history is empty
            </p>
        </div>
    )
}

export default EmptyPage;