import { AbstractEntity } from "./AbstractEntity"
import { Frete } from "./Frete"
import { StatusFrete } from "./enum/StatusFrete.enum"
import { Usuario } from "./Usuario"

export class HistoricoFrete extends AbstractEntity{

    data!: Date
    frete!: Frete
    statusFrete!: StatusFrete
    executor!: Usuario

}