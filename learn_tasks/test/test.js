// function testSometing() {
//         console.log("testSomething");
//         return "return testSomething";
//     }
    
//     async function testAsync() {
//         console.log("testAsync");
//         return Promise.resolve("hello async");
//     }
    
//     async function test() {
//         console.log("test start...");
    
//         const testFn1 = await testSometing();
//         console.log(testFn1);
    
//         const testFn2 = await testAsync();
//         console.log(testFn2);
    
//         console.log('test end...');
//     }
    
//     test();
    
//     var promiseFn = new Promise((resolve)=> { 
//                         console.log("promise START...");
//                         resolve("promise RESOLVE");
//                     });
//     promiseFn.then((val)=> console.log(val));
    
//     console.log("===END===")
    
    

let a = Object.prototype.toString.call(null)
console.log(a);