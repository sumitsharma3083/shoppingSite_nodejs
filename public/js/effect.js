
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




/**
 *  Following code deals with the personalinfo.ejs 
 * 
 **/ 
var email_change_container  = document.querySelector('.email_change_form')
var crossBtn  = document.querySelector('#cross_btn')
var overlay = document.querySelector('.overlay')
var editEmailBtn = document.querySelector('#edit_email_btn')
var body  = document.querySelector('body')


      crossBtn.addEventListener('click', function(){
        email_change_container.style.display =  'none';
        overlay.style.display = 'none';
        body.style.overflow   =  'visible';
      })

      editEmailBtn.addEventListener('click', function(){
        email_change_container.style.display =  'block';
        overlay.style.display = 'block';
        overlay.style.opacity = 0.7;
        body.style.overflow  =  'hidden';
      })
