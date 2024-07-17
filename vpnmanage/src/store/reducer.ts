//manage data 

const defaultState = {  
  num: 20
}

let reducer = (state = defaultState, action: {type: string, val:number}) => {
  console.log("执行reducer")
  let newState = JSON.parse(JSON.stringify(state))
    switch  (action.type) {
      case 'add1':
        newState.num++
        break;
      case 'add2':
        newState.num +=action.val
        break; 
      default:
        break;
      
    }
    return newState;
}

export default reducer