const content = require('./contentfile')
const list = require('./listfile')
const folder = process.cwd()

const checkPrimes = (number) => {
    if(!number){
        return console.log('Chưa nhập đầu vào')
    }
    const n=Number(number)
    let flag = true
    if (n < 2) {
        flag = false;  
    }
    else if (n === 2) {
        flag = true;
    }
    else if (n % 2 === 0) {
        flag = false;
    }
    else {
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) {
                flag = false;
                break;
            }
        }
    }
    if (flag) {
        list(folder)
    } else {
        content(folder)
    }
}
checkPrimes(process.argv[2])