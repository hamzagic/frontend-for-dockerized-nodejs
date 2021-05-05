export default {
    methods: {
        formatAmount(value) {
           return value.toLocaleString("pt-BR", { 
               minimumFractionDigits: 2,
               maximumFractionDigits: 2
           });
        }
    }
}