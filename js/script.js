
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
    const inputElement = $('<input type='+type+' placeholder="Email" class="input"/>')
    return inputElement
}

/**
 * Returns Button as a HTML <a> tag
 * @param {string} text 
 * @returns {Element}
 */
const getActionBtn = text => {
    const btn = $('<a>')
    btn.addClass('btn')
    btn.text(text)
    return btn
}

/**
 * Returns a label as a HTML <p> tag
 * @param {string} text 
 * @returns {Element}
 */
const getStatusLabel = (text = '') => {
    const label = $('<p>')
    label.addClass('label')
    label.text(text)
    return label
}


/**
 * Returns a icon element
 * @returns {Element}
 */
const getEmailIcon = () => {
    const element = $('<i>')
    element.addClass('fas fa-at')
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
const mainContainer = $('.main__container')
const inputContainer = $('<div>')
inputContainer.addClass('input__container')

// Appending all children to the container
inputContainer.append(getEmailIcon())
inputContainer.append(inputElement)
mainContainer.append(inputContainer)
mainContainer.append(label)
mainContainer.append($('<br>'))
mainContainer.append($('<br>'))
mainContainer.append(actionBtn)

/**
 * Utility function for changing button state
 * @param {string} status 
 */
const setButtonStatus = status => {
    if (status) {
        actionBtn.css({
            pointerEvents: 'auto',
            opacity: 1
        })
    } else {
        actionBtn.css({
            pointerEvents: 'none',
            opacity: 0.5
        })
    }
}
setButtonStatus(false)


/**
 * Validation Method for validating the email field
 * @param {string} email 
 */
const validate = email => {
    if (isValidateEmail(email)) {
        inputContainer.removeClass('invalid')
        if (getDomain(email).toLowerCase() === 'consultadd.com') {
            label.text(status.currect)
            inputContainer.addClass('currect')
            setButtonStatus(true)
        } else {
            label.text(status.notRegister)
            inputContainer.removeClass('currect')
            setButtonStatus(false)
        }
    } else if (email.length > 0) {
        inputContainer.addClass('invalid')
        label.text(status.error)
        setButtonStatus(false)
    } else {
        inputContainer.removeClass('currect')
        inputContainer.removeClass('invalid')
        label.text('')
        setButtonStatus(false)
    }
}

// Html Events Callbacks
inputElement.hover(e => {
    inputContainer.addClass('hover')
})

inputElement.mouseout(e => {
    inputContainer.removeClass('hover')
})

inputElement.on('input', e => {
    validate(e.target.value)
})

inputElement.focusin(e => {
    console.log('Input field is on focus')
})

inputElement.focusout(e => {
    console.log('Input field is not on focus')
})

actionBtn.click(async () => {
    console.log('Button was clicked')
    try {
        $.ajax({
            url: 'https://demo7857661.mockable.io/testdata',
            success: (result) => {
                localStorage.setItem('name', result.firstName)
                sessionStorage.setItem('age', result.age.toString())
                window.location = 'home.html'
            }
        })
    } catch (err) {
        console.log(err.message)
    }
})

