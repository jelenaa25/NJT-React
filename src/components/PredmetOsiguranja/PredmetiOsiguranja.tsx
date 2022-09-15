import React from "react";
import PredmetOsiguranja from "../../model/PredmetOsiguranja";
import axios from 'axios';
import { Container, Card, Table, Col, Row } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { GlavniMeni, GlavniMeniItem } from "../GlavniMeni/GlavniMeni";

interface PredmetiOsiguranjaState{
    predmeti: PredmetOsiguranja[];
    isUserLoggedIn: boolean;
}
const Predmet_API_Base_URL = "http://localhost:9000/predmet";

export default class PredmetiOsiguranja extends React.Component{

    state: PredmetiOsiguranjaState;
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
          predmeti: [],
          isUserLoggedIn: true,
        };
      }

      componentDidMount(): void {
        this.getPredmeti();
      }

      getPredmeti(){
        axios.get(Predmet_API_Base_URL, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({predmeti: response.data})
     
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
              <GlavniMeni stavke={stavke1}></GlavniMeni>
            <Table responsive>
            <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv</th>
                        <th>Napomena</th>
                    </tr>
                </thead>
                <tbody>
                  {
                     this.state.predmeti.map(
                      pr => 
                      <tr key={pr.sifra}>
                         <td>{pr.sifra}</td>
                         <td>{pr.naziv}</td> 
                         <td>{pr.napomena}</td>                  
                      </tr> 
                  )
                  }
                </tbody>
            </Table>   
            </Container>   
            );
      }
}
const stavke1 = [

  new GlavniMeniItem("Pocetna", "/polise"), //to su sve polise 
  new GlavniMeniItem("Kreiranje polise", '/kreiraj-polisu'),
  new GlavniMeniItem("Predmeti", "/predmeti"),
  new GlavniMeniItem("Klijenti", "/klijenti"),
  new GlavniMeniItem("Pokrica", "/pokrica"),
  new GlavniMeniItem("Odjava", "/odjava"),

];