import React from 'react';
import { Link } from 'react-router-dom';

export const PageHeader = ({ title, url }) => (
    <>
        <div className='col-12 title-container'>
            <p className='title-text'>{title}</p>
        </div>
        <hr className='hr' />
        <div>
            <div className='row'>
                <div className='col-1' />
                <div className='col-10 back-button'>
                    {url ? (<Link to={url}><p>Back</p></Link>) : (<p>&nbsp;</p>)}
                </div>
            </div>
        </div>
    </>
);

export const Content = ({ children, bOrM }) => {
    return (
        <div className={`col-8 card content content-cushion`} style={{ height: '80vh', overflowY: 'auto' }}>
            <div className='row'>
                <div className='col-11 middle-align' style={{ overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}