import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle ,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



    function RenderComments({comments}){
        if(comments != null){
           let dateformat = {year: "numeric", month: "short", day:"numeric"};

           return comments.map(comment => (
                <ul className="list-unstyled mt-3">
                    <li>{comment.comment}</li>
                    <li>{'-- '}{comment.author}{" "}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
              
            ));
        
        }
        else{
            return <div></div>;
        }
    }

    
    function RenderDish({dish}){
        if(dish != null){
            return (
                <Card  >
                <CardImg width="100%" src={dish.image}  alt={dish.name}></CardImg>
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
                <RenderComments comments={props.comments} />
            </div>
         </div>
        </div>
       
        )
    }



export default DishDetail ; 