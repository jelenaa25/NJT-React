import React from "react";


interface PolisaProperties{
    match: {
        params: {
            id: number; //id isit taj naziv kao sto si stavila u route
        }
    }

}
export default class UcitanaPolisa extends React.Component<PolisaProperties>{


    constructor(props: Readonly<PolisaProperties>){
        super(props);
    }



    render(): React.ReactNode {
   /*     return(

            <div>
                <h2 className='text-center'>Polise</h2>
                
                <div className='row'>

                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Povrsina stana</th>
                                <th>Vrednost po KvM</th>
                                <th>Gradjevinska vrednost</th>
                                <th>Ukupna premija</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.polise.map(
                                    polisa => 
                                    <tr key={polisa.polisaID}>
                                       <td>{polisa.polisaID}</td>
                                       <td>{polisa.povrsinaStana}</td>
                                       <td>{polisa.vrednostPoKvM}</td>
                                       <td>{polisa.gradjevinskaVrednost}</td>
                                       <td>{polisa.ukupnaPremija}</td>
                                       <td><button  style={{marginLeft : "10px"}} onClick={() => this.ucitajPolisu(polisa.polisaID)} className='btn btn-info'>Ucitaj</button></td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                    
                </div>
                <div className='text-left'>
                <button className='btn btn-primary btn-center' onClick={this.dodajPolisu} style={{marginBottom : "10px"}}>Kreiraj novu polisu</button>
                </div>
            </div>
        ); */

        return(
<div></div>

        );
    }
}