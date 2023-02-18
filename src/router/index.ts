import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/frete',
    name: 'frete-List',
    component: () => import('../views/frete/FreteListView.vue')
  },
  {
    path: '/cadastrar',
    name: 'casdastroFrete',
    component: () => import('../views/frete/CadastroFrete.vue')
  },
  {
    path: '/observacaoInterrompido/:id',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    name: 'observacaoInterrompido',
    component: () => import('../views/frete/ObservacaoInterrompido.vue')
  },
  {
    path: '/observacaoCancelado/:id',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    name: 'observacaoCancelado',
    component: () => import('../views/frete/ObservacaoCancelado.vue')
  },
  {
    path: '/freteEmTransporte/:id',
    name: 'freteEmTransporte',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/frete/FreteEmTransporte.vue')
  },
  {
    path: '/detalhar/:id',
    name: 'detalharfrete',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/frete/DetalharFrete.vue')
  },
  {
    path: '/descargaForm/:id',
    name: 'descargaForm',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/frete/DescargaForm.vue')
  },
  {
    path: '/faturadoForm/:id',
    name: 'faturadoForm',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/frete/FaturadoForm.vue')
  },
  {
    path: '/despesaCadastro',
    name: 'despesaCadastro',
    component: () => import('../views/frete/DespesaCadastro.vue')
  },
  {
    path: '/despesaList',
    name: 'despesaList',
    component: () => import('../views/frete/DespesaList.vue')
  },
  {
    path: '/editarDespesa/:id',
    name: 'editarDespesa',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/frete/EditarDespesa.vue')
  }


  // {
  //   path: '/formCadastro/:id',
  //   name: 'formCadastro',
  //   component: () => import('../components/FormCadastro.vue')
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
