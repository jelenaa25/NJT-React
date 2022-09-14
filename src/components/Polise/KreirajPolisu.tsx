import React from "react";
import Klijent from "../../model/Klijent";
import Pokrice from "../../model/Pokrice";
import Polisa from "../../model/Polisa";
import PredmetOsiguranja from "../../model/PredmetOsiguranja";
import axios from 'axios';
import { Container, Card, Form, Button, Col, Alert, Table, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import StavkaPolise from "../../model/StavkaPolise";


const Polisa_API_Base_URL = "http://localhost:9000/polisa";
const Klijent_API_Base_URL = "http://localhost:9000/klijent";
const Pokrica_API_Base_URL = "http://localhost:9000/pokrice";
const Predmet_API_Base_URL = "http://localhost:9000/predmet";

interface KreirajPolisuState{
    
    klijenti: Klijent[];
    polisa: Polisa;
    stavke: StavkaPolise[];
    isUserLoggedIn: boolean;
    pokrica: Pokrice[];
    predmeti: PredmetOsiguranja[];
    od: string;
    do: string;
    pokID: number;
    predID: number;
    RB: number;
    procenatAmortizacije: number;
    vrati: boolean;
    errorMess: string;
}
export default class KreirajPolisu extends React.Component {
    state: KreirajPolisuState;
    constructor(props: Readonly<KreirajPolisuState>){
        super(props);
        this.state = {
            polisa: new Polisa(),
            klijenti: [],
            isUserLoggedIn: true,
            pokrica: [],
            predmeti: [],
            od: '',
            do: '',
            pokID: 0,
            predID: 0,
            RB: 1,
            procenatAmortizacije: 0,
            stavke: [],
            vrati: false,
            errorMess: '',
        }
    }

    componentDidMount(): void {
        this.ucitajPreduslove();
        
    }

    private ucitajPreduslove(){
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

        axios.get(Klijent_API_Base_URL, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({klijenti: response.data})
     
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
                        <Form.Label htmlFor="klijent">Klijent:</Form.Label>
                        <select className='form-control' id = 'klijent' onChange={event => this.promena(event as any)} name = 'kliijenti'>
                                    
                                {
                                        this.state.klijenti.map(
                                        kl => (<option key = {kl.id} value = {kl.id} selected >{kl.imePrezime}</option>))
                                }
                         </select>


                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="povrsinaStana">Povrsina:</Form.Label>
                        <Form.Control type="povrsinaStana" id="povrsinaStana" value={this.state.polisa.povrsinaStana}  onChange = {event => this.promena(event as any)}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="vrednostPoKvM">Vrednost po kVm:</Form.Label>
                        <Form.Control type="vrednostPoKvM" id="vrednostPoKvM" value={this.state.polisa.vrednostPoKvM} onChange = {event => this.promena(event as any)}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="grvr">Gradjevinska vrednost:</Form.Label>
                        <Form.Control type="grvr" id="grvr"  value={(Number(this.state.polisa.povrsinaStana)*Number(this.state.polisa.vrednostPoKvM))} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="od">DatumOD:</Form.Label>
                        <Form.Control type="od" id="od" value={this.state.od} onChange = {event => this.promenaOD(event as any)} placeholder='yyyy-MM-dd' />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="do">DatumDO:</Form.Label>
                        <Form.Control type="do" id="do" value={this.state.do} onChange = {event  => this.promenaDO(event as any)} placeholder='yyyy-MM-dd'/>
                      </Form.Group>
                      

                      <Form.Group>
                        <Form.Label htmlFor="pokrice">Pokrice:</Form.Label>
                        <select className='form-control' id = 'pokID' onChange={event => this.handlePokrice(event as any)} >
                                    
                                    {
                                            this.state.pokrica.map(
                                            kl => (<option key = {kl.sifra} value = {kl.sifra} selected >{kl.naziv}</option>))
                                    }
                        </select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="predmet">Predmet osiguranja:</Form.Label>
                        <select className='form-control' id = 'predID' onChange={event => this.handlePred(event as any)} >
                                    
                                    {
                                            this.state.predmeti.map(
                                            kl => (<option key = {kl.sifra} value = {kl.sifra} selected >{kl.naziv}</option>))
                                    }
                        </select>
                        
                      </Form.Group>

                      <Form.Group>
                        <Form.Label htmlFor="procenatAmortizacije">Amortizacija:</Form.Label>
                        <Form.Control type="procenatAmortizacije" id="procenatAmortizacije" onChange={event => this.handlePokrice(event as any)} />
                      </Form.Group>

                      <Form.Group>
                      <Button variant="primary" style={{'marginTop': '10px', 'marginBottom': '10px', 'marginRight': '10px'}} onClick = {() => this.sacuvajPolisu()}>Sacuvaj polisu</Button>
                      <Button variant="primary" style={{'marginTop': '10px', 'marginBottom': '10px', 'marginRight': '10px'}} onClick = {() => this.dodajStavku()}>Dodaj stavku</Button>
                        <Link to= "/" className = "btn btn-danger">Nazad</Link>
                      </Form.Group>

                    </Form>
                    <Alert variant="danger" className={this.state.errorMess ? '' : 'd-none'} style={{'marginTop': '10px'}}>
                        {
                            this.state.errorMess
                        }
                    </Alert>
                    <Table responsive>
                    <thead>
                            <tr>
                                <th>RB</th>
                                <th>Predmet</th>
                                <th>Pokrice</th>
                                <th>Suma </th>
                                <th>% amortizacije</th>
                                <th>Premija</th>
                                <th>Akcija</th>
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
                                 <td><Button variant="danger" style={{'marginTop': '10px', 'marginBottom': '10px', 'marginRight': '10px'}} onClick = {() => this.obrisi(stavka)}>Ukloni</Button></td>
                          
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
    
    private  getPP(pokid: number | undefined, prid: number | undefined){
        let npokrica;
        let npred;
        if(pokid == 0) npokrica = this.state.pokrica[this.state.pokrica.length-1].naziv;
        if(prid == 0) npred = this.state.predmeti[this.state.predmeti.length-1].naziv;
        for(let i = 0; i < this.state.pokrica.length; i++){
            if(this.state.pokrica[i].sifra == pokid) npokrica = this.state.pokrica[i].naziv;
        }
        for(let i = 0; i < this.state.predmeti.length; i++){
            if(this.state.predmeti[i].sifra == prid) npred = this.state.predmeti[i].naziv;
        }
        return <><td>{npred}</td>
        <td>{npokrica}</td></>
    }

    private obrisi(stavka: StavkaPolise){
        var okk = this.state.stavke;
        console.log("Index: "+okk.indexOf(stavka))
        okk.splice(okk.indexOf(stavka),1);
        //xokk.splice(rb);
       // this.setState({ukupnaPremija: this.state.ukupnaPremija-okk.indexOf(s).premija});
        this.setState({stavke: okk});
        this.state.polisa.stavke = okk;

    }
    validateAmortizaciju(): string{
        var c = '';
        if(isNaN(this.state.procenatAmortizacije) || this.state.procenatAmortizacije <= 0) c = c+"Amortizacija mora biti ceo broj i veci od nule."
        return c;
    }

    private dodajStavku(){
      //  this.setState({errorMess: ''});
      this.state.errorMess = '';
        if(this.validateAmortizaciju().length > 1){
            this.setState({errorMess: this.state.errorMess+this.validateAmortizaciju() });
            return;
        }
        if(this.state.pokID == 0) this.state.pokID = Number(this.state.pokrica[this.state.pokrica.length-1].sifra);
        if(this.state.predID == 0) this.state.predID = Number(this.state.predmeti[this.state.predmeti.length-1].sifra);
        const stav  = {rb: this.state.RB, 
            polisaID: 0,
            predmetOsiguranjaID: this.state.predID, 
            pokriceID: this.state.pokID, sumaOsiguranja: 1000*this.state.RB, 
            procenatAmortizacije: this.state.procenatAmortizacije, premija: 100};
        this.setState({RB: this.state.RB + 1});
       // var ok = this.state.stavke;
       if(this.state.stavke === undefined ) this.state.stavke = [];
        this.state.stavke?.push(stav);
        //this.setState({stavke: ok});
        this.state.polisa.stavke = this.state.stavke;
        console.log("STAVKE:"+this.state.polisa.stavke)
        if(this.state.stavke === undefined) this.setState({stavke: []})
        
    }

    private sacuvajPolisu(){
        this.setState(Object.assign(this.state, {errorMess: ''}));
        this.validatePolis(); if(this.state.errorMess.length > 1) return;
        let uk = 0;
        if(this.state.polisa.klijent === undefined) this.state.polisa.klijent = this.state.klijenti[this.state.klijenti.length-1].id
        console.log("KLIJENT:::: "+this.state.klijenti[this.state.klijenti.length-1].id)
        for(let i = 0; i < this.state.stavke.length; i++){
            uk = uk + Number(this.state.stavke[i].premija);
        }
        let po  = {klijent: this.state.polisa.klijent, povrsinaStana: this.state.polisa.povrsinaStana, vrednostPoKvM: this.state.polisa.vrednostPoKvM, gradjevinskaVrednost: (Number(this.state.polisa.povrsinaStana)*Number(this.state.polisa.vrednostPoKvM)), ukupnaPremija: uk, datumOD:  new Date(this.state.od), datumDO: new Date (this.state.do), agentOsiguranja: localStorage.getItem('id'), stavke: this.state.polisa.stavke, imePrezime: '' };
        console.log("UKUPNA PREMIJA: "+po.ukupnaPremija);
        //this.staviSvePprazne();
        console.log('polisa =>'+ JSON.stringify(po));
       /* const ccc = this.validatePolis();
        if(ccc == false){
            return;
        }*/
        axios.post(Polisa_API_Base_URL, po, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            this.setState({vrati: true})
     
        }).catch((error: any) => {
        // this.setState({isUserLoggedIn: false});
        console.log("ERR: "+error);

        });

    }

    
    handlePred= (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newState  = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
           });
     
           this.setState(newState);
    }
    
    private handlePokrice(event: React.ChangeEvent<HTMLInputElement>){
        const newState  = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
           });
     
           this.setState(newState);

    }
    private promena(event: React.ChangeEvent<HTMLInputElement>){
        const newState  = Object.assign(this.state.polisa, {
         [ event.target.id ]: event.target.value,
        });
  
        this.setState(newState);
      }

    private promenaOD(event: React.ChangeEvent<HTMLInputElement>){
        const newState  = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
           });
     
           this.setState(newState);

    }

    private promenaDO(event: React.ChangeEvent<HTMLInputElement>){
        const newState  = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
           });
     
           this.setState(newState);

    }

    validatePolis(){
        
        if(isNaN(Number(this.state.polisa.vrednostPoKvM)) || Number(this.state.polisa.vrednostPoKvM) <= 0){
           // this.setState({errorMess: this.state.errorMess + "Vrednost po kVm mora biti broj i veca od nule. "});
            //this.state.errorMess = this.state.errorMess + "Vr po kVm mora biti broj i veca od nule. ";
            this.setState(Object.assign(this.state, {errorMess: this.state.errorMess+"Vr po kVm mora biti broj i veca od nule. "}));
        }
        if(isNaN(Number(this.state.polisa.povrsinaStana))  || Number(this.state.polisa.povrsinaStana) <= 0){
           // this.setState({errorMess: this.state.errorMess + "Povrsina stana mora biti broj i veci od nule. "});
            //this.state.errorMess = this.state.errorMess + "Povrsina mora biti broj i veci od nule. ";
            this.setState(Object.assign(this.state, {errorMess: this.state.errorMess+"Povrsina stana mora biti broj i veci od nule. "}));
         }
         if(this.state.stavke?.length == 0 || this.state.stavke === undefined){
         //   this.setState({errorMess: this.state.errorMess + 'Polisa mora imati bar jednu stavku.'});
           // this.state.errorMess = this.state.errorMess + "Polisa mora imati bar jednu stavku. ";
            this.setState(Object.assign(this.state, {errorMess: this.state.errorMess+"Polisa mora imati bar jednu stavku "}));

         }
         var dateReg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

        if(this.state.do.match(dateReg) == null){
            //this.setState({errorMess: this.state.errorMess + 'DatumDO nije u dobrom formatu. '});
          //  this.state.errorMess = this.state.errorMess + "DatumDO nije u dobrom formatu. ";
            this.setState(Object.assign(this.state, {errorMess: this.state.errorMess+"DatumDO nije u dobrom formatu. "}));

        }
        if(this.state.od.match(dateReg) == null){
           // this.setState({errorMess: this.state.errorMess + 'DatumOD nije u dobrom formatu. '});
           // this.state.errorMess = this.state.errorMess + "DatumOD nije u dobrom formatu. ";
           this.setState(Object.assign(this.state, {errorMess: this.state.errorMess+"DatumOD nije u dobrom formatu. "}));


        }

    }

    
}