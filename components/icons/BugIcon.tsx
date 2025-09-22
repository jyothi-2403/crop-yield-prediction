
import React from 'react';

export const BugIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12s4.03 8.25 9 8.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l-1.5 1.5M15.75 4.5l1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l-1.5 1.5M19.5 15.75l1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5L5.25 21M17.25 19.5l1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25L3 6.75M19.5 8.25l1.5-1.5" />
    </svg>
);
