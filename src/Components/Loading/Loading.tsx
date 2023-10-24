import React, { FC } from 'react';

// Style
import './Loading.css';

const Loading:FC = () => {
    return (
        <div className="spinner_container">
            <span className="spinner">
                <span /><span /><span /><span />
            </span>
        </div>
    )
}

export default Loading;
