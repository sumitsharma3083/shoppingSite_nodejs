
var userBtn = document.querySelector('.user_btn')
var subList = document.querySelector('.suboption')

userBtn.addEventListener('click', function(){
     var effect = subList.getAttribute('id')
      if(effect == 'show')
      {
        subList.setAttribute('id', 'hide')
      }
      else{
        subList.setAttribute('id', 'show')
      }
       
})