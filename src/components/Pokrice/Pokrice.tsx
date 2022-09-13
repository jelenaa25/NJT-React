import React, { Component } from 'react';
import Pokrice from "../../model/Pokrice";
import Mesto from "../../model/Mesto";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { isElementAccessExpression } from 'typescript';
import { Card, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';

interface PokriceState{
    isUserLoggedIn: boolean;
    pokrice: Pokrice;
    vratiNaSva: boolean;
    idPok: number | string;
    
}
const Pokrica_API_Base_URL = "http://localhost:9000/pokrice";

interface PokriceProperties{
    match: {
        params: {
            id: number | string; //id isit taj naziv kao sto si stavila u route
        }
    }

}
export default class Pokrice1 extends React.Component<PokriceProperties> {
    state: PokriceState;
    constructor(props: Readonly<PokriceProperties>){

        super(props)
        this.state = {
          isUserLoggedIn: true,
           pokrice: new Pokrice(),
           vratiNaSva: false,
           idPok: '_add',
           
        }

       
    }
    componentDidMount(){
        
        if(this.props.match.params.id === '_add'){
            return; //samo izadji
        }
        //ako ima id broj ucitaj pokrice!!!
        this.setState({idPok: this.props.match.params.id})
        axios.get(Pokrica_API_Base_URL+ '/'+ this.props.match.params.id, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({pokrice: response.data})
     
        }).catch((error: any) => {
         this.setState({isUserLoggedIn: false});
        })
    }
    getTitle(){
        if(this.props.match.params.id === '_add'){
            return <Card.Title className='text-center'>Kreiranje pokrica</Card.Title>
        }else return <Card.Title className='text-center'>Evidencija pokrica</Card.Title>

    }
    
    sacuvajPokrice() {
        ////////validacijaaaaaaaaaaaaaaa
        //console.log("PARAM"+this.state.idPok)
    
        if(this.props.match.params.id === '_add'){
            const p = {
                naziv: this.state.pokrice.naziv,
                napomena: this.state.pokrice.napomena,
            }
        axios.post(Pokrica_API_Base_URL, p, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            //preusmeri na sva pokrica.......
            this.setState({vratiNaSva: true});
            console.log("USPESNO SACUVANO!!");
     
        }).catch((error: any) => {
            console.log("DOSLO JE DO GRESKE pri cuvanju...!!!");
        // this.setState({isUserLoggedIn: false});
        })
        }else {
            axios.put(Pokrica_API_Base_URL + '/'+this.props.match.params.id, this.state.pokrice, {headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Access-Control-Allow-Origin": "*",
              }}).then((response: any) => {
                //preusmeri na sva pokrica.......
                console.log("USPESNO PROEMNJENO!!");
                this.setState({vratiNaSva: true});
         
            }).catch((error: any) => {
                console.log("DOSLO JE DO GRESKE pri proemni!!!");
             this.setState({isUserLoggedIn: false});
            })
        }
      
    }
    /*validateNaziv(naziv){
        if(naziv.length !== 0){
            return true;
        }else{
            document.getElementById("n").innerHTML = "Naziv je obavezno polje.";
            return false;
        }
    }*/
    private promena(event: React.ChangeEvent<HTMLInputElement>){
        const newState  = Object.assign(this.state.pokrice, {
         [ event.target.id ]: event.target.value,
        });
  
        this.setState(newState);
      }
    
    render() {
        if(this.state.isUserLoggedIn === false){
            return(
              <Redirect to="/login" />
            );
        }
        if(this.state.vratiNaSva === true){
            return(
              <Redirect to="/pokrica" />
            );
          }
        return (
            <div className='center'>
                <Container>

                    <Col md= {{span: 6, offset: 3}}>
                        <Card>
                            {
                                this.getTitle()
                            }
                            <Card.Body>
                                <Form>
                                    <FormGroup>
                                        <Form.Label htmlFor="naziv">Naziv:</Form.Label>
                                        <Form.Control type="naziv" id="naziv" value={this.state.pokrice.naziv} onChange = {event => this.promena(event as any)} />
                                    </FormGroup>
                                    <p id="n" className='text-danger'></p>

                                    <FormGroup>
                                        <Form.Label htmlFor="napomena">Napomena:</Form.Label>
                                        <Form.Control type="napomena" id="napomena" value={this.state.pokrice.napomena}  onChange = {event => this.promena(event as any)} />
                                    </FormGroup>
                                    <FormGroup>
                                    <button className='btn btn-success' onClick={() => this.sacuvajPokrice()} style={{ marginTop: "10px"}}>Sacuvaj</button>
                                    <Link className='btn btn-danger' to='/pokrica' style={{marginLeft: "10px", marginTop: "10px"}}>Otkazi</Link>
                                    </FormGroup>
                                </Form>
                            </Card.Body>

                        </Card>
                    </Col>
                </Container>

            </div>
        );
    }
}

