<template>
    <div class="detalhe">
        <nav-principal></nav-principal>
        <main role="main">
            <div class="container">
                <br><br>
                <router-link class="btn btn-info" to="/">Voltar</router-link>
                <br><br>
                <div class="row">
                    <div class="col-12 col-md-12 col-sm-12">
                        <div class="card border-light">
                            <div class="card-header">
                                <h5>Detalhe do {{$route.params.nome}}</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <p>
                                    <label for="">Nome:</label>&nbsp;<span>{{nome}}</span>
                                    </p>
                                    <p>
                                        <label for="">Valor:</label>&nbsp;<span>{{valor}}</span>
                                    </p>
                                    <p>
                                        <label for="">Variação:</label>&nbsp;<span :class="(variacao <= 0 ? 'negativo' : 'positivo')">{{variacao}}</span>
                                    </p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col">
                                        <vue-chart
                                            :columns="columns"
                                            :rows="rows"
                                            :options="options"
                                        ></vue-chart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import NavPrincipal from '@/components/nav-principal.vue'
import Introducao from '@/components/introducao.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { utils } from '@/utils'

export default {
    name: 'detalhe',
    components: {
        Introducao,
        NavPrincipal
    },
    data() {
        return {
            nome: '',
            valor: 0,
            variacao: 0,
            columns: [{
                'type': 'datetime',
                'label': 'Tempo'
            }, 
            {
                'type': 'number',
                'label': 'Cotação'
            }],
            rows: [
                // empty
            ],
            options: {
                title: '',
                hAxis: {
                    title: 'Tempo',
                    minValue: null,
                    maxValue: null
                },
                vAxis: {
                    title: 'Cotação',
                    minValue: null,
                    maxValue: null
                },
                width: 900,
                height: 400,
                curveType: 'corechart'
            }
        }
    },
    computed: {
        ...mapState(['aCotacoes', 'hasData'])
    },
    methods: {
        ...mapActions(['getFinance']),
        getDetalhe () {
            const nome = this.$route.params.nome
            const tipo = this.$route.params.tipo
            let aTempo = [];
            let aValor = [];
            if (this.hasData) {

                let valorLabel = 'buy';
                if (tipo == 'stocks') {
                    valorLabel = 'variation';
                }

                const aExibicao = [];
                
                this.aCotacoes.forEach(o => {
                    if (o[tipo]) {
                        // seta o nome da cotação
                        this.nome = o[tipo][nome]['name'];
                        // pega o último valor
                        this.valor = o[tipo][nome][valorLabel];
                        // pega o último valor
                        this.variacao = o[tipo][nome]['variation'];
                        aTempo.push(o.created_at)
                        aValor.push(o[tipo][nome][valorLabel])
                        aExibicao.push([
                            o.created_at,
                            o[tipo][nome][valorLabel]
                        ]);
                    }
                })

                const tempoMin = new Date(this.getMinArray(aTempo))
                const tempoMax = new Date(this.getMaxArray(aTempo))

                // console.log(tempoMin, tempoMax)

                const valorMin = this.getMinArray(aValor)
                const valorMax = this.getMaxArray(aValor)

                // console.log(valorMin, valorMax)
                
                this.rows = aExibicao;
                this.options.hAxis = {
                    title: 'Tempo',
                    minValue: tempoMin,
                    maxValue: tempoMax
                }
                this.options.vAxis = {
                    title: 'Cotação',
                    minValue: valorMin,
                    maxValue: valorMax
                }
            }

            const self = this;
            setTimeout(() => {
                self.getDetalhe()
            }, process.env.VUE_APP_TIME)
        },
        getMaxArray(arr) {
            return Math.max.apply(null, arr)
        },
        getMinArray(arr) {
            return Math.min.apply(null, arr)
        },
    },
    created() {
        this.getFinance() // busca cotações
        this.getDetalhe() // busca o selecionado
    },
    mounted() {
        // console.log(this.$store.state.aCotacoes)
    }
}
</script>