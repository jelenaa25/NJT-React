import StavkaPolise from "./StavkaPolise";

export default class Polisa{

    polisaID?: number;
    rb?: number;
    klijent?: number;
    povrsinaStana?: number;
    vrednostPoKvM?: number;
    gradjevinskaVrednost?: number;
    ukupnaPremija?: number;
    datumOD?: Date;
    datumDO?: Date;
    agentOsiguranja?: number;
    stavke?: StavkaPolise[];

}