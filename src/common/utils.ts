import moment from 'moment'

export function formatDateTime(milliseconds:number){
    return moment(milliseconds).format("YYYY-MM-DD HH:mm:ss");
}