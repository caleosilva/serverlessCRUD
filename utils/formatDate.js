export default function formatDate(date) {
    if (date){
        const data = new Date(date);
        data.setMinutes(data.getMinutes() + data.getTimezoneOffset());

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
    
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    } else {
        return ""
    }
    
}