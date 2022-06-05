import React, { Component } from 'react'
import { Quizdata } from './Quizdata'
import './sytle.css' 


export class Quiz extends Component {


       constructor(props) {
         super(props)
       
         this.state = { 
            userAnswer:null,   
            currentIndex:0,  
            options: [],       
            quizEnd: false, 
            score: 0,      
            disabled: true,




            
         }
       }
       loadQuiz = () => {
        const {currentIndex} = this.state //get the current index
        this.setState(() => {
            return {
                question: Quizdata[currentIndex].question,
                options : Quizdata[currentIndex].options,
                answer: Quizdata[currentIndex].answer          
            }
        }
        )
    }
    nextQuestionHander = () => {
        const {userAnswer, answer, score} = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
    
        
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }
    }
    componentDidMount(){
        this.loadQuiz();
    }
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }
    
componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex !== prevState.currentIndex){
        this.setState(() => {
            return {
                disabled: true,
                question: Quizdata[currentIndex].question,
                options : Quizdata[currentIndex].options,
                answer: Quizdata[currentIndex].answer          
            }
        });

    }
}
finishHandler =() => {
    if(this.state.currentIndex === Quizdata.length -1){
        this.setState({
            quizEnd:true
        })
    }

}
    


  render() {
      const{question,options,currentIndex ,userAnswer,quizEnd}=this.state
       
        if(quizEnd){
            return(
                <div>
                    <h1>Gameover.Final score is{this.state.score}points</h1>
                    <p>The correct answer for the quizes are </p>
                    <ul>
                        {Quizdata.map((item,index) => (
                            <li className='options'
                            key={index}>
                                {item.answer}
                            </li>
                        ))}
                        
                         
                    </ul>
                </div>
            )
        }
      
        return (
            <div>
                <h2>{question}</h2>
                <span>{`Question ${currentIndex + 1} of ${Quizdata.length}`}</span>
                {
                    options.map(option => 
                      <p key={option.id}className={`options ${userAnswer === Option? "selected" :null}`}
                      onClick = {()=> this.checkAnswer(option)}
                      >
      
                         {option}           
      
                      </p>
      
                      )
                }
                {currentIndex < Quizdata.length - 1 &&
                
                <button disabled={this.state.disabled}onClick={this.nextQuestionHander}>
                    Next Question
                </button>
                
                }
                {currentIndex === Quizdata.length -1 &&
                <button onClick={this.finishHandler}disabled={this.state.disabled}>
                    Finish
                    
                </button>
                }
            </div>
          )
      
     
  }
}

export default Quiz 