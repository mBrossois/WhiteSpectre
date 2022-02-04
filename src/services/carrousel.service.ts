import {Axios, AxiosObservable} from "axios-observable";
import {CarrouselRequestType} from "@/types/carrouselRequest.type";

class CarrouselService {
    getCarrouselItems(): AxiosObservable<CarrouselRequestType> {
        return Axios.get('/photos.json');
    }
}

export default new CarrouselService();
