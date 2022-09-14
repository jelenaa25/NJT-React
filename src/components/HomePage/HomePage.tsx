import React from 'react';
import { Container, Card, Table, Col, Row, Form, Button } from 'react-bootstrap';
import Polisa from '../../model/Polisa';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

interface AppState{
  isUserLoggedIn: boolean;
  polise: Polisa[];
  klijent: string;

}
const Polisa_API_Base_URL = "http://localhost:9000/polisa";

class App extends React.Component {

  state: AppState;

    constructor(props: Readonly<{}>){
      super(props);
      this.state = {
        isUserLoggedIn: true,
        polise: [],
        klijent: '',
      };
    }

    componentDidMount(): void {
      this.getPolise();
    }
    
    private nadjiPolise(){
     
     if(this.state.klijent === ''){
      this.getPolise(); return;
     };
      
      axios.get(Polisa_API_Base_URL+'/spec/'+this.state.klijent, {headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
       // 'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Origin": "*",
       // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
       //'Content-Type': 'application/json'
       // "proxy": "http://localhost:3000"
      }}).then((response: any) => {
        console.log("POLISE:"+response.data);
       this.promena1(response.data); 
       console.log("MOJE POLI KOJE SE NE MENJAJU.."+this.state.polise.length)
     }).catch((error: any) => {
      this.setState({isUserLoggedIn: false});
     })

      
    }

  render(): React.ReactNode {

    if(this.state.isUserLoggedIn === false){
      return(
        <Redirect to="/login" />
      );
    }
    

  return (
    <Container>
      <Card >
        <Card.Title className='text-center'><h3>Polise</h3></Card.Title>
        <Col md= {{span: 6, offset: 3}}>
        <Form >
        <Form.Group>
       
                        <Form.Label htmlFor="klijent" className='text-bold'>Unesite ime i prezime klijenta:</Form.Label>
                        <Form.Control type="klijent" id="klijent" value={this.state.klijent} style = {{"marginBottom": "10px"}} onChange = {event => this.promena(event as any)} />
        </Form.Group>
        <Form.Group>
        <Button variant="primary" style={{'marginTop': '10px', 'marginBottom': '10px'}} onClick = {() => this.nadjiPolise()}>Pretrazi</Button>
        </Form.Group>
        </Form> 
        </Col>
       
        <Row>
          {this.state.polise.map(this.singlePolisa)}
        </Row>
      </Card>


    </Container>           
            
  );

  }
  private singlePolisa(polisa: Polisa){
    return(
      <Col md = "3">
        <Card>
          <Card.Body>
            <Card.Title>
              {`ID: ${polisa.polisaID}`}
            </Card.Title>
            <Card.Text>{`Ukupna premija: ${polisa.ukupnaPremija}`}</Card.Text>
            <Card.Text>{`Gradjevinska vrednost: ${polisa.gradjevinskaVrednost}`}</Card.Text>
            <Link to= {`/create-or-update-polisa/${polisa.polisaID}`} className = "btn btn-primary">Ucitaj polisu</Link>
          </Card.Body>
        </Card>
      </Col>
    ); 

  }
 
  private getPolise(){
    axios.get(Polisa_API_Base_URL, {headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
     // 'Access-Control-Allow-Headers': '*',
      "Access-Control-Allow-Origin": "*",
     // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
     //'Content-Type': 'application/json'
     // "proxy": "http://localhost:3000"
    }}).then((response: any) => {
      //this.setState({polise: response.data})
      this.promena1(response.data);
   }).catch((error: any) => {
    this.setState({isUserLoggedIn: false});
   })
  }

  private promena(event: React.ChangeEvent<HTMLInputElement>){
    const newState  = Object.assign(this.state, {
     [ event.target.id ]: event.target.value,
    });

    this.setState(newState);
  }

  private promena1(data: any){
    const newState  = Object.assign(this.state, {
     polise: data,
    });

    this.setState(newState);
  }


}

export default App;
