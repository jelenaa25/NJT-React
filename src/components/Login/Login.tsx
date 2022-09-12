import React from "react";
import { Container, Card, Form, Button, Col, Alert } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from "react-router-dom";

interface LoginState{
  username: string;
  password: string;
  errorMess: string;
  isLoggedIn: boolean;
  
}
const Klijent_API_Base_URL = "http://localhost:9000/authenticate";

export default class Login extends React.Component{

    state: LoginState;

    constructor(props: Readonly<{}>){
      super(props);
      this.state = {

        username: '',
        password: '',
        errorMess: '',
        isLoggedIn: false,

      };
    }
    private promena(event: React.ChangeEvent<HTMLInputElement>){
      const newState  = Object.assign(this.state, {
       [ event.target.id ]: event.target.value,
      });

      this.setState(newState);
    }
    private login(){
      axios
      .post(Klijent_API_Base_URL, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response: any) => {
       // setToken(response.data.token );
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        this.setState({isLoggedIn: true})

      console.log("Going back after login");
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('id'));
    }).catch((error: any) => {
      this.setState({errorMess: 'Losi parametri za prijavu.'})
      console.log(error);

    })

    }
    render(): React.ReactNode {
      if(this.state.isLoggedIn === true){
        return(
          <Redirect to="/" />
        );
      }
        return (
            <Container>
             <Col  md= {{span: 6, offset: 3}}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    Prijava na sistem
                  </Card.Title>
                  <Card.Text>
                    <Form>
                      <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control type="username" id="username" value={this.state.username} onChange = {event => this.promena(event as any)}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" value={this.state.password} onChange = {event => this.promena(event as any)} />
                      </Form.Group>

                      <Form.Group>
                        <Button variant="primary" style={{'marginTop': '10px'}} onClick = {() => this.login()}>Uloguj se</Button>
                      </Form.Group>

                    </Form>
                    <Alert variant="danger" className={this.state.errorMess ? '' : 'd-none'} style={{'marginTop': '10px'}}>
                        {
                            this.state.errorMess
                        }
                    </Alert>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Container>
          );
    }
}