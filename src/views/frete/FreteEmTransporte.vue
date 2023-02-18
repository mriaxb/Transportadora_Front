<template>

    <div style="margin-top: 10%;position: absolute;  margin-left: 34vw; width: 35vw; ">

        <div class="columns">
            <div class="column" style="font-weight: bold;color: #2c3e50;">
                Status Do Frete Em Transporte
            </div>
        </div>
        <div style="background-color: #483D8B; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <div class="columns">
                <div class="column is-offset-1 is-10" style="font-weight: bold;color: #2c3e50;">
                    <input class="input" v-model="frete.quilometragemIni" type="number" placeholder="Quilometragem Inicial">
                </div>
            </div>
            <div class="columns">
                <div class="column is-offset-1 is-10" style="font-weight: bold;color: #2c3e50;">
                    <input class="input" v-model="frete.pesoInicial" type="number" placeholder="Peso Inicial">
                    <button @click="onClickCadastrar()" style="margin-top: 2vh; margin-left: 23vw;"
                        class="button is-link">Salvar</button>
                </div>
            </div>
        </div> 
    </div>
</template>

<script lang="ts">
import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import { Component, Vue } from 'vue-property-decorator';
import { Prop } from 'vue-property-decorator'



@Component
export default class FreteStatusEmTransporte extends Vue {

    private freteClient: FreteClient = new FreteClient()
    @Prop({ type: String, required: false })
    private readonly id!: string
    public frete: Frete = new Frete()
    //public freteList: Frete[] = []

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


    private atualizarStatus(): void {
        this.frete.statusFrete = "em_transporte"
        this.freteClient.atualizar(this.frete).then(
            success => {
                alert("Atualizado com sucesso sucesso")
                // window.location.href = "/frete/"
            },
            error => {
                console.log(error)
            }
        )
    }


    public onClickCadastrar(): void {
        this.atualizarStatus()
    }

}

</script>

<style>

</style>