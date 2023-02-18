<template>
    <div class="observacao column is-two-thirds">
        <div class="field is-two-thirds ">
            <label class="label">Message</label>
            <div class="control">
                <textarea class="textarea is-info textarea" placeholder="Textarea" v-model="frete.observacao" ></textarea>
            </div>
            <div class="control mt-2">
                <button type="submit" class="button is-link"  @click="onClickCadastrar()">Submit</button>
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
export default class ObservacaoInterrompido extends Vue{

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

    private atualizarStatusInterrompido(): void {
        this.frete.statusFrete = "interrompido"
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
    this.atualizarStatusInterrompido()
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

</style>