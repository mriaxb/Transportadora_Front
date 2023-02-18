import { AbstractEntity } from "./AbstractEntity"
import { Cor } from "./enum/Cor.enum"
import { Modelo } from "./Modelo"

export class Caminhao extends AbstractEntity{
    
    placa!: string
    modelo!: Modelo
    cor!: Cor
    ano!: number
    observacao!: string

}