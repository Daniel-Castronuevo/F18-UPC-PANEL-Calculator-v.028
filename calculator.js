"use strict"

// CARGAR CALCULADORA //

const calculator = document.querySelector(".container-calc");

addEventListener("load",()=>{
    calculator.style.opacity = 1
});

// ERRORES DEL SISTEMA //

// let err500 = `<p class="tipping-on">ERR&nbsp;500</p>`
let err500 = "ERR 500"
let err510 = "ERR 510"
let err520 = "ERR 520"
let err530 = "ERR 530"
let err540 = "ERR 540"
let err550
let err560

// PANTALLA //

const mainScreen = document.querySelector(".tipping");

// VALOR ACTUAL //

let actualValue = [``,``,``];

//- - - - - - - - - - - - BOTONES NÚMEROS - - - - - - - - - - - -//

const botonesNumeros = document.querySelectorAll(".button-num");

botonesNumeros.forEach(boton => {
    boton.addEventListener("click",()=>{
        setTimeout(() => {
            boton.blur(actualValue);
        }, 1);

        if(mainScreen.innerHTML[22] == `E`){
            mainScreen.innerHTML= ``
            actualValue = [``,``,``];
        }
    

        else if (actualValue[1] == ``){

            actualValue[0] += boton.value
                            
            if(boton.value == 1){
                mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${boton.value}</p>`
            }
            else if(boton.value == 7){
                mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${boton.value}</p>`
            }
            else {
                mainScreen.innerHTML += `<p class="tipping-on">${boton.value}</p>`
            }

        }
        else {

            actualValue[2] += boton.value

            if(boton.value == 1){
            mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${boton.value}</p>`
            }
            else if(boton.value == 7){
                mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${boton.value}</p>`
            }
            else {
                mainScreen.innerHTML += `<p class="tipping-on">${boton.value}</p>`
            }

        }

        verifyLength();

    })
});

//- - - - - - - - - - - - BOTONES OPERADORES BÁSICOS - - - - - - - - - - - -//

let OPcount = ``;

const botonesOperadores = document.querySelectorAll(".button-op");

botonesOperadores.forEach(botonOP => {
    botonOP.addEventListener("click",()=>{

        actualValue[1] += botonOP.value

        verifyOP();

        if(OPcount.length < 1){
            return
        }
        
        else if(mainScreen.innerHTML[22] == `E`){
            mainScreen.innerHTML= ``
            actualValue = [``,``,``];
        }

        else if(botonOP.value == `+`){
            mainScreen.innerHTML += `<p class="tipping-on tipping-on--plus-sign">${botonOP.value}</p>`
        }
        else if(botonOP.value == `-`){
            mainScreen.innerHTML += `<p class="tipping-on tipping-on--minus-sign">${botonOP.value}</p>`
        }
        else if(botonOP.value == `/`){
            mainScreen.innerHTML += `<p class="tipping-on tipping-on--division-sign">${botonOP.value}</p>`
        }
        else if(botonOP.value == `x`){
            mainScreen.innerHTML += `<p class="tipping-on tipping-on--multiplication-sign">${botonOP.value}</p>`
        }
        verifyLength();
    })
});

//- - - - - - - - - - - - - - - BOTON AC - - - - - - - - - - - - - - -//

const buttonAC = document.querySelector(".AC-button");

buttonAC.addEventListener("click",()=>{
    actualValue = [``,``,``];
    screensInUse = [false,false,false,false,false];
    resultScreen5.innerHTML = ``
    resultScreen4.innerHTML = ``
    resultScreen3.innerHTML = ``
    resultScreen2.innerHTML = ``
    resultScreen1.innerHTML = ``
    mainScreen.innerHTML = ``;
    saveResults = [false,false,false,false,false];
    OPcount = ``

})

//- - - - - - - - - - - - - - - BOTON ENTER - - - - - - - - - - - - - - -//

const buttonENTER = document.querySelector(".button-enter");

addEventListener("keypress",()=>{
    calculate(actualValue[0],actualValue[1],actualValue[2]);
    mainScreen.innerHTML = ``;
    actualValue = [``,``,``];
    OPcount = ``
})

buttonENTER.addEventListener("click",()=>{
    calculate(actualValue[0],actualValue[1],actualValue[2]);
    mainScreen.innerHTML = ``;
    actualValue = [``,``,``];
    OPcount = ``
})

