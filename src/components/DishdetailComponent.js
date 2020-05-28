import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class DishDetail extends Component{

    renderComments(comments){
        if(comments != null){
            let dateformat = {year: "numeric", month: "numeric", day:"numeric"};
            return comments.map(comment => (
                <ul className="list-unstyled mt-3">
                    <li>{comment.comment}</li>
                    <li>{'-- '}{comment.author}{" "}{new Date(comment.date).toLocaleDateString("end-US",dateformat)}</li>
                </ul>
              
            
            ));
        }
        else{
            return <div></div>;
        }
    }

    renderDish(dish){
        if(dish != null){
            return (
                <Card>
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


    render(){
        const { dish } = this.props

        return(
        <div className='row'>
            <div className="col-12 col-sm-5  m-1">
                {this.renderDish(dish)}
            </div>
            <div className="col-12 col-sm-5 m-1">
                <h4>Comments</h4>
                {this.renderComments(dish.comments)}
            </div>
         </div>
        )
    }

}

export default DishDetail ; 