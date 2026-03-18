import { vjezbe } from "./VjezbaPodaci";

// 1/4 Read od CRUD
async function get() {
    return {data: vjezbe}
}


export default{
    get
}