import React from "react";
import axios from 'axios';
import { Container, Card, Table, Col, Row } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import Pokrice from "../../model/Pokrice";

interface PokriceState{
    pokrica: Pokrice[];
    isUserLoggedIn: boolean;
}
const Pokrica_API_Base_URL = "http://localhost:9000/pokrice";

export default class Pokrica extends React.Component{

    state: PokriceState;
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
          pokrica: [],
          isUserLoggedIn: true,
        };
      }

      componentDidMount(): void {
        this.getPokrica();
      }

      getPokrica(){
        axios.get(Pokrica_API_Base_URL, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({pokrica: response.data})
     
        }).catch((error: any) => {
         this.setState({isUserLoggedIn: false});
        });
      }

      render(): React.ReactNode {
        if(this.state.isUserLoggedIn === false){
          return(
            <Redirect to="/login" />
          );
        }
        
          return (
            <Container>
            <Table responsive>
            <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv</th>
                        <th>Napomena</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                  {
                     this.state.pokrica.map(
                      pr => 
                      <tr key={pr.sifra}>
                         <td>{pr.sifra}</td>
                         <td>{pr.naziv}</td> 
                         <td>{pr.napomena}</td>   
                         <td><Link to= {`/create-or-update-pokrice/${pr.sifra}`} style={{marginLeft : "10px"}} className = 'btn btn-primary'>Ucitaj</Link></td>               
                      </tr> 
                  )
                  }
                </tbody>
            </Table> 
            <Link to="/create-or-update-pokrice/_add" className="btn btn-primary" style={{marginTop : "10px"}}>Kreiraj novo pokrice</Link>
            </Container>     
            );
      }



}