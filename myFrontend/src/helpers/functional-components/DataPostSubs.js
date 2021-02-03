import React from 'react';
import Select from 'react-select';
import { lowerCaseFirstLetter } from '../../helpers/reusable-functions';                /* Helper functions */

export const DDLField = ({ id, label, options, onChange }) => (
    <div className='row'>
        <div className='col-12'>
            <label htmlFor={id}>{label}:&nbsp;</label>
            <Select id={id} options={options} onChange={onChange} />
        </div>
    </div>
);

export const TextField = ({ id, label, type, value, onChange }) => (
    <div className='row'>
        <div className='col-12'>
            <label htmlFor={id}>{label}:&nbsp;</label>
            <input
                type={type}
                id={id}
                name={lowerCaseFirstLetter(id.substr(2, id.length))}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);