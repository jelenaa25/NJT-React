import React from "react";
import Klijent from "../../model/Klijent";
import { Container, Card, Table, Col, Row } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

interface KlijentiState{
  klijenti: Klijent[];
  isUserLoggedIn: boolean;
}
const Klijent_API_Base_URL = "http://localhost:9000/klijent";

export default class Klijenti extends React.Component{
  state: KlijentiState;
  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      klijenti: [],
      isUserLoggedIn: true,
    };
  }

  componentDidMount(): void {
    this.getKlijenti();
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
            <Card.Title className='text-center'><h3>Klijenti</h3></Card.Title>
            <Row>
              {this.state.klijenti.map(this.singleKlijent)}
            </Row>
          </Card>
    
    
        </Container>        
          );
    }

    private singleKlijent(klijent: Klijent){
      return(

        <Col md = "3">
        <Card>
          <Card.Body>
            <Card.Title>
              {`ID: ${klijent.id}`}
            </Card.Title>
            <Card.Text>{`Ime i prezime: ${klijent.imePrezime}`}</Card.Text>
            <Card.Text>{`Mesto: ${klijent.mesto}`}</Card.Text>
            <Card.Text>{`JMBG: ${klijent.jmbg}`}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      );

    }

    private getKlijenti(){
      axios.get(Klijent_API_Base_URL, {headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "*",
      }}).then((response: any) => {
        this.setState({klijenti: response.data})
 
    }).catch((error: any) => {
     this.setState({isUserLoggedIn: false});
    })
    }
}