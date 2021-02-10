import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';                        /* CSS */

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount = () => window.addEventListener('resize', this.updateWindowDimensions);
    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions);
    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

    fetchItem = async () => {
        const itemDetails = await fetch(
            `https://fortnite-api.theapinetwork.com/item/get?id=${this.props.match.params.id}`
        ).then((res) => res.json());

        this.setState({
            itemDetails: itemDetails.data.item,
        });
    };

    handleDelete = () => {
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/');
    };

    render() {
        // const post = this.props.post ? (
        const post = <>
            <div>
                {/* <h1>{this.props && this.post.title ? this.props.post.title : ''}</h1>
                <p>{this.props && this.post.body ? this.props.post.body : ''}</p> */}
            </div>
            <div>
                <input type='button' onClick={this.handleDelete} value='Delete Post' />
            </div>
        </>
        // ) : (
        //         <div className='center'>Loading post...</div>
        //     );
        return post;
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = parseInt(ownProps.match.params.post_id, 10);

    return {
        post: state.posts.find((post) => post.id === id)
    };
}

const mapDispatchToProps = (dispatch) => ({ deletePost: (id) => dispatch({ type: 'DELETE_POST', id: id }) });

export default connect(mapStateToProps, mapDispatchToProps)(Post);
