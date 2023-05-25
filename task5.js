class MyDevice{
    constructor(name) {
        this.name = name;
    }
}

class ElectricDevice extends MyDevice {
    constructor(name, power, electric, poweron) {
        super(name);
        this.power = power;
        this.electric = electric;
        this.poweron = poweron;
        this.showPower = function () {
            console.log(power)
        }
    }

    DeviceWork() {
        let work = false
        if (this.electric && this.poweron) {
            work = true;
        } else {
            work = false;
        }
        return work;
    }

    deviceSwitching() {
        if (this.poweron == true) {
            this.poweron = false;
            console.log(this.name + ': switching OFF')
        } else {
            this.poweron = true;
            console.log(this.name + ': switching ON')
        }
    }

}


let sumPower = function(){
    let sum = 0;
    for ( let consumer of allMyElectricConsumers ) {
        if (consumer.DeviceWork()){
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
    "Chandelier",
    50,
    true,
    true);
const lamp2 = new ElectricDevice(
    "Bird LampShade",
    25,
    true,
    false);
const ledline = new ElectricDevice(
    "Led Line Gauss",
    20,
    true,
    true);
const electrokamin = new ElectricDevice(
    "Electro Kamin",
    1500,
    true,
    false);



let allMyElectricConsumers = [lamp1, lamp2, ledline, electrokamin];

// Выведем список всех устройств
printListAllMyEC();
// И общую мощность
sumPowerMessage();

// Вручную включим Электрокамин
console.log('Manually switching ON my Electrokamin...');
// используем ручное точное и наглое включение
electrokamin.poweron = true;
electrokamin.showPower();
sumPowerMessage();

// Теперь выключим камин
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
        console.log('Bonus: switching ON my Bird LampShade...');
        // тоже используем кнопку вкл/выкл (переключатель)
        lamp2.deviceSwitching();
        lamp2.showPower();
        sumPowerMessage();
        console.log('That\'s all, folks');
    }
    current--;
}, 1000);

