<template>

    <div class="form">
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class=" is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="quilometragem inicial" v-model="frete.quilometragemIni">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="quilometragem final" v-model="frete.quilometragemFim">
                </div>
            </div>
        </div> 
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="total bruto recebido" v-model="frete.totalBrutoRecebido">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="total liquido recebido" v-model="frete.totalLiquidoRecebido">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="peso final" v-model="frete.pesoFinal">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="peso inicial" v-model="frete.pesoInicial">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #6495ED;">
                <div class="is-fullwidth">
                    <input class="input is-normal" type="text" placeholder="observação" v-model="frete.observacao">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-6">
                <router-link to="/frete" class="button is-dark"> Voltar</router-link> &nbsp;
                <button type="submit" class="button is-link" @click="onClickAtualizar()">Cadastrar</button>
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
    export default class FormCadastro extends Vue{

        
        private freteClient: FreteClient = new FreteClient()

        @Prop({ type: String, required: false })
        private readonly id!: string
        
        public frete: Frete = new Frete()

        public mouted(){
            this.frete.id = Number(this.id)
        }

        private async findFrete(): Promise<void>{
            try{
                this.frete = await this.freteClient.findById(parseInt(this.$route.params.id))
                if(this.frete.id == null){
                    alert('Frete não encontrado')
                    window.location.href ="/frete/"
                }
            } catch (error:any){
                console.log(error)
            }   
        }

        public onClickAtualizar(): void{

            this.frete.id = Number(this.id);

            this.freteClient.atualizarEmTransporte(this.frete).then(
            succes =>{
                window.location.href = "/frete/"
            },
            error => {
                console.log(error)
            }
            )
        }

    }


</script>

<style>
.form{
    position: absolute;
    width: 100%;
    margin-top: 9%;
}
</style>