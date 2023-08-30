let char = new hero('Hero')
let monster = new bigMonster('Big monster');
let mago = new mage()

const log1 = new log(document.querySelector('.log'))

const cenario = new stage(
    char,
    mago,
    monster,
    document.querySelector('#hero'),
    document.querySelector('#mage'),
    document.querySelector('#monster'),
    log1
    
)


cenario.start()