//- - - - - - - - - - - - - - - CALCULAR - - - - - - - - - - - - - - -//

let result

const calculate = (num1,op,num2) => {

    if (num1 == ``){
        num1 = 0;
    }

    else if(op == ``){
        op = `+`
        num2 = 0;
    }

    else if(num2 == ``){
        num2 = 0;
    }

    if (op == `+`){
        result = parseFloat(num1) + parseFloat(num2);
        putInScreen(Math.round(result)); 
        saveResult(Math.round(result));
    }
    else if (op == `-`){
        result = parseFloat(num1) - parseFloat(num2);
        let resultString = result.toString()
        if (resultString.includes("-")){
            putInScreen("N"); 
            saveResult("N");
        }
        else{
            putInScreen(result); 
            saveResult(result);
        }
    }
    else if (op == `x`){
        result = parseFloat(num1) * parseFloat(num2);
        putInScreen(Math.round(result)); 
        saveResult(Math.round(result));
    }
    else if (op == `/`){
        result = parseFloat(num1) / parseFloat(num2);
        let resultString = result.toString()
        if (resultString.includes(".")){
            putInScreen("^"+Math.round(result)); 
            saveResult(Math.round(result));
        }
        else{
            putInScreen(result); 
            saveResult(result);
        }
    }
}

//- - - - - - - - - - - - - - - PUT IN SCREENS - - - - - - - - - - - - - - -//

const resultScreen1 = document.querySelector(".result1");
const resultScreen2 = document.querySelector(".result2");
const resultScreen3 = document.querySelector(".result3");
const resultScreen4 = document.querySelector(".result4");
const resultScreen5 = document.querySelector(".result5");

let screensInUse = [false,false,false,false,false];

