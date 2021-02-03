import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import LogIn from './components/LogIn';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import FlashcardsDash from './components/flashcards/FlashcardsDash';
import DeckCollection from './components/flashcards/DeckCollection';
import Deck from './components/flashcards/Deck';
import EditDeck from './components/flashcards/EditDeck';
import DatabaseDash from './components/database-practice/DatabaseDash';
import DatabasePost from './components/database-practice/DatabasePost';
import DatabaseGet from './components/database-practice/DatabaseGet';
import Shop from './components/shop/Shop';
import ItemDetails from './components/shop/ItemDetails';
import Counter from './components/Counter';
import Post from './components/Post';
import Weather from './components/Weather';

export default (
    <>
        <Nav />
        <Switch>
            <Route exact path='/' component={LogIn} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/flashcards-dash' exact component={FlashcardsDash} />
            <Route path='/flashcards/deck-collection' component={DeckCollection} />
            <Route path='/flashcards/deck:id' component={Deck} />
            <Route path='/flashcards/edit-deck:id' component={EditDeck} />
            <Route path='/database-dash' exact component={DatabaseDash} />
            <Route path='/database-dash/post' component={DatabasePost} />
            <Route path='/database-dash/get' component={DatabaseGet} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/shop/:id' component={ItemDetails} />
            <Route path='/counter' component={Counter} />
            <Route path='/post' component={Post} />
            <Route path='/weather' component={Weather} />
        </Switch>
    </>
);