import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import '../css/App.css';                                                            /* CSS */

class About extends Component {
    constructor() {
        super();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    render() {
        let bOrM = this.state.width > 768 ? '-big' : '-mini';
        return (
            <div className='container-fluid spark--main-container backdrop full-height' style={{ overflowY: 'auto' }}>
                <PageHeader title='About' />
                {bOrM === '-big' ? (
                    <Content>
                        <p>This is a sandbox site where I've been studying ReactJS concepts and implementing what I've learned here.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>This is a sandbox site where I've been studying ReactJS concepts and implementing what I've learned here.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>This is a sandbox site where I've been studying ReactJS concepts and implementing what I've learned here.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>This is a sandbox site where I've been studying ReactJS concepts and implementing what I've learned here.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                        <p>I've been using redux to work with global state and have created a set of backend files which allow users to read
                            and write to a database.</p><br />
                        <p>The end goal is to create a fully functional version of my flashcard study app which will allow users to save their
                            decks to a table in the database so that the files don't need to be stored locally on their computer.</p>
                    </Content>
                ) : (
                        <div style={{ padding: '0 1.25em' }}>
                            <h2 className='h2-section'>What is This Site?</h2>
                            <hr />
                            <p>This site started as a sandbox environment where I could practice different ReactJS principles as I learned them.
                            It was originally an area for testing proofs of concept which were never designed to be put to practical use, such
                            as calling external APIs that display information that can't be interacted with, learning how to modify state with React Redux
                            tools, and maintaining persistent memory across multiple sessions.
                            </p>
                            <br />
                            <p>It wasn't until I created a PostgreSQL database that this site started to take shape and I found a purpose for it. With a database
                            in place, the site now had potential storing large amounts of data long-term and for servicing multiple users (if I could get)
                            authentication figured out. After establishing successful authentication for user creation and successfully making calls to the
                            database to insert new data and delete or update existing data, I decided to create a a tool for people to study foreign languages,
                            especially Chinese.
                            </p>
                            <br />
                            <br />
                            <h2 className='h2-section'>Why Digital Flashcards?</h2>
                            <hr />
                            <p>Before going into web design and development, I'd previous studied and earned a degree in Mandarin Chinese from Brigham Young University.
                            Study sessions were hard and discouraging, not necessarily because the language was too difficult, but because it was hard to find the most
                            effective way of studying. Should I study characters, pronunciation, and definition all together at once or split it into multiple study sessions
                            of pronunciation-definition, definition-character, pronunciation-character, etc?</p>
                            <br />
                            <p>Another difficult aspect of study was cycling through flashcards. Some words I would encounter multiple times even though I already knew those
                            words from early on in the study session. I needed a way to keep track of what words I knew well enough to remove from the deck after I felt
                            I'd mastered that word. Keeping a tally proved to be distracting and tedious which caused serious disruptions in study sessions. Ideally, a card
                            would track the number of times I'd answered it correctly and automatically remove itself from the deck so I could focus on mastering the words
                            I was still struggling with. And that's what this site does for users.</p>
                            <br />
                            <br />
                            <h2 className='h2-section'>How Does It Work?</h2>
                            <hr />
                            <p> Users can create as many digital decks of flashcards as they want, each containing as many cards as
                            they want (though I recommend a max limit of 20). After decks have been created, users can go to their deck collection and choose to review
                            cards, edit the deck, or delete it entirely. During quiz mode, users can choose for the cards to either display a Chinese word or phrase and be
                            prompted to provide the English translation or display an English word or definition to translate into Chinese. In case there's a particular word
                            whose definition is right on the edge of the user's memory, there's an option to skip that card to be revisited later. There's also an option for
                            users to see the pronunciation of the word in case they need to hint to push them in the right direction.
                            </p>
                            <p>Each time a card has been answered correctly it tallies the number of correct answers. Answering incorrectly doesn't count against you, it simply
                            won't increase the number of total correct answers. Once a card has been answered correctly five times, it will be removed from the deck until
                            there are no more cards remaining.
                            </p>
                            <br />
                            <br />
                            <h2 className='h2-section'>Who Are You?</h2>
                            <p></p>
                        </div>
                    )}
            </div>
        );
    };
}

export default connect()(About);
