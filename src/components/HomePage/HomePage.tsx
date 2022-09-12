import React from 'react';
import { Container, Card, Table, Col, Row } from 'react-bootstrap';
import Polisa from '../../model/Polisa';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

interface AppState{
  isUserLoggedIn: boolean;
  polise: Polisa[];

}
const Polisa_API_Base_URL = "http://localhost:9000/polisa";

class App extends React.Component {

  state: AppState;

    constructor(props: Readonly<{}>){
      super(props);
      this.state = {
        isUserLoggedIn: true,
        polise: [],
      };
    }

    componentDidMount(): void {
      this.getPolise();
    }
    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
      this.getPolise();
    }

  render(): React.ReactNode {

    if(this.state.isUserLoggedIn === false){
      return(
        <Redirect to="/login" />
      );
    }

  return (
    <Container>
      <Card>
        <Card.Title className='text-center'><h3>Polise</h3></Card.Title>
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
       this.setState({polise: response.data})

   }).catch((error: any) => {
    this.setState({isUserLoggedIn: false});
   })
  }

}

export default App;
