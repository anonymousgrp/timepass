
/**
 * Return domain name from any email
 * @param {email} email
 * @returns {string}
 */
const getDomain = email => email.replace(/.*@/, "")

/**
 * Return true if email is a valid email otherwise false
 * @param {email} email 
 * @returns {boolean}
 */
const isValidateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Returns HTMLInputElement
 * @param {string} type 
 * @returns {HTMLInputElement}
 */
const getInputElement = type => {
    const inputElement = document.createElement('input')
    inputElement.type = type
    inputElement.placeholder = 'Email'
    inputElement.className = 'input'
    return inputElement
}

/**
 * Returns Button as a HTML <a> tag
 * @param {string} text 
 * @returns {Element}
 */
const getActionBtn = text => {
    const btn = document.createElement('a')
    btn.className = 'btn'
    btn.appendChild(document.createTextNode(text))
    return btn
}

/**
 * Returns a label as a HTML <p> tag
 * @param {string} text 
 * @returns {Element}
 */
const getStatusLabel = (text = '') => {
    const label = document.createElement('p')
    label.className = 'label'
    label.appendChild(document.createTextNode(text))
    return label
}


/**
 * Returns a icon element
 * @returns {Element}
 */
const getEmailIcon = () => {
    const element = document.createElement('i')
    element.classList.add('fas', 'fa-at')
    return element
}

/**
 * All Validation Status Messages
 */
const status = {
    error: 'Invalid Email',
    notRegister: 'This email is not register',
    currect: 'Currect'
}

// Element References
const inputElement = getInputElement('email')
const actionBtn = getActionBtn('Submit')
const label = getStatusLabel('')
const mainContainer = document.querySelector('.main__container')
const inputContainer = document.createElement('div')
inputContainer.className = 'input__container'

// Appending all children to the container
inputContainer.appendChild(getEmailIcon())
inputContainer.appendChild(inputElement)
mainContainer.appendChild(inputContainer)
mainContainer.appendChild(label)
mainContainer.appendChild(document.createElement('br'))
mainContainer.appendChild(document.createElement('br'))
mainContainer.appendChild(actionBtn)

/**
 * Utility function for changing button state
 * @param {string} status 
 */
const setButtonStatus = status => {
    if (status) {
        actionBtn.style.pointerEvents = 'auto'
        actionBtn.style.opacity = 1
    }else {
        actionBtn.style.pointerEvents = 'none'
        actionBtn.style.opacity = 0.5
    }
}
setButtonStatus(false)


/**
 * Validation Method for validating the email field
 * @param {string} email 
 */
const validate = email => {
    if (isValidateEmail(email)) {
        inputContainer.classList.remove('invalid')
        if (getDomain(email).toLowerCase() === 'consultadd.com') {
            label.innerText = status.currect
            inputContainer.classList.add('currect')
            setButtonStatus(true)
        }else {
            label.innerText = status.notRegister
            inputContainer.classList.remove('currect')
            setButtonStatus(false)
        }
    }else if (email.length > 0) {
        inputContainer.classList.add('invalid')
        label.innerText = status.error
        setButtonStatus(false)
    }else {
        inputContainer.classList.remove('currect')
        inputContainer.classList.remove('invalid')
        label.innerText = ''
        setButtonStatus(false)
    }
}

// Html Events Callbacks
inputElement.onmouseover = e => {
    inputContainer.classList.add('hover')
}

inputElement.onmouseleave = e => {
    inputContainer.classList.remove('hover')
}

inputElement.oninput = e => {
    validate(e.target.value)
}

inputElement.onfocus = e => {
    console.log('Input field is on focus')
}

inputElement.onblur = e => {
    console.log('Input field is not on focus')
}

actionBtn.onclick = async () => {
    console.log('Button was clicked')
    try {
        const response = await fetch('https://demo7857661.mockable.io/testdata')
        const result = await response.json()
        localStorage.setItem('name', result.firstName)
        sessionStorage.setItem('age', result.age.toString())
        window.location = 'home.html'
    }catch(err) {
        console.log(err.message)
    }
}

