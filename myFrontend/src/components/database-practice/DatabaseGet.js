import React, { Component } from 'react';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { GET } from '../../helpers/API/service-calls';                                  /* Service calls */
import '../../css/App.css';                                                             /* CSS */

export default class DatabaseGet extends Component {
    render() {
        return (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <PageHeader title='GET' url='/database-dash' />
                <Content>
                    <button onClick={async () => await (GET('/getUsernames').then(res => console.log(res)))}>Get Users</button>
                </Content>
            </div>
        );
    };
}