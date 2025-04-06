
let score= JSON.parse(localStorage.getItem('saving.score'))
       
      if(score===null){
        score={
          Wins:0,
          Losses:0,
          Ties:0
        }
      }
      
      displaying_score_with_updating_on_the_page()
     

      document.querySelector('.js-autoPlay')
      .addEventListener('click',()=>{
        autoPlay();
      })

      let isAutoPlaying=false;
      let intervalId=undefined;
      function autoPlay(){
        if(!isAutoPlaying){
          intervalId=setInterval(()=>{
            const playerMove=pickComputerMove()
            playGame(playerMove)
          },1000);
          isAutoPlaying=true;
          document.querySelector('.js-autoPlay').innerText='Stop Playing'
        }else{
          clearInterval(intervalId);
          isAutoPlaying=false;
          document.querySelector('.js-autoPlay').innerText='Auto Play'
        }
      
      }



      document.body.addEventListener(('keydown'),(event)=>{
        if(event.key==='a'){
          autoPlay();
        }
      })

      document.querySelector('.js-rock')
      .addEventListener('click',()=>{playGame('rock')});

      document.querySelector('.js-paper')
      .addEventListener('click',()=>{
        playGame('paper');
      })

      document.querySelector('.js-scissors')
      .addEventListener('click',()=>{
        playGame('scissors');
      })

      function resetScore(){
        score.Wins=0;
        score.Ties=0;
        score.Losses=0;
        localStorage.removeItem('saving.score');
        displaying_score_with_updating_on_the_page();
      }


      
  function confirmationReset(){
      document.querySelector('.reseting-letter')
      .innerHTML=
     `
      <p class="js-before-reseting">Are u sure you want to reset it?</p>
      <button class="js-yes">Yes</button>
      <button class="js-no">No</button>
      `
      document.querySelector('.js-yes')
      .addEventListener(('click'),()=>{
        resetScore();
        document.querySelector('.reseting-letter')
        .innerHTML='';
      })
      document.querySelector('.js-no')
      .addEventListener(('click'),()=>{
        document.querySelector('.reseting-letter')
        .innerHTML='';
      })
      }
    
    

      document.querySelector('.js-reset')
      .addEventListener('click',()=>{
        confirmationReset()
      })
      
      
    document.body.addEventListener(('keydown'),(event)=>{
      if(event.key==='Backspace'){
        resetScore();
      }
    })

     

      document.body.addEventListener('keydown',(event)=>{
        if(event.key==='r'){
          playGame('rock');
        }else if(event.key==='p'){
          playGame('paper');
        }else if(event.key==='s'){
          playGame('scissors');
        }
      })

      const Images = {
        rock: '<img class="icon-game-css" src="images/rock-emoji.png">',
        paper: '<img class="icon-game-css" src="images/paper-emoji.png">',
        scissors: '<img class="icon-game-css" src="images/scissors-emoji.png">'
      };




      function playGame(playerMove) {
        const computerMove = pickComputerMove();
        let result='';
        

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        }

        if(result==='You win.'){
          score.Wins+=1
        }else if(result==='You lose.'){
          score.Losses+=1
        }else if(result==='Tie.'){
          score.Ties+=1
        }

       
        localStorage.setItem('saving.score',JSON.stringify(score) ); 

        displaying_score_with_updating_on_the_page()
        
        const displayResults=document.querySelector('.js-display3')
        displayResults.innerHTML=result

        const displayMoves=document.querySelector('.js-display2')
        displayMoves.innerHTML=
        `You ${Images[playerMove]} - Computer${Images[computerMove]}
      

        `
      }

      function pickComputerMove() {
        const randomNumber = Math.random();
        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      function displaying_score_with_updating_on_the_page(){
        const displayP= document.querySelector('.js-display');
          displayP.innerHTML=`Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`

      }

      
