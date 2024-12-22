// const checkboxlist = document.querySelectorAll('.custome-checkbox')
// const inputfields = document.querySelectorAll('.goal-input')
// const error = document.querySelector('.error')
// const progressBar = document.querySelector('.progress-bar')
// const progressValue = document.querySelector('.progress-value')

// const input = document.querySelector('input')
// const allgoals = JSON.parse(localStorage.getItem('allgoals')) || {}


// checkboxlist.forEach((checkbox) => {
//   checkbox.addEventListener('click', (e) => {
//     const allgoalsAdded = [...inputfields].every(function (input) {
//       return input.value

//     })

//     if (allgoalsAdded) {
//       checkbox.parentElement.classList.toggle('completed')
//       progressValue.style.width = '33%'

//     } else {
//       error.style.display = 'block'
//     }

//   })

//   // input.addEventListener('input', (e) => {
//   //   allgoals[input.id] = {
//   //     name: input.value,
//   //     completed: false,
//   //   }
//   //   localStorage.setItem('allgoals', JSON.stringify(allgoals))
//   // })

//   inputfields.forEach((input) => {
//     input.addEventListener('input', (e) => {
//         allgoals[input.id] = {
//             name: input.value,
//             completed: false,
//         };
//         localStorage.setItem('allgoals', JSON.stringify(allgoals));
//     });
// });

// })

// // inputfields.forEach((input) => {
// //   input.value = allgoals[input.id].name
// // })
// inputfields.forEach((input) => {
//   input.value = allgoals[input.id]?.name || '';
// });


// // allinput.addEventListener('input', (e) => {
// //   localStorage.setItem('input1', e.target.value)
// //   console.log(e.target.id)

// // })
// const updateProgress = () => {
//   const completedGoals = [...checkboxlist].filter((checkbox) =>
//       checkbox.parentElement.classList.contains('completed')
//   ).length;
//   const progressPercentage = (completedGoals / checkboxlist.length) * 100;
//   progressValue.style.width = `${progressPercentage}%`;
//   progressValue.textContent = `${completedGoals}/${checkboxlist.length} Completed`;
// };


const checkboxlist = document.querySelectorAll('.custome-checkbox');
const inputfields = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error');
const progressValue = document.querySelector('.progress-value');

let allgoals = JSON.parse(localStorage.getItem('allgoals')) || {};

// Function to update progress bar
const updateProgress = () => {
    const completedGoals = [...checkboxlist].filter((checkbox) =>
        checkbox.parentElement.classList.contains('completed')
    ).length;
    const progressPercentage = (completedGoals / checkboxlist.length) * 100;

    // Smoothly update progress bar
    progressValue.style.width = `${progressPercentage}%`;
    progressValue.innerHTML = `<span>${completedGoals}/${checkboxlist.length} Completed</span>`;

    // Show/hide error with smooth animation
    if ([...inputfields].every((input) => input.value.trim())) {
        error.classList.remove('show');
    } else {
        error.classList.add('show');
    }
};

// Add click event to each checkbox
checkboxlist.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const parent = checkbox.parentElement;

        // Check if all goals have input values
        const allGoalsSet = [...inputfields].every((input) => input.value.trim());

        if (allGoalsSet) {
            parent.classList.toggle('completed');
            updateProgress();
        } else {
            error.classList.add('show');
        }
    });
});

// Add input event to each input field
inputfields.forEach((input) => {
    input.addEventListener('input', () => {
        allgoals[input.id] = {
            name: input.value.trim(),
            completed: input.parentElement.classList.contains('completed'),
        };
        localStorage.setItem('allgoals', JSON.stringify(allgoals));
        updateProgress();
    });

    // Load stored goals from localStorage
    input.value = allgoals[input.id]?.name || '';
    if (allgoals[input.id]?.completed) {
        input.parentElement.classList.add('completed');
    }
});

// Initial progress update
updateProgress();


