import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComments, clearComments, addComment } from '../../actions/commentActions';
import { updatePost } from '../../actions/postActions';

class Comment extends Component {
  state = {
    comment: ''
  };

  componentDidMount() {
    this.props.getComments(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearComments();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.comment) return;

    const newComment = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      comment: this.state.comment
    };

    const newPost = {
      comments: this.props.post_comments+1
    };

    this.props.addComment(this.props.post_id, newComment);
    this.props.updatePost(this.props.post_id, newPost);
    this.setState({ comment: '' });
  };

  render() {
    const { comments } = this.props.comment;

    return(
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <Col>
              <Input
                type='textarea'
                name='comment'
                id='comment'
                value={this.state.comment}
                placeholder='Comment'
                onChange={this.onChange}
                style={{ marginTop: '1rem' }}
               />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 3, order: 2, offset: 9 }}>
              <Button
                color='dark'
                size='sm'
                style={{ marginTop: '1rem', marginBottom: '1rem' }} block
              >
                Comment
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                <TransitionGroup className='comments'>
                  {comments.map(({ id, name, comment, date }) => (
                    <CSSTransition key={id} timeout={500} classNames='fade'>
                      <ListGroupItem>
                        <Row>
                          <ListGroupItemHeading style={{ marginRight: '1rem' }}>
                            {name}
                          </ListGroupItemHeading>
                          {date}
                        </Row>
                        {comment}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

Comment.propTypes = {
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComments, clearComments, addComment, updatePost }
)(Comment);
