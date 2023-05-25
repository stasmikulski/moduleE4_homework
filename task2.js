const someExample = { bear : 100, beetle: 1000, winner : "Hi!" }
const animal = 'bear'
const botanic = 'whiskey'
const creator = 'The Beatles'
const director = 'beetle'

function verySmartFunc (someProperty, someExample) {
    return someProperty in someExample;
}

console.log(verySmartFunc(animal, someExample))
console.log(verySmartFunc(botanic, someExample))
console.log(verySmartFunc(creator, someExample))
console.log(verySmartFunc(director, someExample))


