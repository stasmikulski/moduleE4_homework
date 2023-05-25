function MyDevice(name) {
    this.name = name;
}

MyDevice.prototype.deviceWork = function () {
    let work = false
    if (this.electric && this.poweron) {
        work = true;
    } else {
        work = false;
    }
    return (work);
}

MyDevice.prototype.deviceSwitching = function() {
    if (this.poweron == true) {
        this.poweron = false;
        console.log(this.name + ': switching OFF')
        console.log('-' + this.power)
    } else {
        this.poweron = true;
        console.log(this.name + ': switching ON')
        console.log('+' + this.power)
    }
}

function ElectricDevice(name, power, electric, poweron) {
    this.name = name;
    this.power = power;
    this.electric = electric;
    this.poweron = poweron;
    this.showPower = function(){
        console.log(power)
    }
}

ElectricDevice.prototype = new MyDevice();

function AccumCharger(name, power, electric, poweron, voltage, amperage ) {
    this.name = name;
    this.power = power;
    this.electric = electric;
    this.poweron = poweron;
    this.voltage = voltage;
    this.amperage = amperage;
    this.showPower = function(){
        console.log(power)
    }
}

AccumCharger.prototype = new MyDevice();

let sumPower = function(){
    let sum = 0;
    for ( let consumer of allMyElectricConsumers ) {
        if (consumer.deviceWork()){
            sum += consumer.power;
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
        let switchText = consumer.poweron ? 'ON' : 'OFF';
        console.log(consumer.name + ': ' + consumer.power + ' W  ' + switchText)
    }
}


const lamp1 = new ElectricDevice(
    name = "Chandelier",
    power = 50,
    electric = true,
    poweron = true);
const lamp2 = new ElectricDevice(
    name = "Bird LampShade",
    power = 25,
    electric = true,
    poweron = false);
const ledline = new ElectricDevice(
    name = "Led Line Gauss",
    power = 20,
    electric = true,
    poweron = true);
const electrokamin = new ElectricDevice(
    name = "Electro Kamin",
    power = 1500,
    electric = true,
    poweron = false
);
const white3Usb = new AccumCharger(
    name = "3хUSB Charger",
    power = 15,
    electric = true,
    poweron = true,
    voltage = 220,
    amperage = 3
);


let allMyElectricConsumers = [lamp1, lamp2, ledline, electrokamin, white3Usb];

// Выведем список всех устройств
printListAllMyEC();
// И общую мощность
sumPowerMessage();

// Включаем Торшер-Птичку
// используем кнопку вкл/выкл (переключатель)
lamp2.deviceSwitching();
sumPowerMessage();

// А белую USB-зарядку выключаем
white3Usb.deviceSwitching();
sumPowerMessage();

// Вручную включим Электрокамин
console.log('Manually switching ON my Electrokamin...');
// используем ручное (точное и наглое) включение
electrokamin.poweron = true;
sumPowerMessage();

// Теперь выключим камин
// можно просто нажать кнопку - electrokamin.deviceSwitching();
// но, лучше, запустим таймер на несколько секунд
let current = 3;
let timerId = setInterval(function() {
    console.log('...', current);
    if (current == 1) {
        clearInterval(timerId);
        console.log('... that\'s enough'); // Погрелись и хватит
        // выключаем камин, используя кнопку вкл/выкл (переключатель)
        electrokamin.deviceSwitching();
        sumPowerMessage();
        console.log('(That\'s all, folks!)');
    }
    current--;
}, 1000);

