// An array consisting of all the possible paragraphs that can be used
const paragraphs = ["The word 'bean' and its Germanic cognates (e.g. German Bohne) have existed in common use in West Germanic languages since before the 12th century,[3] referring to broad beans, chickpeas, and other pod-borne seeds. This was long before the New World genus Phaseolus was known in Europe. With the Columbian exchange of domestic plants between Europe and the Americas, use of the word was extended to pod-borne seeds of Phaseolus, such as the common bean and the runner bean, and the related genus Vigna. The term has long been applied generally to many other seeds of similar form,[3][4] such as Old World soybeans, peas, other vetches, and lupins, and even to those with slighter resemblances, such as coffee beans, vanilla beans, castor beans, and cocoa beans. Thus the term 'bean' in general usage can refer to a host of different species.",
"A bean is the seed of several plants in the family Fabaceae, which are used as vegetables for human or animal food.[1] They can be cooked in many different ways,[2] including boiling, frying, and baking, and are used in many traditional dishes throughout the world.",
"The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start."];
var index = 0;
var errors = 0;
var started = false;
var splitText = getRandomParagraph().split("");

const text = document.getElementById("text");
const input = document.getElementById("input");
const startText = document.getElementById("startText");
const resumeText = document.getElementById("resumeText");
const endText = document.getElementById("endText");

splitText.forEach(letter => {
    text.innerHTML+="<span>"+letter+"</span>";
});

text.addEventListener("click", startTest);

input.addEventListener("keydown",checkChar);

function startTest(e){
    if(!started){
        startText.style.color = "transparent";
        text.getElementsByTagName("span")[index].id = "current";
        started = true;
    }else{
        resumeText.style.color = "transparent";
    }
    text.style.filter = "blur(0px)";
    input.focus();
}

function checkChar(e){
    if(index < splitText.length){
        updateChar(e);
    }
    if(index >= splitText.length){
        input.blur();
        text.removeEventListener("click",startTest);
        input.removeEventListener("keydown",checkChar);
        text.style.filter = "blur(4px)";
        resumeText.style.color = "transparent";
        endText.style.color = "#20FC8F";
        endText.innerHTML+=Math.round((1-(errors/splitText.length))*10000)/100+"%";
    }
}

function updateChar(e){
    if(e.keyCode == 8 && index > 0){
        text.getElementsByTagName("span")[index].id = "null";
        index--;
        text.getElementsByTagName("span")[index].id = "current";
    }else if(e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode >= 188 && e.keyCode <= 222 || e.keyCode == 32){
        if(splitText[index] == e.key){
            text.getElementsByTagName("span")[index].id = "correct";
        }else{
            if(splitText[index] == ' '){
                text.getElementsByTagName("span")[index].id = "incorrectSpace";
            }else{
                text.getElementsByTagName("span")[index].id = "incorrect";
            }
            errors++;
        }
        index++;
        if(index < splitText.length){
            text.getElementsByTagName("span")[index].id = "current";
        }
    }else{
        e.preventDefault();
    }
}

function blurText(){
    text.style.filter = "blur(4px)";
    resumeText.style.color = "#20FC8F";
}

function getRandomParagraph(){
    return paragraphs[Math.floor(Math.random()*paragraphs.length)];
}