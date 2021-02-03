import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const DGroup = ({ text, children, condition }) => (
    condition ? (
        <Accordion>
            <Accordion.Toggle as={Card.Header} id='dashboard--side-menu-collapse' eventKey={'0'}>
                <h2 className='dashboard--side-menu-h2'>{text}</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
                <div>
                    {children}
                </div>
            </Accordion.Collapse>
        </Accordion >) : (
            <div />
        )
);

export const DLink = ({ k, to, text, condition, icon }) => (
    condition ? (
        <Link className='item desktop-item' key={k} to={`/dashboard/${to}`} id='mid-nav-option'>
            <i className={icon} />
      &nbsp;
            {text}
        </Link>
    ) : (
            <div />
        )
);

export const MGroup = ({ text, children }) => (
    <Accordion>
        <Accordion.Toggle as={Card.Header} id='dashboard--side-menu-collapse' eventKey='0'>
            <h2 className='dashboard--mobile-menu-h2'>{text}</h2>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
            <>{children}</>
        </Accordion.Collapse>
    </Accordion>
);

export const MLink = ({ to, text, icon, onClick }) => (
    <Link className='item' to={to}>
        <h2 id='mobile-nav-option' onClick={onClick}>
            <p id='mobile-nav-option-text'>{text}</p>
        </h2>
    </Link>
);