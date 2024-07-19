export default{
    state:{
        num:20
    },  
    actions:{
        add1(newState:{ num:number}, action:{type:string }): void{
            newState.num++
        },
        add2(newState:{ num:number}, action:{type:string, val:number}): void{
            newState.num += action.val 
        },
    },
    //handle function name
    add1: "add1",
    add2: "add2"
}