const putInScreen = (res) =>{

    let resString = res.toString()

    if(resString == "Infinity"){
        pullDownScreens();
        for (let i = 0; i < err510.length; i++){
            if (err510[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-ERR510">${err510[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${err510[i]}</p>`
            }
        }
    }

    else if (resString == "N"){
        pullDownScreens();
        for (let i = 0; i < err520.length; i++){
            if (err520[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-ERR520">${err520[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${err520[i]}</p>`
            }
        }
    }

    else if(resString.length > 8){
        pullDownScreens();
        for (let i = 0; i < err540.length; i++){
            if (err540[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-ERR510">${err540[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${err540[i]}</p>`
            }
        }
    }

    else if (screensInUse[0] == false){
        pullDownScreens();
        for (let i = 0; i < resString.length; i++){
            if (resString[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-1">${resString[i]}</p>`
            }
            else if (resString[i] == 7){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-7">${resString[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${resString[i]}</p>`
            }
        }
        screensInUse[0] = true;
        screensInUse[4] = false;
    }
    else if (screensInUse[1] == false){
        pullDownScreens();
        for (let i = 0; i < resString.length; i++){
            if (resString[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-1">${resString[i]}</p>`
            }
            else if (resString[i] == 7){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-7">${resString[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${resString[i]}</p>`
            }
        }
        screensInUse[1] = true;
    }
    else if (screensInUse[2] == false){
        pullDownScreens();
        for (let i = 0; i < resString.length; i++){
            if (resString[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-1">${resString[i]}</p>`
            }
            else if (resString[i] == 7){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-7">${resString[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${resString[i]}</p>`
            }
        }
        screensInUse[2] = true;
    }
    else if (screensInUse[3] == false){
        pullDownScreens();
        for (let i = 0; i < resString.length; i++){
            if (resString[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-1">${resString[i]}</p>`
            }
            else if (resString[i] == 7){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-7">${resString[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${resString[i]}</p>`
            }
        }
        screensInUse[3] = true;
    }
    else if (screensInUse[4] == false){
        pullDownScreens();
        for (let i = 0; i < resString.length; i++){
            if (resString[i] == 1){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-1">${resString[i]}</p>`
            }
            else if (resString[i] == 7){
                resultScreen1.innerHTML += `<p class="tipping-on tipping-on-7">${resString[i]}</p>`
            }
            else{
                resultScreen1.innerHTML += `<p class="tipping-on">${resString[i]}</p>`
            }
        }
        screensInUse[4] = true;
        screensInUse[0] = false;
        screensInUse[1] = false;
        screensInUse[2] = false;
        screensInUse[3] = false;
    }
}

const pullDownScreens = ()=>{
    resultScreen5.innerHTML = resultScreen4.innerHTML;
    resultScreen4.innerHTML = ``;
    resultScreen4.innerHTML = resultScreen3.innerHTML;
    resultScreen3.innerHTML = ``;
    resultScreen3.innerHTML = resultScreen2.innerHTML;
    resultScreen2.innerHTML = ``;
    resultScreen2.innerHTML = resultScreen1.innerHTML;
    resultScreen1.innerHTML = ``;
}

//- - - - - - - - - - - - - - - SAVE RESULTS - - - - - - - - - - - - - - -//

let saveResults = [false,false,false,false,false];

const saveResult = (res)=>{
    pullDownResults();
    if (saveResults[0] == false){
        saveResults[0] = res;
    }
    else if (saveResults[1] == false){
    pullDownResults();
        saveResults[1] = saveResults[0];
        saveResults[1] = res;
    }
    else if (saveResults[2] == false){
    pullDownResults();
        saveResults[2] = saveResults[1];
        saveResults[2] = res;
    }
    else if (saveResults[3] == false){
    pullDownResults();
        saveResults[3] = saveResults[2];
        saveResults[3] = res;
    }
    else if (saveResults[4] == false){
    pullDownResults();
        saveResults[4] = saveResults[3];
        saveResults[4] = res;
    }
}

const pullDownResults = () =>{
    saveResults[4] = false;
    saveResults[4] = saveResults[3];
    saveResults[3] = false;
    saveResults[3] = saveResults[2];
    saveResults[2] = false;
    saveResults[2] = saveResults[1];
    saveResults[1] = false;
    saveResults[1] = saveResults[0];
    saveResults[0] = false;
}

//- - - - - - - - - - - - - - - BOTÓN DEL - - - - - - - - - - - - - - -//

const buttonDEL = document.querySelector(".button-delete");

buttonDEL.addEventListener("click",()=>{
    mainScreen.innerHTML = ``
    actualValue = [``,``,``];
    OPcount = ``
})

//- - - - - - - - - - - - - - - BOTÓNES TAKE - - - - - - - - - - - - - - -//

const takeButtons = document.querySelectorAll(".button-take");

takeButtons.forEach(buttonTK => {
    buttonTK.addEventListener("click",()=>{

        if(mainScreen.innerHTML[22] == `E`){
            mainScreen.innerHTML= ``
            actualValue = [``,``,``];
        }

        else if (buttonTK.value == 1){

            let saveResultsString = saveResults[0].toString()

            if (saveResults[0] == false){
                return 
            }

            else if (saveResults[0] == Infinity || saveResults[0] == "N"){
                return 
            }

            else if (actualValue[0] == `` && actualValue[1] != ``){
                actualValue[2] += saveResults[3]
            }

            else if (actualValue[0] == `` || actualValue[1] == ``){
                actualValue[0] += saveResults[0]
            }
            else if (actualValue[0] != ``){
                actualValue[2] += saveResults[0]
            }
            for (let i = 0; saveResultsString.length > i ; i++){
                if (saveResultsString[i] == 1){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${saveResultsString[i]}</p>`
                }
                else if (saveResultsString[i] == 7){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${saveResultsString[i]}</p>`
                }
                else{
                    mainScreen.innerHTML += `<p class="tipping-on">${saveResultsString[i]}</p>`
                }
                
            }
        }
        else if (buttonTK.value == 2){

            let saveResultsString = saveResults[1].toString()

            if (saveResults[1] == false){
                return 
            }

            else if (saveResults[1] == Infinity || saveResults[1] == "N"){
                return 
            }

            else if (actualValue[0] == `` && actualValue[1] != ``){
                actualValue[2] += saveResults[3]
            }

            else if (actualValue[0] == `` || actualValue[1] == ``){
                actualValue[0] += saveResults[1]
            }
            else if (actualValue[0] != ``){
                actualValue[2] += saveResults[1]
            }

            for (let i = 0; saveResultsString.length > i ; i++){

                if (saveResultsString[i] == 1){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${saveResultsString[i]}</p>`
                }
                else if (saveResultsString[i] == 7){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${saveResultsString[i]}</p>`
                }
                else{
                    mainScreen.innerHTML += `<p class="tipping-on">${saveResultsString[i]}</p>`
                }
                
            }
        }
        else if (buttonTK.value == 3){

            let saveResultsString = saveResults[2].toString()

            if (saveResults[2] == false){
                return 
            }

            else if (saveResults[2] == Infinity || saveResults[2] == "N"){
                return 
            }

            else if (actualValue[0] == `` && actualValue[1] != ``){
                actualValue[2] += saveResults[3]
            }

            else if (actualValue[0] == `` || actualValue[1] == ``){
                actualValue[0] += saveResults[2]
            }
            else if (actualValue[0] != ``){
                actualValue[2] += saveResults[2]
            }

            for (let i = 0; saveResultsString.length > i ; i++){
                if (saveResultsString[i] == 1){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${saveResultsString[i]}</p>`
                }
                else if (saveResultsString[i] == 7){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${saveResultsString[i]}</p>`
                }
                else{
                    mainScreen.innerHTML += `<p class="tipping-on">${saveResultsString[i]}</p>`
                }
                
            }
        }
        else if (buttonTK.value == 4){

            let saveResultsString = saveResults[3].toString()

            if (saveResults[3] == false){
                return 
            }

            else if (saveResults[3] == Infinity || saveResults[3] == "N"){
                return 
            }

            else if (actualValue[0] == `` && actualValue[1] != ``){
                actualValue[2] += saveResults[3]
            }

            else if (actualValue[0] == `` || actualValue[1] == ``){
                actualValue[0] += saveResults[3]
            }

            else if (actualValue[0] != ``){
                actualValue[2] += saveResults[3]
            }


            for (let i = 0; saveResultsString.length > i ; i++){
                if (saveResultsString[i] == 1){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${saveResultsString[i]}</p>`
                }
                else if (saveResultsString[i] == 7){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${saveResultsString[i]}</p>`
                }
                else{
                    mainScreen.innerHTML += `<p class="tipping-on">${saveResultsString[i]}</p>`
                }
                
            }
        }
        else if (buttonTK.value == 5){

            let saveResultsString = saveResults[4].toString()

            if (saveResults[4] == false){
                return 
            }

            else if (saveResults[4] == Infinity || saveResults[4] == "N"){
                return 
            }

            else if (actualValue[0] == `` && actualValue[1] != ``){
                actualValue[2] += saveResults[3]
            }

            else if (actualValue[0] == `` || actualValue[1] == ``){
                actualValue[0] += saveResults[4]
            }
            else if (actualValue[0] != ``){
                actualValue[2] += saveResults[4]
            }


            for (let i = 0; saveResultsString.length > i ; i++){
                if (saveResultsString[i] == 1){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-1">${saveResultsString[i]}</p>`
                }
                else if (saveResultsString[i] == 7){
                    mainScreen.innerHTML += `<p class="tipping-on tipping-on-7">${saveResultsString[i]}</p>`
                }
                else{
                    mainScreen.innerHTML += `<p class="tipping-on">${saveResultsString[i]}</p>`
                }
                
            }
        }
        verifyLength();
    })
})

//- - - - - - - - - - - - - COMPROBAR LARGO PANTALLA MAIN - - - - - - - - - - - - -//

const verifyLength = ()=>{
    let actualValueString = `${actualValue[0]}${actualValue[1]}${actualValue[2]}`

    if (actualValueString.length >= 11){
        mainScreen.innerHTML = ``
        actualValue = [``,``,``];
        for(let i = 0; i < err500.length; i++){
            mainScreen.innerHTML += `<p class="tipping-on">${err500[i]}</p>`
        }
    }
}

//- - - - - - - - - - - COMPROBAR NUM OPERADORES - - - - - - - - - - -//

const verifyOP = () => {

    OPcount = actualValue[1]

    if (OPcount.length > 1){
        mainScreen.innerHTML = ``
        actualValue = [``,``,``];
        OPcount = ``
        for(let i = 0; i < err530.length; i++){
            mainScreen.innerHTML += `<p class="tipping-on">${err530[i]}</p>`
        }
    }
}

//- - - - - - - - - - BOTONES RAÍZ Y POTÉNCIA - - - - - - - - -//

const powerButton = document.querySelector(".power-button");

powerButton.addEventListener("click",()=>{

})

