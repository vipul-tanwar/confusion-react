import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle ,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,  FormGroup, Input, Form,  Label , Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


    class CommentForm extends Component{

        constructor(props){
            super(props);
            this.state = {
                isModal: false
            };
            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
    
        
        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                     <span className="fa fa-pencil fa-lg" ></span> Submit Comment
                    </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={{size:12}}>
                                        <Control.select
                                            model=".rating" 
                                            name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12} >
                                        <Control.text
                                         model=".author" 
                                         id="author"
                                         name="author"
                                         className="form-control" 
                                         placeholder="Your Name" 
                                         validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                        <Errors
                                         className="text-danger"
                                         model=".author"
                                         show="touched"
                                         messages={{
                                         required: 'Required ',
                                         minLength: 'Must be greater than 2 characters',
                                         maxLength: 'Must br 15 characters or less'
                                        }} 
                                />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col>
                                        <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment" 
                                        className="form-control" 
                                        rows="6"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col >
                                        <Button type="Submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }

    }

    

    function RenderComments({comments , postComment, dishId}){
        if(comments != null){
           let dateformat = {year: "numeric", month: "short", day:"numeric"};

            const commentview = comments.map(comment => {
                return (
                <ul className="list-unstyled mt-3">
                    <li>{comment.comment}</li>
                    <li>{'-- '}{comment.author}{" , "}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
                )
            }
            )
            return(
                <div>
                    <div>
                        {commentview}
                    </div>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            )
        
        }
        else{
            return <div></div>;
        }
    }

    
    function RenderDish({dish}){
        if(dish != null){
            return (
                <Card  >
                <CardImg width="100%" src={baseUrl + dish.image}  alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
            )
        }
        else{
            return <div></div>;
        }

    }


    const DishDetail = (props) => {
    
        // const { dish } = this.props
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        {
            return(
                <div className="container">
                     <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb >
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                            </div>
                    </div>  
                    
                <div className='row'>
                    <div className="col-12 col-sm-5  m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-sm-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                 </div>
                </div>
               
                )
        }
        
    }



export default DishDetail ; 