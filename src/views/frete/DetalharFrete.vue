<template>
    <div class="observacao">
        <div class="card2">
            <div class="info"> ID {{ frete.id }}</div>
            <div class="info"> ativo {{ frete.ativo }}</div>
            <div class="info"> cadastrado {{ frete.cadastrado }}</div>
            <div class="info"> atualizado {{ frete.atualizado }}</div>
            <div class="info"> Placa do caminhao {{ frete.caminhao.placa }}</div>
            <div class="info"> Origem {{ frete.cidadeOrigem.name }}</div>
            <div class="info"> Destino {{ frete.cidadeDestino.name }}</div>
            <div class="info"> Nome Motorista {{ frete.motorista.nome }}</div>
            <div class="info"> observacao {{ frete.observacao }}</div>
            <div class="info"> Peso Final {{ frete.pesoFinal }}</div>
            <div class="info"> Peso Transportado {{ frete.pesoFinalTransportado }}</div>
            <div class="info"> Peso Inicial {{ frete.pesoInicial }}</div>
            <div class="info"> Peso Tonelada {{ frete.precoTonelada }}</div>
            <div class="info"> Peso Inicial {{ frete.precoTonelada }}</div>
            <div class="info"> Produto {{ frete.produto.name }}</div>
            <div class="info"> KM Inicial {{ frete.quilometragemIni }}</div>
            <div class="info"> KM Final {{ frete.quilometragemFim }}</div>
            <div class="info"> Status {{ frete.statusFrete }}</div>
            <div class="info"> Total Bruto Nota {{ frete.totalBrutoRecebidoNota }}</div>
            <div class="info"> Total liquido recebido {{ frete.totalLiquidoRecebido }}</div>
        </div>
        
    </div> 
</template>

<script lang="ts">

import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import { Component, Vue } from 'vue-property-decorator';
import { Prop } from 'vue-property-decorator'


@Component
export default class DetalharFrete extends Vue{

    private freteClient: FreteClient = new FreteClient()

    @Prop({ type: String, required: false })
        private readonly id!: string
    public frete: Frete = new Frete()

    public mounted(): void {
        this.buscarFrete();
        this.frete.id = Number(this.id)
    }


    private async buscarFrete(): Promise<void> {
        try {
            this.frete = await this.freteClient.findById(parseInt(this.$route.params.id))

            if (this.frete.id == null) {
                alert('Frete não encontrado')
                window.location.href = "/frete/"
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    private atualizarStatusDescarga(): void {
        this.frete.statusFrete = "descarga"
        this.freteClient.atualizar(this.frete).then(
            success => {
                window.location.href = "/frete/"
            },
            error => {
                console.log(error)
            }
        )
    }


    public onClickCadastrar(): void{
        this.atualizarStatusDescarga()
    }
}


</script>

<style>
.observacao{
    margin-top: 10%;
    position: absolute;
    margin-left: 17%;
}
.label{
    text-align: initial;
    margin-top: 1%;
}
.control{
    justify-content: flex-end;
    display: flex;
}

.card2{
    position: relative;
    display: flex;
    width: 700px;
    height: 600px;
    background-color: aquamarine;
    flex-direction: column;
}

.info{
    margin: 5px;
    display: inline-block;
}

</style>