import React from "react";
import Klijent from "../../model/Klijent";
import { Container, Card, Table, Col, Row } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

interface KlijentiState{
  klijenti: Klijent[];
  pocetni: Klijent[];
  isUserLoggedIn: boolean;
  filter: string;
}
const Klijent_API_Base_URL = "http://localhost:9000/klijent";

export default class Klijenti extends React.Component{
  state: KlijentiState;
  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      klijenti: [],
      isUserLoggedIn: true,
      filter: '',
      pocetni: [],
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
            <InputGroup className="mb-3">
                  <InputGroup.Text>Pretraga klijenta po JMBG-u:</InputGroup.Text>
                  <Form.Control type="filter" id="filter" value={this.state.filter} onChange = {event => this.promena(event as any)} />
            </InputGroup>
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
        this.setState({pocetni: response.data})
 
    }).catch((error: any) => {
     this.setState({isUserLoggedIn: false});
    })
    }
private promena(event: React.ChangeEvent<HTMLInputElement>){
  //ako filter nije broj return;
  
      const newState  = Object.assign(this.state, {
       [ event.target.id ]: event.target.value,
      });

      this.setState(newState);

      if(this.state.filter === ''){
        const newState  = Object.assign(this.state, {
          klijenti: this.state.pocetni,
         });
   
         this.setState(newState); return;
      }
      //if(isNaN(this.state.filter)) return;
      //filtriraj klijente
      let noviKlijenti = [];
      for(let i = 0; i < this.state.klijenti.length; i++){
        let pr = Number(this.state.klijenti[i].jmbg);
        let p = pr.toString();
        let f = this.state.filter.toString();
        if(p.includes(f)){
            noviKlijenti.push(this.state.klijenti[i]);
        }
      }
      //setuj state klijenti
      if(noviKlijenti.length >= 1){
        const newState  = Object.assign(this.state, {
          klijenti:noviKlijenti,
         });
   
         this.setState(newState);
      }


    }
}