import 'bootstrap/dist/css/bootstrap.css';
import './MainComponent.css';
import React,{Component } from "react";
import {Card, CardText,Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter}from '@fortawesome/free-brands-svg-icons';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';

class MainComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            quotes:[],
            colors:['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
                    '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", 
                    "#77B1A9", "#73A857"],
            indexC:0,
            indexQ:0,
            visible:true
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
        .then(response=>response.json())
        .then(quotes=>this.setState({quotes:quotes}),()=>{
            this.handleSubmit();
        });
        this.handleSubmit();
    }
    handleSubmit=async()=>{
        await this.setState({
            visible:!this.state.visible
        });
        await setTimeout(()=>{
            this.setState({
                indexQ:Math.floor(Math.random()*102),
                indexC:Math.floor(Math.random()*this.state.colors.length)
                })
            },300);
        await setTimeout(()=>{
        this.setState({
            visible:!this.state.visible
        });
        },300)
    }
    render(){
        // console.log(this.state.quotes);
        return(
            <div style={{
                backgroundColor: this.state.colors[this.state.indexC],
                width: '100vw',
                height: '100vh'
              }} id="mainBody" className={this.state.visible?"fadeIn":"fadeOut"}>
                <Card id="quote-box" className='col-md-4 col-12' style={styles}>
                    <div className="row" style={{color:this.state.colors[this.state.indexC]}}>
                        <CardText id="text" className='col-12 text-center' style={{fontSize:'1.75em',marginTop:10}}>
                        <FontAwesomeIcon icon={faQuoteLeft} size={'1x'} /> {this.state.quotes.length?this.state.quotes[this.state.indexQ].quote:null}
                        </CardText>
                    </div>
                    <div className="row" style={{color:this.state.colors[this.state.indexC],display:'flex',justifyContent:'flex-end',marginTop:10}}>
                        <CardText id="author" className="mr-3">
                            -{this.state.quotes.length?this.state.quotes[this.state.indexQ].author:null}
                        </CardText>
                    </div>
                    <br/>
                    <div className="row" style={{color:this.state.colors[this.state.indexC]}}>
                        <div className="col-6">
                            <Button style={{backgroundColor:this.state.colors[this.state.indexC]}}>
                                <FontAwesomeIcon icon={faTwitter} />
                                <a id="tweet-quote" href="https://twitter.com/intent/tweet"></a>
                            </Button>
                        </div>
                        <div className="col-6" style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button type="submit" id="new-quote" onClick={this.handleSubmit} 
                            style={{backgroundColor:this.state.colors[this.state.indexC]}}>New Quote</Button>
                        </div>
                    </div>
                    <br/>
                </Card>
            </div>
        );
    }
}
export default MainComponent;
const styles ={
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight:400
};
