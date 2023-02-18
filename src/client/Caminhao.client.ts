import { Caminhao } from "@/model/Caminhao";
import axios, { AxiosInstance } from "axios";

export class CaminhaoClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/caminhao',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Caminhao> {
        try {
            return (await this.axiosClient.get<Caminhao>(`/${id}`)).data
        }
        catch(erro:any){
            return Promise.reject(erro.response)
        }    
    }

    
    public async findAll() : Promise<Caminhao[]> {
        try{
            return(await this.axiosClient.get<Caminhao[]> ( ``)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(caminhao: Caminhao) : Promise<void> {
        try{
            return(await this.axiosClient.post(``))
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    } 

    public async atualizar(caminhao: Caminhao) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/${caminhao.id}`, caminhao)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async excluir(caminhao: Caminhao) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/${caminhao.id}`, caminhao)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    
}