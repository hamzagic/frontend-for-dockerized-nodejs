export default {
    methods: {
        formatDate(param) {
            const year = param.substr(0,4);
            const month = param.substr(5,2);
            const day = param.substr(8,2);
            return `${day}/${month}/${year}`;
        }
    }
}