import React from "react";
import Login from "./Login";


export default class Logout extends React.Component{

    componentDidMount(): void {
        localStorage.clear();
    }

    render(): React.ReactNode {


        return(
            <Login></Login>
        );

    }






}
