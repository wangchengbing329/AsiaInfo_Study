// const a = Math.pow(2,53)
// const b = Number.MAX_SAFE_INTEGER
// console.log(a)
// console.log(b)
// let target = {
//     name:'sam',
//     age:18
// }
// let handler = {
//     get:function(target,key){
//         console.log('getting' + key )
//         return target[key]
//     },
//     set:function(target,key,value){
//         console.log('setting' + key)
//         return target[key] = value;
//     }
// }

// let proxy = new Proxy(target,handler)
// proxy.name
// proxy.age = 16
// console.log(target.age)



let promiseA = new Promise((resolve,reject)=>{
    console.log('resolve')
    resolve()
})
promiseA.then((resolve,reject)=>{
console.log(resolve)
})
