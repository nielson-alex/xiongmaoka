import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { DDLField, TextField } from '../../helpers/functional-components/DataPostSubs';
import { GET, POST } from '../../helpers/API/service-calls'                             /* Service calls */
import '../../css/App.css';                                                             /* CSS */

const genderOptions = [
    { label: 'Male', name: 'gender', value: 'Male' },
    { label: 'Female', name: 'gender', value: 'Female' },
];

const zodiacOptions = [
    { label: 'Aquarius', name: 'zodiac', value: 'Aquarius' },
    { label: 'Aries', name: 'zodiac', value: 'Aries' },
    { label: 'Taurus', name: 'zodiac', value: 'Taurus' },
    { label: 'Gemini', name: 'zodiac', value: 'Gemini' },
    { label: 'Cancer', name: 'zodiac', value: 'Cancer' },
    { label: 'Leo', name: 'zodiac', value: 'Leo' },
    { label: 'Virgo', name: 'zodiac', value: 'Virgo' },
    { label: 'Libra', name: 'zodiac', value: 'Libra' },
    { label: 'Scorpio', name: 'zodiac', value: 'Scorpio' },
    { label: 'Saggitarius', name: 'zodiac', value: 'Saggitarius' },
    { label: 'Capricorn', name: 'zodiac', value: 'Capricorn' }
];

class DatabasePost extends Component {
    constructor() {
        super();
        this.state = {
            tableName: '',
            columnNames: [],
            values: [],
        };

        this.handleDDLChange = this.handleDDLChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleGet = this.handleGet.bind(this);
    }

    async componentDidMount() { await GET('/getUsers'); }

    handleDDLChange(e) { this.setState({ [e.name]: e.value, }); }

    handleChange(e) { this.setState({ [e.target.name]: e.target.value, }); }

    async handlePost() {
        POST('/signup', { first_name: this.state.first_name, last_name: this.state.lastName, age: parseInt(this.state.age), gender: this.state.gender, zodiac: this.state.zodiac });
    }

    async handleGet() { await GET('/getUsers') }

    render() {
        return (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <PageHeader title='POST' url='/database-dash' />
                <Content>
                    <button onClick={this.handleGet}>Get Users</button>
                    <label htmlFor='tbTableName'>Table Name: </label>
                    <input
                        type='text'
                        id='tbTableName'
                        value={this.state.tableName}
                        onChange={(e) => this.handleChange(e)} />
                    <TextField
                        id='tbFirstName'
                        label='First Name'
                        type='text'
                        value={this.state.firstName}
                        onChange={(e) => this.handleChange(e)} />
                    <TextField
                        id='tbLastName'
                        label='Last Name'
                        type='text'
                        value={this.state.lastName}
                        onChange={(e) => this.handleChange(e)} />
                    <TextField
                        id='tbAge'
                        label='Age'
                        type='number'
                        value={this.state.age}
                        onChange={(e) => this.handleChange(e)} />
                    <DDLField id='ddlGender' label='Gender' options={genderOptions} onChange={e => this.handleDDLChange(e)} />
                    <DDLField id='ddlZodiac' label='Zodiac Sign' options={zodiacOptions} onChange={e => this.handleDDLChange(e)} />

                    <div>
                        <button onClick={this.handlePost}>Post</button>
                    </div>
                </Content>
            </div>
        );
    };
}

export default connect()(DatabasePost);
