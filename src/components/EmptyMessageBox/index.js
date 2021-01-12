import React from 'react';

import './emptymessagebox.css';

function EmptyMessageBox () {
    return (
        <div className="empty-message-box">
            <p className="empty-box-message">
                Choose a dialog to see dialog history
            </p>
        </div>
    )
}

export default EmptyMessageBox;