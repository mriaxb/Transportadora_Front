<template>
  <div class="list">
      <table class="table is-bordered box mt-6">
        <thead class="is-black">
            <tr style="background:hsl(171deg, 100%, 41%) ">
                <th>Data</th>
                <th>Status</th>
                <th>Cidade Origem</th>
                <th>Cidade Destino</th>
                <th>Caminhao</th>
                <th>Produto</th>
                <th>Opção</th> 
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in freteList" :key="item.id">
                <th>{{item.cadastrado}}</th>
                <th>
                    <span v-if="item.statusFrete === 'carga'" class="tag is-info">Em Carga</span>
                    <span v-if="item.statusFrete === 'em_transporte'" class="tag is-info">Em Transporte</span>
                    <span v-if="item.statusFrete === 'interrompido'" class="tag is-warning">Interrompido</span>
                    <span v-if="item.statusFrete === 'descarga'" class="tag is-primary"> Em Descarga</span>
                    <span v-if="item.statusFrete === 'faturado'" class="tag is-success">Faturado</span>
                    <span v-if="item.statusFrete === 'cancelado'" class="tag is-danger">Cancelado</span>
                </th>
                <th>{{item.cidadeOrigem.nome}}</th>
                <th>{{item.cidadeDestino.nome}}</th>
                <th>{{item.caminhao.placa}}</th>
                <th>{{item.produto.nome}}</th>
                <th>
                  <div v-if="item.statusFrete === 'carga'">
                    <a v-bind:href=" `/detalhar/${item.id} `">
                      <button class="button is-default">+</button> 
                  </a>
                    <a v-bind:href=" `/freteEmTransporte/${item.id}` ">
                      <button class="button is-default"> Transportar </button> <!-- transporte -->
                    </a>
                    <a v-bind:href=" `/observacaoInterrompido/${item.id} `">
                      <button class="button is-default"> Interromper </button> <!-- interrompido -->
                    </a>
                    <a v-bind:href=" `/observacaoCancelado/${item.id} `">
                      <button class="button is-default"> Cancelar </button> <!-- cancelado -->
                    </a>
                  </div>

                  <div v-if="item.statusFrete === 'em_transporte'">
                    <a v-bind:href=" `/detalhar/${item.id} `">
                      <button class="button is-default">+</button> 
                  </a>
                    <a v-bind:href=" `/observacaoInterrompido/${item.id} `">
                      <button class="button is-default"> Interromper </button> <!-- interrompido -->
                    </a>
                    <a v-bind:href=" `/descargaForm/${item.id} `">
                      <button class="button is-default"> Descarga </button> <!-- descarga -->
                    </a>
                  </div>

                  <div v-if="item.statusFrete === 'interrompido'">
                  <a v-bind:href=" `/detalhar/${item.id} `">
                      <button class="button is-default">+</button> 
                  </a>
                    <button @click="onClickStatusEmCarga(item)" class="button is-default"> Carregar </button>
                    <button class="button is-default "> Transportar </button> <!-- transporte -->
                    <a v-bind:href=" `/observacaoCancelado/${item.id} `">
                      <button class="button is-default"> Cancelar </button> <!-- cancelado -->
                    </a>
                  </div>

                  <div v-if="item.statusFrete === 'descarga'">
                    <a v-bind:href=" `/detalhar/${item.id} `">
                      <button class="button is-default">+</button> 
                    </a>
                    <a v-bind:href=" `/faturadoForm/${item.id} `">
                      <button class="button is-default"> Faturar </button> <!-- faturado -->
                    </a>
                  </div>
                </th>
            </tr>
        </tbody>
      </table>
      

    <div class="columns buttom_cadastrar">
        <div class="column is-2" id="bloco-botao">
            <router-link to="/cadastrar" class="button is-primary"> Cadastrar Frete</router-link>
        </div>
        <div class="column is-2" id="bloco-botao">
            <router-link to="/despesaCadastro" class="button is-primary"> Cadastrar Despesa</router-link>
        </div>
        <div class="column is-2" id="bloco-botao">
            <router-link to="/despesaList" class="button is-primary"> Listar Despesa</router-link>
        </div>
    </div> 
  </div>

</template>

<script lang="ts">



import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FreteListView extends Vue {

  private freteClient: FreteClient = new FreteClient()
  public freteList: Frete[] = []
  public frete: Frete = new Frete()



  public mounted(): void{
    //console.log(this.freteList)
    this.listarFretes()
  }

  public onClickStatusEmCarga(frete: Frete): void{
    frete.statusFrete = "carga"
    this.freteClient.atualizar(frete).then(() => this.listarFretes)
  }

  private listarFretes(): void {
    this.freteClient.findAll().then(
        success => {
            this.freteList = success
        },
        error => {
            console.log(error)
        }
    )
  }

}


</script>

<style>

  .list{
    position: absolute;
    max-width: 80%;
    margin-top: 5%;
    margin-left: 10%;  
  }
  .cavalo{
    margin-left: 10%;
    display: flex;
    justify-content: center;
    position: absolute;
    margin-top: 10%;
    
  }
  .buttom_cadastrar{
    display: flex;
    position: absolute;
    justify-content: space-evenly;
    margin-top: 0%;
  }
</style>