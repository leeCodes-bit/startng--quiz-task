

const options = document.querySelector('.options').children;
const answerTrackerContainer = document.querySelector('.answers-tracker');
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const correctAnswerSpan = document.querySelector('.correct-answers');
const totalQuestionSpan2 = document.querySelector('.total-question2');
const percentage = document.querySelector('.percentage');
const question = document.querySelector('#question'); 
const op1 = document.querySelector('.option1');
const op2 = document.querySelector('.option2');
const op3 = document.querySelector('.option3');
const op4 = document.querySelector('.option4');
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

//questions and options and answers

const questions = [
    {
        q: 'How do you call a function namned startng?',
        options: ['startng()','call startng()','call function startng()','none of the above'],
        answer:0
    },
    {
        q: 'what operator is used to assign a value to a variable?',
        options: ['-','=','+','*'],
        answer:1
    },
    {
        q: 'How do you declare a JavaScript variable?',
        options: ['variable myName','var myName','v myName','all of the above'],
        answer:1
    },
    {
        q: 'what does css stand for?',
        options: ['computer style sheets','colourful style sheets','cascading style sheets','none of the above'],
        answer:2
    },
    {

        q: 'what does scss stand for?',
        options: ['computer style sheets','colourful style sheets','cascading style sheets','none of the above'],
        answer:2
        // q: 'Inside which html element do we put the javascript code?',
        // options: ['<js>','<javascript>','<script>','<all of the above>'],
        // answer:0
    }
]

//set questions, options and question numbers 
totalQuestionSpan.innerHTML=questions.length;
function load(){
      questionNumberSpan.innerHTML=index+1; 
    question.innerHTML=questions[questionIndex].q;
    op1.innerHTML=questions[questionIndex].options[0];
    op2.innerHTML=questions[questionIndex].options[1];
    op3.innerHTML=questions[questionIndex].options[2];
    op4.innerHTML=questions[questionIndex].options[3];
    index++;
}

function check(element){
    //now let us check if option is correct or not
    if(element.id == questions[questionIndex].answer){
        element.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
        console.log('score: ' + score)
    }else{
        element.classList.add('wrong');    
        updateAnswerTracker('wrong')
        //if the user selected one option then disable all options    
    }
    disabledOptions()
} 
    
    function disabledOptions(){
        for(let i=0; i<options.length; i++){
            options[i].classList.add('disabled');
            //here we did disabled all options, for next question we have to enable options again below
            if(options[i].id == questions[questionIndex].answer){
                options[i].classList.add('correct');
            }           
        }
    }

    function enabledOptions(){
        for(let i=0; i<options.length; i++){
            options[i].classList.remove('disabled', 'correct', 'wrong');

        }
    }

    function Validate(){
        if(!options[0].classList.contains('disabled')){
           // if options[0] does not have class disabled
           alert('Please Select one Option')
        }else{
            enabledOptions();
            randomQuestion();
        }
    }

    //nexxt question
    function next(){
        //b4 going to next question, let us check if the user selected any option or not, if user did not select option then alert('pleaase select an option) else next question

        Validate();
    }

//but we need random questions for that 
function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate =0;

    if(index==questions.length){
        quizOver();
    }else{
        if(myArray.length>0){
            for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    hitDuplicate=1;
                    break;                  
                }
            }
            if(hitDuplicate==1){
                randomQuestion ();
            }else{
                //checking for question duplicacy
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);

            }
        }
        if(myArray.length==0){
        //checking for question duplicacy
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
        }
        // console.log('myarr: '+ myArr);
        myArray.push(randomNumber);
        // console.log('myArray: '+ myArray);
    }
   
        
}

//answer tracker
function answerTracker(){
    for(let i=0; i<questions.length; i++){
        const div= document.createElement('div')
        answerTrackerContainer.appendChild(div)
    }
}

function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

//creating a quiz over screen
function quizOver(){
    document.querySelector('.quiz-over').classList.add('show');
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + '%';
}

function tryAgain(){
    window.location.reload();
}

window.onload = function(){
    randomQuestion();
    answerTracker();
}