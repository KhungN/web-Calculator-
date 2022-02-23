class calculator{
    constructor(previousNums,currentNums){
        this.previousNums=previousNums;
        this.currentNums=currentNums
        this.clear()
    }

    clear(){
        this.currentInput="";
        this.previousInput="";
        this.operation=undefined; 
    }

    delete(){
        this.currentInput=this.currentInput.toString().slice(0,-1);
    }

    inputNumber(number){
        if(number==="." && this.currentInput.includes(".")) return
        this.currentInput=this.currentInput.toString()+number.toString();
    }

    chooseOperation(operation){
        if(this.currentInput==="") return 
        if(this.previousInput!==null){
            this.compute();
        }
        this.operation=operation;
        this.previousInput=this.currentInput;
        this.currentInput="";
        
    }

    compute(){
        let computation;
        let prevalue=parseFloat(this.previousInput);
        let curvalue=parseFloat(this.currentInput);
        if(isNaN(prevalue)||isNaN(curvalue)) return
        // if(!(prevalue)||!(curvalue)) return
        switch (this.operation){
            case '+':
                computation=prevalue+curvalue;
                break;
            case "-":
                computation=prevalue-curvalue;
                break;
            case "*":
                computation=prevalue*curvalue;
                break;
            case "÷":
                computation=prevalue/curvalue;
                break;
            default:
                return;
        } 
        this.currentInput=computation;
        this.previousInput="";
        this.operation=undefined;   

    }

    getcomma(number){
        const floatnum=number.toString();
        const integer=parseFloat(floatnum.split(".")[0])
        const decimal=floatnum.split(".")[1]
        let integerDisplay;
        if(isNaN(integer)){
            integerDisplay="";
        }else{
            integerDisplay=integer.toLocaleString("en",{maximumFractionDigits:0});
        }

        if(!decimal){
            return integerDisplay
        }else{
            return `${integerDisplay}.${decimal}`
        }
       
    }

    updateDisplay(){
        this.currentNums.innerText=this.getcomma(this.currentInput);
        if(this.operation){
            this.previousNums.innerText=`${this.getcomma(this.previousInput)} ${this.operation}`
        }else{
            this.previousNums.innerText=this.previousInput
        }
    }

}







const numberbtn=document.querySelectorAll(".number");
const operationbtn=document.querySelectorAll(".operation");
const previousNums=document.querySelector(".previous");
const currentNums=document.querySelector(".current");
const equalbtn=document.querySelector(".equal");
const allclearBtn=document.querySelector(".allClear");
const deleteBtn=document.querySelector(".delete");




const mycalculator=new calculator(previousNums,currentNums);

numberbtn.forEach(number=> {
    number.addEventListener("click",()=>{
        mycalculator.inputNumber(number.innerText);
        mycalculator.updateDisplay();
    })
});


operationbtn.forEach(operation=> {
    operation.addEventListener("click",()=>{
        mycalculator.chooseOperation(operation.innerText);
        mycalculator.updateDisplay();
    }) 
});

equalbtn.addEventListener("click",btn=>{
    mycalculator.compute();
    mycalculator.updateDisplay();
})


allclearBtn.addEventListener("click",btn=>{
    mycalculator.clear();
    mycalculator.updateDisplay();
})

deleteBtn.addEventListener("click",btn=>{
    mycalculator.delete();
    mycalculator.updateDisplay();
})