import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class DishDetail extends Component{

    // constructor(props){
    //     super(props);
    // }
    // renderComments(comments){
    //     if(comments != null){
     
    //         // let dateformat = {year: "numeric", month: "short", day:"numeric"};
    //         // return comments.map(comment => (
    //         //     <ul className="list-unstyled mt-3">
    //         //         <li>{comment.comment}</li>
    //         //         <li>{'-- '}{comment.author}{" "}{new Date(comment.date).toLocaleDateString("end-US",dateformat)}</li>
    //         //     </ul>
              
            
    //         // ));
    //     }
    //     else{
    //         return <div></div>;
    //     }
    // }

    renderComments(dish){
        if(dish != null){
           let dateformat = {year: "numeric", month: "short", day:"numeric"};

           return dish.comments.map(comment => (
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



    renderDish(dish){
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


    render(){
        const { dish } = this.props

        return(
        <div className="container">
        <div className='row'>
            <div className="col-12 col-sm-5  m-1">
                {this.renderDish(dish)}
            </div>
            <div className="col-12 col-sm-5 m-1">
                <h4>Comments</h4>
                {this.renderComments(dish)}
            </div>
         </div>
        </div>
       
        )
    }

}

export default DishDetail ; 