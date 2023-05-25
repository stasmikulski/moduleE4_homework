function MyDevice(name) {
    this.name = name;
}

MyDevice.prototype.DeviceWork = function () {
    let work = false
    if (this.electric && this.switchon) {
        work = true;
    } else {
        work = false;
    }
    return (work);
}

MyDevice.prototype.deviceSwitching = function() {
    if (this.switchon == true) {
        this.switchon = false;
        console.log(this.name + ': switching OFF')
    } else {
        this.switchon = true;
        console.log(this.name + ': switching ON')
    }
}

function ElectricDevice(name, power, electric, switchon) {
    this.name = name;
    this.power = power;
    this.electric = electric;
    this.switchon = switchon;
    this.showPower = function(){
        console.log(power)
    }
}

ElectricDevice.prototype = new MyDevice();

let sumPower = function(){
    let sum = 0;
    for ( let value of allMyElectricConsumers ) {
        if (value.DeviceWork()){
            sum += value.power;
        } else {
            sum;
        }
    }
    return sum;
}

let sumPowerMessage = function () {
    console.log('* General Power: ' + sumPower(allMyElectricConsumers) + ' W');
}


let printListAllMyEC = function() {
    for ( let consumer of allMyElectricConsumers ) {
        let switchText = consumer.switchon ? 'ON' : 'OFF';
        console.log(consumer.name + ': ' + consumer.power + ' W  ' + switchText)
    }
}


const lamp1 = new ElectricDevice(
    name = "Chandelier",
    power = 50,
    electric = true,
    switchon = true);
const lamp2 = new ElectricDevice(
    name = "Bird LampShade",
    power = 25,
    electric = true,
    switchon = false);
const ledline = new ElectricDevice(
    name = "Led Line Gauss",
    power = 20,
    electric = true,
    switchon = true);
const electrokamin = new ElectricDevice(
    name = "Electro Kamin",
    power = 1500,
    electric = true,
    switchon = false);



let allMyElectricConsumers = [lamp1, lamp2, ledline, electrokamin];

printListAllMyEC();

// Выведем список всех устройств
sumPowerMessage();

// Вручную включим Электрокамин
console.log('Manually switching ON my Electrokamin...');
// используем ручное точное и наглое включение
electrokamin.switchon = true;
electrokamin.showPower();
sumPowerMessage();


// Выключим камин
// можно просто нажать кнопку - electrokamin.deviceSwitching();
// или, лучше, запустим таймер на несколько секунд
let current = 3;
let timerId = setInterval(function() {
    console.log(current);
    if (current == 0) {
        clearInterval(timerId);
        console.log('... that\'s enough'); // Погрелись и хватит
        // выключаем камин, используя кнопку вкл/выкл (переключатель)
        electrokamin.deviceSwitching();
        sumPowerMessage();
        // После того как камин немного поработал, включим Торшер-Птичку
        console.log('Manually switching ON my Bird LampShade...');
        // тоже используем кнопку вкл/выкл (переключатель)
        lamp2.deviceSwitching();
        lamp2.showPower();
        sumPowerMessage();
        console.log('That\'s all, folks');
    }
    current--;
}, 1000);

