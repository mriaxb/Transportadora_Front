<template>
    <div>
      <div class="cavalo">
        <table class="table is-black is-bordered">
          <thead class="is-black">
              <tr style="background:hsl(171deg, 100%, 41%) ">
                  <th>Data</th>
                  <th>Tipo De Despesa</th>
                  <th>Motorista</th>
                  <th>Valor</th>
                  <th>Frete</th>
                  <th>Aprovador</th>
                  <th>Status Despesa</th>

                </tr>
          </thead>
          <tbody>
              <tr v-for="item in despesaList" :key="item.id">
                <th>{{item.cadastrado}}</th>
                <th>{{item.tipoDespesa.nome}}</th>
                <th>{{item.motorista.nome}}</th>
                <th>{{item.valor}}</th>
                <th>{{item.frete.id}}</th>
                <th>{{item.aprovador?.nome}}</th>
                <th>
                    <div v-if="1 == 1">
                        <router-link :to="`/editarDespesa/${item.id} `" >
                            <button class="button is-default"> Editar </button> <!-- transporte -->
                        </router-link>
                        <button  @click="onClickDeletar(item.id)"  class="button is-default"> Excluir </button> <!-- cancelado -->
                        
                    </div>

                </th>
              </tr>
          </tbody>
        </table>
        
      </div>  
  
      <div class="columns buttom_cadastrar">
          <div class="column is-2" id="bloco-botao">
              <router-link to="/cadastrar" class="button is-primary"> Cadastrar</router-link>
          </div>
          <div class="column is-2" id="bloco-botao">
              <router-link to="/despesaCadastro" class="button is-primary"> Cadastrar Despesa</router-link>
          </div>
      </div> 
    </div>
  
  </template>
  
  <script lang="ts">
  
  
  
  import { DespesaClient } from '@/client/Despesa.client';
  import { Despesa } from '@/model/Despesa';
  import { Component, Vue } from 'vue-property-decorator';
  import { Prop } from 'vue-property-decorator'
  

  @Component
  export default class DespesaList extends Vue {
  
    private despesaClient: DespesaClient = new DespesaClient()
    public despesaList: Despesa[] = []

    // @Prop({ type: String, required: false })
    // private readonly id!: String
    public despesa: Despesa = new Despesa()
  
  
  
    public mounted(): void{
        // this.buscarDespesa()
      //console.log(this.freteList)
        // this.despesa.id = Number(this.id)
        this.listarDespesas()
    }

    // private async buscarDespesa(): Promise<void> {
    //     try {
    //         this.despesa = await this.despesaClient.findById((this.despesa.id))

    //         if (this.despesa.id == null) {
    //             alert('Despesa não encontrada')
    //             window.location.href = "/frete/"
    //         }

    //     } catch (error: any) {
    //         console.log(error)
    //     }
    // }

  
    private listarDespesas(): void {
      this.despesaClient.findAll().then(
          success => {
              this.despesaList = success
          },
          error => {
              console.log(error)
          }
      )
    }

    public onClickDeletar(id: number): void {
        this.despesaClient.excluir(id).then(
            success => {
              this.listarDespesas()
            },
            error => {
                console.log(error)
            }
        )
    }



  
  }
  
  
  </script>
  
  <style>
    .cavalo{
      margin-left: 19%;
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