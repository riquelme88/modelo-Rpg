class character{
    
    _life = 1;
    max_life = 1;
    attack = 0;
    defense = 0;
    cure = 0
    level = 0

    constructor(name){
        this.name = name
    }

    get life(){
        return this._life
    }

    set life(new_life){
        this._life = new_life <=0 ? 0 : new_life;
    }

}

class hero extends character{
    
    constructor(name){
        super(name)
        this.life = 100;
        this.max_life = 100;
        this.attack = 14;
        this.defense = 11;
        this.cure = 8;
        this.level = 1;
    }
    
}

class mage extends character{
    constructor(name){
        super('Mago')
        this.life = 80;
        this.max_life = 80;
        this.attack = 25;
        this.defense = 4;
        this.cure = 22;
        this.level = 1;
    }
}

class bigMonster extends character{
    constructor(name){
        super(name)
        this.life = 120;
        this.max_life = 120;
        this.attack = 18;
        this.defense = 10;
        this.cure = 6;
        this.level = 1;
    }
}



class stage{
    constructor(fighter1,fighter2,fighter3,fighter1El,fighter2El,fighter3El,logObject){
        this.fighter1 = fighter1,
        this.fighter2 = fighter2,
        this.fighter3 = fighter3,
        this.fighter1El = fighter1El,
        this.fighter2El = fighter2El,
        this.fighter3El = fighter3El,
        this.logObject = logObject
    }
    update(){
        //fighter1
        this.fighter1El.querySelector('.name').innerHTML = `<div>${this.fighter1.name} ${this.fighter1.life.toFixed(2)}HP</div>`
        this.fighter1El.querySelector('.level').innerHTML = `Level : ${this.fighter1.level}`
        let pct1 = (this.fighter1.life/ this.fighter1.max_life) *100;
        this.fighter1El.querySelector('.bar .bar-life').style.width = `${pct1}%`
        //fighter2
        this.fighter2El.querySelector('.name').innerHTML = `<div>${this.fighter2.name} ${this.fighter2.life.toFixed(2)}HP</div>`
        this.fighter2El.querySelector('.level').innerHTML = `Level : ${this.fighter2.level}`
        let pct2 = (this.fighter2.life/ this.fighter2.max_life) *100;
        this.fighter2El.querySelector('.bar .bar-life').style.width = `${pct2}%`
        //fighter3
        //fighter2
        this.fighter3El.querySelector('.name').innerHTML = `<div>${this.fighter3.name} ${this.fighter3.life.toFixed(2)}HP</div>`
        this.fighter3El.querySelector('.level').innerHTML = `Level : ${this.fighter3.level}`
        let pct3 = (this.fighter3.life/ this.fighter3.max_life) *100;
        this.fighter3El.querySelector('.bar .bar-life').style.width = `${pct3}%`
    }

    doAttack(attacking,attacked){
        if(attacked.life <=0){
            this.logObject.addMessage('Está atacando cachorro morto')
            return;
        }else if(attacking.life <=0){
            this.logObject.addMessage('Está morto')
            return;
        }

        let attackFactor = Math.random() * 2
        let actualAttack = attacking.attack * attackFactor * attacking.level
        let defenseFactor = Math.random()*2
        let actualDefense = attacked.defense * defenseFactor * attacked.level;
        let damage = actualAttack - actualDefense

      

        if(actualAttack > actualDefense){
            this.logObject.addMessage(`${attacked.name} tomou ${damage.toFixed(2)} de dano`)
            attacked.life -= damage
        }else{
            this.logObject.addMessage(`${attacked.name} conseguiu defender`)
        }
        this.update()
    }

    docure(curing){
        if(curing.life <=0){
            this.logObject.addMessage('Está morto não tem como curar')
        }
        if(curing.life >= curing.max_life){
            this.logObject.addMessage('Não ha mais como curar')
            return
        }

        let cureFactor = (Math.random()*2)
        let actualCure = curing.cure * cureFactor * curing.level;
        
        if(curing.life >0){
            curing.life += actualCure
            this.logObject.addMessage(`${curing.name} curou ${actualCure.toFixed(2)} de vida`)
        } 
        if(curing.life > curing.max_life){
            curing.life = curing.max_life
        }

        this.update()
    }

    start(){
        this.update()
        //Ataque
        this.fighter1El.querySelector('.attack').addEventListener('click', ()=>{this.doAttack(this.fighter1,this.fighter3)})
        this.fighter2El.querySelector('.attack').addEventListener('click', ()=>{this.doAttack(this.fighter2,this.fighter3)})
        this.fighter3El.querySelector('.attack').addEventListener('click', ()=>{this.doAttack(this.fighter3,this.fighter1)})
        this.fighter3El.querySelector('.attack').addEventListener('click', ()=>{this.doAttack(this.fighter3,this.fighter2)})
        
        //Cura
        this.fighter1El.querySelector('.cure').addEventListener('click', ()=>{this.docure(this.fighter1)})
        this.fighter2El.querySelector('.cure').addEventListener('click', ()=>{this.docure(this.fighter2)})
        this.fighter3El.querySelector('.cure').addEventListener('click', ()=>{this.docure(this.fighter3)})


    }
}

class log {
    list = []

    constructor(listEl){
        this.listEl = listEl
    }

    addMessage(msg){
        this.list.push(msg)
        this.render();
    }

    render(){
        this.listEl.innerHTML = ''
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}
