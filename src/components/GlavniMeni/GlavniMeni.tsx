import React from "react";
import {Nav, Container} from 'react-bootstrap';
import { HashRouter, Link } from "react-router-dom";

export class GlavniMeniItem{

    text: string = '';
    link: string = '#';

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }
}

interface GlavniMeniProperties{
    stavke: GlavniMeniItem[];
}
interface GlavniMeniState{
    stavke: GlavniMeniItem[];
}
export class GlavniMeni extends React.Component<GlavniMeniProperties>{
    state: GlavniMeniState;
    constructor(props: Readonly<GlavniMeniProperties>){

        super(props);

        this.state = {
            stavke: props.stavke,
        };

    }
    
    setStavke(stavke: GlavniMeniItem[]){ 
        this.setState({
            stavke: stavke,
        })
    }
        
    
    render(): React.ReactNode {
        
        return(

            <Container>
            <Nav variant="tabs">
                <HashRouter>
                {
                    this.state.stavke.map(
                        (stavka =>
                            {
                                return(
                                    <Link to={stavka.link}  className = 'nav-link'>{stavka.text}</Link>
                                );
                            }
                        )
                        
                    )
                }
                </HashRouter>
            </Nav>
            </Container>

        );

    }
}