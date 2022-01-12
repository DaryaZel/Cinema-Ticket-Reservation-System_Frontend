import { Header } from "../components/Header/Header";
import { MainMoviePage } from "./MainMoviePage/MainMoviePage";
import { useParams } from "react-router-dom";

export function MoviePage() {
    let params = useParams();
    return (
        <div>
            <Header />
            <MainMoviePage params={params}/>
        </div>
    )
}
