let checkBoxList = document.querySelectorAll('.custom-checkbox')
let inputFields = document.querySelectorAll('.goal-input')
let newNode = document.getElementsByClassName("input-container")[0]
const errorMessage = document.querySelector("body > div > p.error")
const progressValue = document.querySelector('.progress-value')
const addButton = document.querySelector('.addB')
let progText = document.querySelector("body > div > div.progress-bar > div > span")

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well Done! Keep Working...',
    'WoW! You almost made it...',
    'Good Job!🥳',
    'Congratulations🎉 You made it !',
    'Well Done Champion 🏆'
]

const bottomQuotes = [
    'Move one step ahead, today!',
    'You can be The Champion',
    'You can be The Hero',
    'Dedicate Yourself',
    'You gonna find yourself!',
    'Standing in the Hall of Fame'
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalCount / inputFields.length * 100}%`
progText.innerText = `${completedGoalCount}/${inputFields.length} Completed`
document.querySelector("body > div > p:nth-child(2)").innerText = allQuotes[completedGoalCount]
document.querySelector("body > div > p:nth-child(7)").innerText = bottomQuotes[completedGoalCount]

let count = 3
addButton.addEventListener('click', (e) => {

    if (progressValue.style.width == '100%') return

    if (count < 5) {
    count++

    let node = newNode.lastElementChild
    newNode.appendChild(node.cloneNode(true))

    node = newNode.lastElementChild

    if (count == 4) {
        node.lastElementChild.id = "fourth"
        node.lastElementChild.value = ''
        node.classList.remove('completed')
    }
    else if (count == 5) {
        node.lastElementChild.id = "fifth"
        node.lastElementChild.value = ''
        node.classList.remove('completed')
    }

    inputFields = document.querySelectorAll('.goal-input')
    checkBoxList = document.querySelectorAll('.custom-checkbox')
    // console.log(inputFields);
    // console.log(checkBoxList);
    checkBoxList[checkBoxList.length-1].addEventListener('click', (e) => {
        console.log(e.target);
        const allInputFields = [...inputFields].every((input) => {
            return input.value
        })
        if (allInputFields) {
            e.currentTarget.parentElement.classList.toggle('completed')
            const inputID = e.currentTarget.nextElementSibling.id
            allGoals[inputID].completed = !allGoals[inputID].completed
            completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalCount / inputFields.length * 100}%`
            progText.innerText = `${completedGoalCount}/${inputFields.length} Completed`
            document.querySelector("body > div > p:nth-child(2)").innerText = allQuotes[completedGoalCount]
            document.querySelector("body > div > p:nth-child(7)").innerText = bottomQuotes[completedGoalCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

        } else {
            errorMessage.innerText = 'Please set all the 3 goals!'
                errorMessage.style.display = 'block';
        }
    })

    inputFields[inputFields.length-1].addEventListener('focus', () => {
        errorMessage.style.display = 'none';
    })

    inputFields[inputFields.length-1].addEventListener('input', (e) => {

        if (allGoals[e.target.id] && allGoals[e.target.id].completed) {
            e.target.value = allGoals[e.target.id].data
            return
        }

        allGoals[e.target.id] = {
            data : e.target.value,
            completed : false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })

} else {
    errorMessage.innerText = 'Hold on! Do not add more than 5 Goals.'
    errorMessage.style.display = 'block';
}

})

checkBoxList.forEach((check) => {
    check.addEventListener('click', (e) => {

        const allInputFields = [...inputFields].every((input) => {
            return input.value
        })
        if (allInputFields) {
            check.parentElement.classList.toggle('completed')
            const inputID = check.nextElementSibling.id
            allGoals[inputID].completed = !allGoals[inputID].completed
            completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalCount / inputFields.length * 100}%`
            progText.innerText = `${completedGoalCount}/${inputFields.length} Completed`
            document.querySelector("body > div > p:nth-child(2)").innerText = allQuotes[completedGoalCount]
            document.querySelector("body > div > p:nth-child(7)").innerText = bottomQuotes[completedGoalCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
            else {
                errorMessage.innerText = 'Please set all the 3 goals!'
                errorMessage.style.display = 'block';
        }
    })
})

inputFields.forEach((input) => {

    if (allGoals[input.id]) {
        input.value = allGoals[input.id].data

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus', () => {
        errorMessage.style.display = 'none';
    })

    input.addEventListener('input', (e) => {

        if (allGoals[e.target.id] && allGoals[e.target.id].completed) {
            e.target.value = allGoals[e.target.id].data
            return
        }

        allGoals[e.target.id] = {
            data : e.target.value,
            completed : false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})