import React from 'react';

export const MicroscopeIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l-3 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10a5 5 0 11-10 0 5 5 0 0110 0z" />
    </svg>
);
