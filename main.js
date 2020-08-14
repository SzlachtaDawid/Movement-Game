const divLeft = document.querySelector('.fa-chevron-left')
const divUp = document.querySelector('.fa-chevron-up')
const divRight = document.querySelector('.fa-chevron-right')
const btnStart = document.querySelector('.start')
const changeNick = document.querySelector('.nick')
const time = document.querySelector('.time')
const miss = document.querySelector('.miss i')
const hit = document.querySelector('.hit i')
const container = document.querySelector('.container')
const letsGo = document.querySelector('.welcome form')
const input = document.querySelector('.welcome input');
const rankingClose = document.querySelector('.rankingArrow button')
const rankingOpen = document.querySelector('.ranking')
const rankingNick = []
const rankingEasy = []
const rankingMedium = []
const rankingHard = []
const ulEasy = document.querySelector('.easyArrow div')
const ulMedium = document.querySelector('.mediumArrow div')
const ulHard = document.querySelector('.hardArrow div')
let LetsPlayActive = true
let timeStart = 10
let active = false
let active2 = true
let keyflag = false
let keyactive = false
let checkPush = false
let code = 0
let hits = 0
let misses = 0
let score = 0
let arrow1 = 700
let arrow2 = 900
lvl = 0
let nickplayer = ''
let object1 = {}
let lvl1 = lvl


// WPISANIE NICKU DODANIE DO TABLICY I ROZPOCZECIE GRY
rankingNick.sort((player1, player2) => player1.score - player2.score)


letsGo.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.welcome').style.display = 'none'
    const nick = input.value
    if (nick === "") {
        document.querySelector('.welcome').style.display = 'block'
        alert('PODAJ NICK')
    }
    nickplayer = input.value
})

const saveList = () => {
    rankingNick.forEach((player) => {
        // rankingNick.sort(compareNumbers)
        console.log(player.score)
        if (player.lvl === 'easy') {
            rankingEasy.push(player.nickplayer + ': ' + player.score)
        } else if (player.lvl === 'medium') {
            rankingMedium.push(player.nickplayer + ': ' + player.score);
        } else if (player.lvl === 'hard') {
            rankingHard.push(player.nickplayer + ': ' + player.score);
        }

    })
}

const renderList = () => {

    rankingEasy.forEach((name) => {
        const x = document.createElement('li')
        x.innerHTML = name
        ulEasy.appendChild(x)
    })

    rankingMedium.forEach((name) => {
        const x = document.createElement('li')
        x.innerHTML = name
        ulMedium.appendChild(x)
    })
    rankingHard.forEach((name) => {
        const x = document.createElement('li')
        x.innerHTML = name
        ulHard.appendChild(x)
    })
}

const clearArrow = () => {
    ulEasy.textContent = ''
    ulMedium.textContent = ''
    ulHard.textContent = ''
    rankingEasy.splice(0, rankingEasy.length)
    rankingMedium.splice(0, rankingMedium.length)
    rankingHard.splice(0, rankingHard.length)
}


// TABELA RANKINGU  OTWIERANIE ORAZ ZAMYKANIE JEJ

rankingClose.addEventListener('click', () => {
    document.querySelector('.rankingArrow').style.display = 'none'
    clearArrow()
})

rankingOpen.addEventListener('click', () => {
    if (keyactive === false && active2) {
        document.querySelector('.rankingArrow').style.display = 'block'
        saveList()
        renderList()
    }
})

// WYBIERANIE POZIOMU TRUDNOŚCI
const easy = document.querySelector('.easy')
const medium = document.querySelector('.medium')
const hard = document.querySelector('.hard')

easy.addEventListener('click', function () {
    if (active2) {
        timeStart = 10
        arrow1 = 700
        arrow2 = 900
        lvl = 'easy'
        active = true
    }
})
medium.addEventListener('click', function () {
    if (active2) {
        timeStart = 10
        arrow1 = 500
        arrow2 = 700
        lvl = 'medium'
        active = true
    }
})
hard.addEventListener('click', function () {
    if (active2) {
        timeStart = 10
        arrow1 = 350
        arrow2 = 450
        lvl = 'hard'
        active = true
    }
})


// SPRAWDZENIE ORAZ DODANIE EFEKTU TRAFIENIA LUB PUDŁA
const check = function (e) {
    checkPush = false
    if (code === e.keyCode && keyactive && timeStart >= -1 && active) {
        hit.textContent = ++hits
        hit.style.color = 'rgb(51, 255, 0)'
        if (e.keyCode === 37) {
            divLeft.classList.add('active')
        } else if (e.keyCode === 38) {
            divUp.classList.add('active')
        } else if (e.keyCode === 39) {
            divRight.classList.add('active')
        }
        container.style.boxShadow = '0px 10px 13px -7px #000000, 0px 0px 50px 50px rgba(11,255,0,0.5)'
        active = false
    } else if (keyactive && timeStart >= -1 && active) {
        miss.textContent = ++misses
        miss.style.color = 'red'
        if (e.keyCode === 37) {
            divLeft.classList.add('activemiss')
        } else if (e.keyCode === 38) {
            divUp.classList.add('activemiss')
        } else if (e.keyCode === 39) {
            divRight.classList.add('activemiss')
        }
        active = false
        container.style.boxShadow = '0px 10px 13px -7px #000000, 0px 0px 50px 50px rgba(255,0,0,0.5)'
    }
}
// score = hits - misses


