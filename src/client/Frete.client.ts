import { Frete } from "@/model/Frete";
import axios, { AxiosInstance } from "axios";

export class FreteClient {
    

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/frete',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Frete> {
        try {
            return (await this.axiosClient.get<Frete>(`/${id}`)).data
        }
        catch(erro:any){
            return Promise.reject(erro.response)
        }    
    }

    
    public async findAll() : Promise<Frete[]> {
        try{
            return(await this.axiosClient.get<Frete[]> ( ``)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(frete: any) : Promise<void> {
        let data = {
            "produtoId": frete.produto.id,
            "cidadeDestinoId": frete.cidadeDestino.id,
            "cidadeOrigemId": frete.cidadeOrigem.id,
            "motoristaId": frete.caminhao.id,
            "caminhaoId": frete.motorista.id,
            "precoTonelada": frete.preco
          }
        try{
            return(await this.axiosClient.post(``, data)).data
        }
        catch(error:any){
            console.log(error)
            return Promise.reject(error.response)
        }
    } 

    // public async cadastrar(frete: any) : Promise<void> {
    //     try{
    //         return (await this.axiosClient.post(``, frete)).data
    //     }catch(error:any){
    //         console.log(error)
    //         return Promise.reject(error.response)
    //     }
    // }

    public async atualizar(frete: Frete) : Promise<void> {
        try{
            return (await this.axiosClient.put(`/${frete.id}`, frete)).data        
        }catch(error:any){
            return Promise.reject(error.response)
    }
   }

    public async atualizarEmTransporte(frete: Frete) : Promise<void> {
        try{
        
            return(await this.axiosClient.put(`/status/em_transporte/${frete.id}`, frete)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async atualizarInterrompido(frete: Frete) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/status/interrompido/${frete.id}`, frete)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }
    public async atualizarCancelado(frete: Frete) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/status/cancelado/${frete.id}`, frete)).data
        }
        catch(error:any){
            return Promise.reject(error.response)
        }
    }
    public async atualizarDescarga(frete: Frete) : Promise<void> {
        try{
            console.log("erro 1")
            return(await this.axiosClient.put(`/status/descarga/${frete.id}`, frete)).data
        }
        catch(error:any){
            console.log("erro 2")
            return Promise.reject(error.response)
        }
    }
    public async atualizarFaturado(frete: Frete) : Promise<void> {
        try{
            return(await this.axiosClient.put(`/status/faturado/${frete.id}`, frete)).data
        }
        catch(error:any){
            console.log("erro no client")
            
            return Promise.reject(error.response)
        }
    }
    // public async excluir(frete: Frete) : Promise<void> {
    //     try{
    //         return(await this.axiosClient.delete(`/${frete.id}`, frete)).data
    //     }
    //     catch(error:any){
    //         return Promise.reject(error.response)
    //     }
    // }

    
}