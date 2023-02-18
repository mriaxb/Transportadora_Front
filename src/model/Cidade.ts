import { AbstractEntity } from "./AbstractEntity"
import { Estado } from "./Estado"

export class Cidade extends AbstractEntity{
    nome!: string
    estado!: Estado
}