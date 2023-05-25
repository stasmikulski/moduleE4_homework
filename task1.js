const someExample = { a : 10, b : 100, c : true,  d : "Hi!" }

function printKeyAndValue (someObj){

    for (let key in someObj) {
        if (someObj.hasOwnProperty(key)) {
            console.log(key, someObj[key]);
        }
    }
}
printKeyAndValue(someExample);