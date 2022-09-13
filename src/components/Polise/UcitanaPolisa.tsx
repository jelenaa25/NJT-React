import React from "react";
import Polisa from "../../model/Polisa";
import { Container, Card, Form, Button, Col, Alert, Table } from "react-bootstrap";
import Klijent from "../../model/Klijent";
import Agent from "../../model/Agent";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import Pokrice from "../../model/Pokrice";
import { useHistory } from "react-router";
import PredmetOsiguranja from "../../model/PredmetOsiguranja";

interface PolisaProperties{
    match: {
        params: {
            id: number; //id isit taj naziv kao sto si stavila u route
        }
    }

}
const Polisa_API_Base_URL = "http://localhost:9000/polisa";
const Klijent_API_Base_URL = "http://localhost:9000/klijent";
const Pokrica_API_Base_URL = "http://localhost:9000/pokrice";
const Predmet_API_Base_URL = "http://localhost:9000/predmet";

interface UcitanaPolisaState{
    polisa: Polisa;
    klijent: Klijent;
    agent: Agent;
    od: string;
    do: string;
    isUserLoggedIn: boolean;
    pokrica: Pokrice[];
    predmeti: PredmetOsiguranja[];
    klID: number;
    vrati: boolean;
}
export default class UcitanaPolisa extends React.Component<PolisaProperties>{
  
    state: UcitanaPolisaState;
    constructor(props: Readonly<PolisaProperties>){
        super(props);
        this.state = {
            polisa: new Polisa(),
            klijent: new Klijent(),
            agent: new Agent(),
            od: '',
            do: '',
            isUserLoggedIn: true,
            pokrica: [],
            predmeti: [],
            klID: 0,
            vrati: false,
        }
    }

      componentDidMount(): void {
        this.ucitajPolisu();
        
      }

      private ucitajPolisu(){
        axios.get(Polisa_API_Base_URL+'/'+this.props.match.params.id, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({polisa: response.data})
            this.setState({klID: response.data.klijent})
            let pok = response.data;
            const d1 = new Date(pok.datumOD);
            const d2 = new Date(pok.datumDO);
            this.setState({od: this.formatDate(d1)});
            this.setState({do: this.formatDate(d2)});
        }).catch((error: any) => {
         //this.setState({isUserLoggedIn: false});
         console.log("ERR: "+error);
        });
        console.log("KLL:"+this.state.polisa.klijent)

        axios.get(Klijent_API_Base_URL+'/'+this.state.klID, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({klijent: response.data})
     
        }).catch((error: any) => {
        // this.setState({isUserLoggedIn: false});
        console.log("ERR: "+error);

        });

        axios.get(Pokrica_API_Base_URL, {headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
          "Access-Control-Allow-Origin": "*",
        }}).then((response: any) => {
          this.setState({pokrica: response.data})
      }).catch((error: any) => {
      // this.setState({isUserLoggedIn: false});
      console.log("ERR: "+error);

      });

      axios.get(Predmet_API_Base_URL, {headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "*",
      }}).then((response: any) => {
        this.setState({predmeti: response.data})
    }).catch((error: any) => {
    // this.setState({isUserLoggedIn: false});
    console.log("ERR: "+error);

    });

    }

    render(): React.ReactNode {

        if(this.state.isUserLoggedIn === false){
            return(
              <Redirect to="/login" />
            );
          }
          if(this.state.vrati === true){
            return(
              <Redirect to="/" />
            );
          }

         return(
            <Container>
             <Col  md= {{span: 6, offset: 3}}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    Evidencija polise
                  </Card.Title>
                  <Card.Text>
                    <Form>
                      <Form.Group>
                        <Form.Label htmlFor="polisaID">PolisaID</Form.Label>
                        <Form.Control type="username" id="username" value={this.state.polisa.polisaID} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="klijent">Klijent:</Form.Label>
                        <Form.Control type="klijent" id="password" value={this.state.klijent.imePrezime} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="povrsina">Povrsina:</Form.Label>
                        <Form.Control type="povrsina" id="povrsina" value={this.state.polisa.povrsinaStana} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="kvm">Vrednost po kVm:</Form.Label>
                        <Form.Control type="kvm" id="kvm" value={this.state.polisa.vrednostPoKvM} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="grvr">Gradjevinska vrednost:</Form.Label>
                        <Form.Control type="grvr" id="grvr" value={this.state.polisa.gradjevinskaVrednost} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="od">DatumOD:</Form.Label>
                        <Form.Control type="od" id="od" value={this.state.od} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="do">DatumDO:</Form.Label>
                        <Form.Control type="do" id="do" value={this.state.do} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="uk">Ukupna premija:</Form.Label>
                        <Form.Control type="uk" id="uk" value={this.state.polisa.ukupnaPremija} />
                      </Form.Group>

                      <Form.Group>
                        <Button variant="danger" style={{'marginTop': '10px', 'marginBottom': '10px', 'marginRight': '10px'}} onClick = {() => this.obrisi()}>Obrisi polisu</Button>
                        <Link to= "/" className = "btn btn-primary">Nazad</Link>
                      </Form.Group>

                    </Form>
                    <Table responsive>
                    <thead>
                            <tr>
                                <th>RB</th>
                                <th>Predmet</th>
                                <th>Pokrice</th>
                                <th>Suma </th>
                                <th>% amortizacije</th>
                                <th>Premija</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                             this.state.polisa.stavke?.map(
                              stavka => 
                              <tr key={stavka.rb}>
                                 
                                  <td>{stavka.rb}</td>
                                  {
                                      this.getPP(stavka.pokriceID, stavka.predmetOsiguranjaID)
                                  }
                                 <td>{stavka.sumaOsiguranja}</td> 
                                 <td>{stavka.procenatAmortizacije}</td>
                                 <td>{stavka.premija}</td>
                          
                              </tr> 
                          )
                          }
                        </tbody>
                    </Table>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Container>             
              
        ); 
    }

    private obrisi(){
      axios.delete(Polisa_API_Base_URL+'/'+this.props.match.params.id, {headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "*",
      }}).then((response: any) => {
       
        console.log("USPESNO OBRISANA POLISA")
        this.setState({vrati: true});

    }).catch((error: any) => {
    // this.setState({isUserLoggedIn: false});
    console.log("ERR: "+error);

    });


    }
    private formatDate(date: Date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    private  getPP(pokid: number | undefined, prid: number | undefined){
      let npokrica;
      let npred;
      for(let i = 0; i < this.state.pokrica.length; i++){
          if(this.state.pokrica[i].sifra == pokid) npokrica = this.state.pokrica[i].naziv;
      }
      for(let i = 0; i < this.state.predmeti.length; i++){
          if(this.state.predmeti[i].sifra == prid) npred = this.state.predmeti[i].naziv;
      }
      return <><td>{npred}</td>
      <td>{npokrica}</td></>
  }
}