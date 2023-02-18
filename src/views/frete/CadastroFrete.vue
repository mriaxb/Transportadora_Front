<template>
    <div class="bloco1">
        <div class="columns">
            <div class="column" style="font-weight: bold;color: #2c3e50;">
                Cadastro de Fretes
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-2" style="background-color: #483D8B; border-top-left-radius: 10px;">
                <div class="select is-fullwidth">
                    <select @change="changeEstadoOrigem($event)">
                        <option hidden disabled selected> Selecione o Estado</option>
                        <option :value="item.id" v-for="item in estadoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column  is-2" style="background-color: #483D8B; border-top-right-radius: 10px;">
                <div class="select is-fullwidth">
                    <select v-model="frete.cidadeOrigem">
                        <option hidden disabled selected> Selecione a Cidade</option>
                        <option :value="item" v-for="item in cidadeOrigemList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-2" style="background-color: #483D8B;">
                <div class="select is-fullwidth">
                    <select @change="changeEstadoDestino($event)" >
                        <option hidden disabled selected> Selecione o Estado</option>
                        <option :value="item.id" v-for="item in estadoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column  is-2" style="background-color: #483D8B;">
                <div class="select is-fullwidth">
                    <select v-model="frete.cidadeDestino">
                        <option hidden disabled selected> Selecione a Cidade</option>
                        <option :value="item" v-for="item in cidadeDestinoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B;">
                <div class="select is-fullwidth">
                    <select v-model="frete.produto">
                        <option hidden disabled selected> Selecione o Produto</option>
                        <option :value="item" v-for="item in produtoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B;">
                <div class="select is-fullwidth">
                    <select v-model="frete.caminhao">
                        <option hidden disabled selected> Selecione o Caminhao</option>
                        <option :value="item" v-for="item in caminhaoList" :key="item.id">{{ item.placa }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #483D8B;">
                <div class="select is-fullwidth">
                    <select v-model="frete.motorista">
                        <option hidden disabled selected> Selecione o Motorista</option>
                        <option :value="item" v-for="item in usuarioList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #483D8B; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <input class="input" type="text" v-model="frete.precoTonelada" placeholder="Preco da Tonelada">
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
    import { ProdutoClient } from '@/client/Produto.client';
    import { Frete } from '@/model/Frete';
    import { Component, Vue } from 'vue-property-decorator';
    import { Cidade } from '@/model/Cidade';
    import { Produto } from '@/model/Produto';
    import { Usuario } from '@/model/Usuario';
    import { Caminhao } from '@/model/Caminhao';
    import router from '@/router';
    import { RouterLink } from 'vue-router';
    import { CidadeClient } from '@/client/Cidade.client';
    import { EstadoClient } from '@/client/Estado.client';
    import { Estado } from '@/model/Estado';
    import { UsuarioClient } from '@/client/Usuario.client';
    import { CaminhaoClient } from '@/client/Caminhao.client';

    @Component
    export default class CadastroFrete extends Vue{

        private freteClient: FreteClient = new FreteClient()
        private produtoClient: ProdutoClient = new ProdutoClient()
        private cidadeClient: CidadeClient = new CidadeClient()
        private estadoClient: EstadoClient = new EstadoClient()
        private usuarioClient: UsuarioClient = new UsuarioClient()
        private caminhaoClient: CaminhaoClient = new CaminhaoClient()


        public frete: Frete = new Frete()
        public produtoList: Produto[] = []
        public cidadeDestinoList: Cidade[] = []
        public cidadeOrigemList: Cidade[] = []
        public estadoList: Estado[] = []
        public usuarioList: Usuario[] = []
        public caminhaoList: Caminhao[] = []

        public mounted(): void{
            this.selectEstadoList();
            this.selectProdutoList();
            this.selectUsuarioList();
            this.selectCaminhaoList();
        }

        public onClickCadastrar(): void{
                                                                  
            this.freteClient.cadastrar(this.frete).then(
                success => {
                    console.log('Registro cadastrado com sucesso!!!')
                    this.frete = new Frete()
                },
                error => {
                    console.log(error)
                }
            )
        }

        private selectProdutoList(): void{
            this.produtoClient.findAll().then(
                success => this.produtoList = success,
                error => console.log(error)
            )
        }

        private selectEstadoList(): void{
            this.estadoClient.findAll().then(
                success => this.estadoList = success,
                error => console.log(error)
            )
        }

        private selectUsuarioList(): void{
            this.usuarioClient.findAll().then(
                success => this.usuarioList = success,
                error => console.log(error, "erro ao tentar contatar com o usuario")
            )
        }

        private selectCaminhaoList(): void{
            this.caminhaoClient.findAll().then(
                success => this.caminhaoList = success,
                error => console.log(error)
            )
        }
       
        public async changeEstadoOrigem(event: any): Promise<void>{
            console.log(event.target.value)
            this.cidadeClient.findByEstado(event.target.value).then(
                success => this.cidadeOrigemList = success,
                error => console.log(error)
            )
        }

        public async changeEstadoDestino(event: any): Promise<void>{
            this.cidadeClient.findByEstado(event.target.value).then(
                success => this.cidadeDestinoList = success,
                error => console.log(error)
            )
        }

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
</style>