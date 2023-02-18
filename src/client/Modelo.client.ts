import { Modelo } from "@/model/Modelo";
import axios, { AxiosInstance } from "axios";

export class ModeloClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/modelo',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Modelo> {
        try {
            return (await this.axiosClient.get<Modelo>(`/${id}`)).data
        }
        catch(erro:any){
            return Promise.reject(erro.response)
        }    
    }

    
    public async findAll() : Promise<Modelo[]> {
        try{
            return(await this.axiosClient.get<Modelo[]> ( ``)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(modelo: Modelo) : Promise<void> {
        try{
            return(await this.axiosClient.post(``))
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    } 

    public async atualizar(modelo: Modelo) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/${modelo.id}`, modelo)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async excluir(modelo: Modelo) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/${modelo.id}`, modelo)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    
}