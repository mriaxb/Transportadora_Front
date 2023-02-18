<template>

    <div class="bloco1" style="margin-top: 8%;">

        <div class="columns">
            <div class="column" style="font-weight: bold;color: #2c3e50;">
                Editar Despesa de ID {{ despesa.id }}
            </div>
        </div>

        <div class="columns" style="text-align: left; ">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B; margin-top: -18px; ">
                <label>tipo de despesa</label>
                <div class="select is-fullwidth">
                    
                    <select v-model="despesa.tipoDespesa">
                        <option hidden disabled selected> Selecione o tipo da despesa</option>
                        <option :value="item" v-for="item in tipoDespesaList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns" style="text-align: left;">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B; margin-top: -18px;">
                <label>motorista</label>
                <div class="select is-fullwidth">
                    <select v-model="despesa.motorista">
                        <option hidden disabled selected> Selecione o motorista</option>
                        <option :value="item" v-for="item in motoristaList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns" style="text-align: left;">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B; margin-top: -18px;">
                <label>aprovador</label>
                <div class="select is-fullwidth">
                    <select v-model="despesa.aprovador">
                        <option hidden disabled selected> Selecione o aprovador</option>
                        <option :value="item" v-for="item in aprovadorList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns" style="text-align: left;">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B; margin-top: -18px;">
                <label>frete</label>
                <div class="select is-fullwidth">
                    <select v-model="despesa.frete">
                        <option hidden disabled selected> Selecione o frete</option>
                        <option :value="item" v-for="item in freteList" :key="item.id">{{ item.id }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B; ">
                <input class="input" type="text" v-model="despesa.valor" placeholder="Valor">
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-6">
                <router-link to="/frete" class="button is-dark"> Voltar</router-link> &nbsp;
                <button type="submit" class="button is-link" @click="onClickCadastrar()">atualizar</button>
            </div>
        </div>
    </div>
</template>

<script lang ="ts">

import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import { Component, Vue } from 'vue-property-decorator';
import { Prop } from 'vue-property-decorator'
import { Usuario } from '@/model/Usuario';
import { UsuarioClient } from '@/client/Usuario.client';
import { TipoDespesa } from '@/model/TipoDespesa';
import { Grupo } from '@/model/enum/Grupo.enum';
import { Despesa } from '@/model/Despesa';
import { TipoDespesaClient } from '@/client/TipoDespesa.client';
import { DespesaClient } from '@/client/Despesa.client';



@Component
export default class editarDespesa extends Vue {

    private freteClient: FreteClient = new FreteClient()
    private usuarioClient: UsuarioClient = new UsuarioClient()
    private tipoDespesaClient: TipoDespesaClient = new TipoDespesaClient()
    private despesaClient: DespesaClient = new DespesaClient()

    public usuario: Usuario = new Usuario()
    public usuarioList: Usuario[] = []
    public motoristaList: Usuario[] = []
    public aprovadorList: Usuario[] = []
    public freteList: Frete[] = []

    @Prop({ type: String, required: false })
    private readonly id!: string
    public despesa: Despesa = new Despesa()
    public tipoDespesa: TipoDespesa = new TipoDespesa()
    public tipoDespesaList: TipoDespesa[] = []



    private buscarDespesa(): void{
        let id = Number(this.id)
        this.despesaClient.findById(id).then(
            success => this.despesa = success,
            error => console.log(error, "erro ")
        )
    }

    private selectUsuarioList(): void{
        this.usuarioClient.findAll().then(
            success => {
                this.motoristaList = success.filter(i => i.grupo !== "administrador")
                this.aprovadorList = success.filter(i => i.grupo === "administrador")
            },
            error => console.log(error, "erro ")
        )
    }
    private selectFreteList(): void{
        this.freteClient.findAll().then(
            success => this.freteList = success,
            error => console.log(error, "erro ")
        )
    }
    private selectTipoDespesaList(): void{
        this.tipoDespesaClient.findAll().then(
            success => this.tipoDespesaList = success,
            error => console.log(error, "erro ")
        )
    }


    // @Prop({ type: String, required: false })
    //     private readonly id!: string
    public frete: Frete = new Frete()
    //public freteList: Frete[] = []

    public mounted(): void {
        this.buscarDespesa()
        this.selectFreteList()
        this.selectFreteList()
        this.selectUsuarioList()
        this.selectTipoDespesaList()
    }


    private atualizarDespesa(): void {
        this.despesaClient.atualizar(this.despesa).then(
            success => {
                alert("despesa atualizada ")
                // window.location.href = "/frete/"
            },
            error => {
                console.log(error)
            }
        )
    }

   
    public onClickCadastrar(): void {
        console.log(this.despesa.id)
        console.log(this.despesa.aprovador.nome)
        console.log(this.despesa.motorista.nome)
        console.log(this.despesa.frete.id)
        this.atualizarDespesa()
    }



   

}

</script>

<style scoped lang="scss">
.bloco1{
    position: absolute;
    margin-top: 94px;
    width: 100%;
}

label{
    color: #d9f3d9;
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
    // .column label{
    //     text-align: center;
    //     margin-bottom: 5px;
    //     display: inline-block;
    // }
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
</style>