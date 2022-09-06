import React from "react";
import {Nav, Container} from 'react-bootstrap';

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

export class GlavniMeni extends React.Component<GlavniMeniProperties>{
    render(): React.ReactNode {
        
        return(

            <Container>
            <Nav variant="tabs">
                {
                    this.props.stavke.map(
                        (stavka =>
                            {
                                return(
                                    <Nav.Link href={stavka.link}>{stavka.text}</Nav.Link>
                                );
                            }
                        )
                    )
                }

            </Nav>
            </Container>

        );

    }
}