export const utils = {
    dateToYmdHis: function (dateObject) {
        const dia = dateObject.getDate()
        const mes = dateObject.getMonth()
        const ano = dateObject.getFullYear()
        const segundos = dateObject.getSeconds()
        const minuto = dateObject.getMinutes()
        const hora = dateObject.getHours()
        
        return new Date(ano, mes, dia, hora, minuto, segundos)
    }
}