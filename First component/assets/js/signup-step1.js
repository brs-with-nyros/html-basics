/*form validation logic*/
window.onload = function () {
  var root = document.forms[0].elements
  var elementNumber

  for (elementNumber = 0; elementNumber < root.length; elementNumber++) {
    if (root[elementNumber].type == 'text') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        text(this)
      }
    }

    if (root[elementNumber].type == 'email') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        email(this)
      }
    } else if (root[elementNumber].type == 'submit') {
      root[elementNumber].onclick = function () {
        return validation(root[elementNumber])
      }
    }

    if (root[elementNumber].type == 'password') {
      root[elementNumber].onfocus = function () {
        strengthChecker(this)
      }
      root[elementNumber].onkeyup = function () {
        strengthChecker(this)
      }
    }
  }
}

//-----------------------------------------------------------------

//onfocus function
function myFocus(field) {
  var err = field.name + 'error'
  if (field.value.length == 0 && !document.getElementById(err)) {
    var errorMsg = document.createElement('span')
    errorMsg.id = err
    errorMsg.textContent = 'Please fill the field'
    errorMsg.style.color = 'red'
    field.parentNode.appendChild(errorMsg)
  }
}

//-------------------------validations--------------------------------------------------------
//text boxes validation+
function text(textValid) {
  var type = textValid.getAttribute('type')
  var show = textValid.name + 'error'
  var minLength = textValid.getAttribute('min')
  var maxLength = textValid.getAttribute('max')
  if (minLength == null) minLength = 2
  if (maxLength == null) maxLength = 50

  if (type == 'text') {
    var textValue = textValid.value.length
    if (textValue == 1) {
      document.getElementById(show).innerHTML = '&#10008; minimum 2 chars'
      document.getElementById(show).style.color = 'red'
      return false
    } else if (textValue >= minLength && textValue <= maxLength) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = 'green'
      return true
    }
  }
}

//---------------------------------------------------------------------
// Email validation function

function email(emailValid) {
  var type = emailValid.getAttribute('type')
  var show = emailValid.name + 'error'
  if (type == 'email') {
    var match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var emailValue = emailValid.value.length
    if (emailValue == 0) {
      document.getElementById(show).innerHTML = '&#10008; Not Empty'
      document.getElementById(show).style.color = 'balck'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == false) {
      document.getElementById(show).innerHTML =
        '&#10008; Enter a valid email address'
      document.getElementById(show).style.color = 'red'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == true) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = 'green'
      return true
    }
  }
}

//---------------------------------------------------------------------------------
//password validation
let parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
}
let strengthBar = document.getElementById('strength-bar')
let msg = document.getElementById('msg')

function strengthChecker() {
  let password = document.getElementById('password').value

  parameters.letters = /[A-Za-z]+/.test(password) ? true : false
  parameters.numbers = /[0-9]+/.test(password) ? true : false
  parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)
    ? true
    : false
  parameters.count = password.length > 7 ? true : false

  let barLength = Object.values(parameters).filter((value) => value)

  strengthBar.innerHTML = ''
  for (let i in barLength) {
    let span = document.createElement('span')
    span.classList.add('strength')
    strengthBar.appendChild(span)
  }

  let spanRef = document.getElementsByClassName('strength')
  for (let i = 0; i < spanRef.length; i++) {
    switch (spanRef.length - 1) {
      case 0:
        spanRef[i].style.background = '#ff3e36'
        msg.textContent = 'Your password is very weak'
        break
      case 1:
        spanRef[i].style.background = '#ff691f'
        msg.textContent = 'Your password is weak'
        break
      case 2:
        spanRef[i].style.background = '#ffda36'
        msg.textContent = 'Your password is good'
        break
      case 3:
        spanRef[i].style.background = '#0be881'
        msg.textContent = 'Your password is strong'
        break
    }
  }
}

//----------------------------------------------------------------------------------------
//radio button validation
function validation() {
  var gender = document.forms['myform']['gender'].value

  if (gender == '') {
    document.getElementById('messages').innerHTML = '*Please select anyone*'
    document.getElementById('messages').style.color = 'red'

    return false
  } else if (gender == 'female' || gender == 'male') {
    document.getElementById('messages').innerHTML = ''
  }
}

//----------------------------------------------------------------------------------------
//Form Validation
function validation(form) {
  var x = document.forms[0].elements
  var radioCheck = 0,
    radioButton = 0

  for (var i = 0; i < x.length; i++) {
    var funRegex = /^[A-Za-z0-9 ]/
    var match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var type = x[i].type
    var minLength = x[i].getAttribute('min')
    var maxLength = x[i].getAttribute('max')

    if (type == 'text') {
      if (minLength == null) minLength = 2
      if (maxLength == null) maxLength = 50
      if (x[i].value.length < minLength || x[i].value.length > maxLength) {
        x[i].focus()
        return false
      } else if (
        x[i].value.length > minLength &&
        x[i].value.length < maxLength &&
        funRegex.test(x[i]).value == false
      ) {
        x[i].focus()
        return false
      }
    } else if (type == 'email') {
      if (x[i].value.length == 0) {
        x[i].focus()
        return false
      }

      if (match.test(x[i].value) != true) {
        x[i].focus()
        return false
      }
    } else if (type == 'password') {
      if (minLength == null) minLength = 4
      if (maxLength == null) maxLength = 12
      if (
        x[i].value.length < minLength ||
        x[i].value.length > maxLength ||
        x[i].value.length == 0
      ) {
        x[i].focus()
        return false
      } else if (
        x[i].value.length > minLength &&
        x[i].value.length < maxLength
      ) {
        x[i].focus()
        return false
      }
    } else if (type == 'radio') {
      var l = x[i].parentNode.children.length
      for (var j = 0; j < l; j++) {
        if (x[i].parentNode.children[j].type == 'radio') {
          radioButton++
        }
        if (x[i].parentNode.children[j].checked == true) {
          radioCheck++
          x[i].style.outline = '0px'
        }
      }
      if (radioButton > 0 && radioCheck == 0) {
        x[i].focus()
        x[i].style.outline = '1px solid red'
        return false
      } else {
        radioButton = 0
        radioCheck = 0
      }
    }
  }
}

//----------------------------------------------------------------------------------------

// Show password function
function myFunction() {
  var showPwd = document.getElementById('password')
  if (showPwd.type === 'password') {
    showPwd.type = 'text'
  } else {
    showPwd.type = 'password'
  }
}
