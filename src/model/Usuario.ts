import { AbstractEntity } from "./AbstractEntity"
import { Grupo } from "./enum/Grupo.enum"

export class Usuario extends AbstractEntity{

    percGanho!: number
    login!: string
    senha!: string
    grupo!: string
    nome!: string
    cpf!: string
    telefone!: string
    endereco!: string
    dataDeNascimento!: Date
    observacao!: string
}