// usuwanie efektu po nacisnieciu
const keyU = (e) => {
    if (e.keyCode === 37) {
        divLeft.classList.remove('active')
        divLeft.classList.remove('activemiss')
    } else if (e.keyCode === 38) {
        divUp.classList.remove('active')
        divUp.classList.remove('activemiss')
    } else if (e.keyCode === 39) {
        divRight.classList.remove('active')
        divRight.classList.remove('activemiss')
    }
    container.style.boxShadow = 'none'
}

window.addEventListener('keyup', keyU)


// ROZPOCZĘCIE GRY PO KLIKNIECIU START
btnStart.addEventListener('click', function () {
    if (LetsPlayActive) {
        if (active) {
            LetsPlayActive = false
            active2 = false
            keyactive = true
            const timer = setInterval(function () {
                time.textContent = 'TIME: ' + timeStart
                if (timeStart === -1) {
                    clearInterval(timer)
                }
                // GDY STOPER POKAŻE 0 WYSWIETLA SIE TABLICA Z WYNIKIEM ORAZ PRZYCISK ZAMKNIJ
                const scoreGame = document.querySelector('.score')
                const theEnd = document.querySelector('.theend')
                const close = document.querySelector('.close')
                // TWORZENIE OBJEKTU Z NICKIEM I WYNIKIEM GDZIE NASTEPNIE JEST PUSHOWANY DO TABLICY
                if (timeStart === -1) {
                    container.style.boxShadow = 'none'
                    score = hits - misses
                    object1 = {
                        nickplayer,
                        score,
                        lvl
                    }
                    rankingNick.push(object1)
                    rankingNick.sort((player1, player2) => player2.score - player1.score)
                    theEnd.style.display = 'block'
                    scoreGame.textContent = 'SCORE   ' + score
                    // nasluchiwanie na przyck zamknij, po klikniecu wszystko sie resetuje
                    close.addEventListener('click', function () {
                        theEnd.style.display = 'none'
                        hits = 0
                        misses = 0
                        hit.textContent = 0
                        miss.textContent = 0
                        score = 0
                        timeStart = 10
                        time.textContent = 'TIME: ' + timeStart
                        miss.style.color = 'black'
                        hit.style.color = 'black'
                        active = true
                        active2 = true
                        LetsPlayActive = true
                    })
                }
                timeStart--
            }, 1000)
        }
        if (active) {
            const game = setInterval(function () {
                // dodawanie  strzałki a pozniej jest jej losowanie i nadanie odpowiedniej klasy w IF poniżej
                const arrow = document.querySelector('.arrow')
                const addI = document.createElement('i')
                addI.style.fontSize = '120px'
                arrow.appendChild(addI)
                // wyswietlanie co zostalo wylosowane
                if (timeStart >= 0) {
                    const keynumber = Math.floor(Math.random() * 3)
                    checkPush = true
                    switch (keynumber) {
                        case 0:
                            code = 37
                            addI.classList.add('fa-chevron-left', 'fas')
                            break;
                        case 1:
                            code = 38
                            addI.classList.add('fa-chevron-up', 'fas')
                            break;
                        case 2:
                            code = 39
                            addI.classList.add('fa-chevron-right', 'fas')
                            break;
                    }
                }
                active = true
                keyflag = true
                // sprawdzenie wylosowana strzałka jest zgodna z klawiszem który został nacisniety
                window.addEventListener('keydown', check)
                // usuwanie strzalki 
                const deleteI = setTimeout(function () {
                    if (checkPush) {
                        miss.textContent = ++misses
                        miss.style.color = 'red'
                        checkPush = false
                        container.style.boxShadow = '0px 10px 13px -7px #000000, 0px 0px 50px 50px rgba(255,0,0,0.5)'
                    }
                    if (keyflag) {
                        arrow.removeChild(addI)
                    }
                }, arrow1)
                container.style.boxShadow = 'none'
                if (timeStart === -1) {
                    clearInterval(game)
                    keyactive = false
                }
            }, arrow2)
        }
    }
})

// ZMIANA NICKU

changeNick.addEventListener('click', () => {
    if (keyactive === false && active2) {
        document.querySelector('.welcome').style.display = 'block'
    }
})

// ZAMYKANANIE SAMOUCZKA 

document.querySelector('.instruction button').addEventListener('click', () => {
    document.querySelector('.instruction').style.display = 'none'
})