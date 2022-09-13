import React, { Component } from 'react';
import Pokrice from "../../model/Pokrice";
import Mesto from "../../model/Mesto";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { isElementAccessExpression } from 'typescript';

interface PokriceState{
    isUserLoggedIn: boolean;
    pokrice: Pokrice;
    vratiNaSva: boolean;
    
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
           
        }

       
    }

    componentDidMount(){
        
        if(this.props.match.params.id === '_add'){
            return; //samo izadji
        }
        //ako ima id broj ucitaj pokrice!!!
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
            return <h3 className='text-center'>Kreiranje pokrica</h3>;
        }else return <h3 className='text-center'>Evidencija pokrica</h3>

    }
    
    sacuvajPokrice() {
        ////////validacijaaaaaaaaaaaaaaa
        if(this.props.match.params.id === '_add'){
        axios.post(Pokrica_API_Base_URL, this.state.pokrice, {headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
          }}).then((response: any) => {
            //preusmeri na sva pokrica.......
            this.setState({vratiNaSva: true});
            console.log("USPESNO SACUVANO!!");
     
        }).catch((error: any) => {
            console.log("DOSLO JE DO GRESKE pri cuvanju...!!!");
         this.setState({isUserLoggedIn: false});
        })
        }else {
            axios.put(Pokrica_API_Base_URL + '/'+this.props.match.params.id, this.state.pokrice, {headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Access-Control-Allow-Origin": "*",
              }}).then((response: any) => {
                //preusmeri na sva pokrica.......
                console.log("USPESNO PROEMNJENO!!");
         
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
        const newState  = Object.assign(this.state, {
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
            <div>
                <div className='container'>

                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Naziv: </label>
                                        <input placeholder='Naziv' name='naziv'id='naziv' className='form-control' value={this.state.pokrice.naziv} onChange = {event => this.promena(event as any)} />
                                    </div>
                                    <p id="n" className='text-danger'></p>

                                    <div className='form-group'>
                                        <label>Napomena: </label>
                                        <input placeholder='Napomena' name='opis' id='opis' className='form-control' value={this.state.pokrice.napomena} onChange = {event => this.promena(event as any)} />
                                    </div>

                                    <button className='btn btn-success' onClick={this.sacuvajPokrice}>Sacuvaj</button>
                                    <Link className='btn btn-danger' to='/pokrica' style={{marginLeft: "10px"}}>Otkazi</Link>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

