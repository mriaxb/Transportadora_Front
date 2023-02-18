<template>
    <div class="bloco1">
        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <input class="input" type="text" v-model="frete.pesoFinal" placeholder="Peso Final">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B; ">
                <input class="input" type="text" v-model="frete.pesoFinalTransportado" placeholder="Peso Final Transportado">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B; ">
                <input class="input" type="text" v-model="frete.quilometragemFim" placeholder="Quilometragem Final">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B;">
                <input class="input" type="text" v-model="frete.totalBrutoRecebidoNota" placeholder="Total Bruto Recebido">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <input class="input" type="text" v-model="frete.totalLiquidoRecebido" placeholder="Total Liquido Recebido">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-6">
                <router-link to="/frete" class="button is-dark"> Voltar</router-link> &nbsp;
                <button type="submit" class="button is-link" @click="onClickCadastrar()">Cadastrar</button>
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
export default class FaturadoForm extends Vue{

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

    private atualizarStatusFaturado(): void {
        this.frete.statusFrete = "faturado"
        this.freteClient.atualizar(this.frete).then(
            success => {
                window.location.href = "/frete/"
            },
            error => {
                console.log(this.frete.statusFrete)
                console.log(error)
            }
        )
    }


   public onClickCadastrar(): void{
    this.atualizarStatusFaturado()
   }


        // public onClickAtualizar(): void{
            
        //     this.freteClient.atualizarInterrompido(this.frete).then(
    
        //         success => {
        //             alert("it worked!!")
        //             console.log('Registro atualizado com sucesso!!!')
        //         },
        //         error => {
        //             console.log(error)
        //         }
        //     )
        // }

}


</script>

<style scoped lang="scss">
.bloco1{
    position: absolute;
    margin-top: 94px;
    width: 100%;
}

.cadastro_frete{
    
    // margin-top: 30%;
    font-family: Arial;
    h1{
        color: #303030;
    }
    .container{
        background-color: #EDEDED;
        border-radius: 15px;
        box-shadow: 13px 15px 30px 7px rgba(0, 0, 0, 0.45);
        width: 560px;
        max-width: 100%;
        overflow: hidden;
        opacity: 0.8;
        margin-top: 5%;
    }
    .form{
        color: #000;
        font-family: Arial;
        font-weight: 500;
        padding: 20px;
        text-align: left;
    }
    .column{
        position: relative;
    }
    .column label{
        text-align: center;
        margin-bottom: 5px;
        display: inline-block;
    }
    .column input{
        background-color: #9D9D9D;
        border: 2px solid rgb(92, 88, 88);
        display: block;
        font-size: 14px;
        width: 100%;
        padding: 10px;
        height: 30px;
    }
    .column small{
        position: absolute;
        bottom: 0;
        left: 0;
        visibility: hidden;
    }
    .form button{
        font-size: 14px;
        background-color: rgba(48, 48, 48, 0.9);
        border: 1px solid #000000;
        color:#d9f3d9;
        font-size: 14px;
        height: 35px;
        width: 85px;
        margin-top: 3%;

    }
    .botoes{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        .botao1{
            width: 130px;
            border: 1px solid #000;
        }
        .botao2{
            background-color: #F5F5F5;
            color: #000;
            margin-left: -20%;
            margin-top: 17%;
        }
        .botao1:hover{
            color: #000;
            transition: 0.2s;
            background-color: #8585ce;
           
        }
        .botao2:hover{
            transition: 0.2s;
            color: #d9f3d9;
            background-color: #327196;
        }

    }

}

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

</style>