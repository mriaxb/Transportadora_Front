import { AbstractEntity } from "./AbstractEntity"
import { Frete } from "./Frete"
import { TipoDespesa } from "./TipoDespesa"
import { Usuario } from "./Usuario"

export class Despesa extends AbstractEntity{

    tipoDespesa!: TipoDespesa
    valor!: number
    motorista!: Usuario
    cadastrado!: Date
    aprovador!: Usuario
    frete!: Frete
}