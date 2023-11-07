document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
 
 document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    var exercise = document.getElementById('exercise').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var duration = document.getElementById('duration').value;

    // Create a string with workout details
    var workoutDetails = `Exercise: ${exercise}, Sets: ${sets}, Reps: ${reps}, Duration: ${duration} minutes`;

    // Display workout details
    var workoutDisplay = document.getElementById('workout-display');
    workoutDisplay.innerHTML += '<p>' + workoutDetails + '</p>';

    // Reset form
    document.getElementById('workout-form').reset();
});

// Add event listeners for edit and delete buttons
document.getElementById('edit-workout').addEventListener('click', editWorkout);
document.getElementById('delete-workout').addEventListener('click', deleteWorkout);

// Function to edit workout
function editWorkout() {
    // Implement edit functionality here
    alert('Edit Workout Functionality - To be implemented');
}

// Function to delete workout
function deleteWorkout() {
    // Implement delete functionality here
    alert('Delete Workout Functionality - To be implemented');
}

// Placeholder data for workout history (to be replaced with actual data)
var workoutHistory = [
    { exercise: 'Push-ups', sets: 3, reps: 12, duration: 30 },
    { exercise: 'Squats', sets: 3, reps: 10, duration: 25 },
    // Add more workout data as needed
];

// Function to display workout history
function displayWorkoutHistory() {
    var workoutHistorySection = document.getElementById('workout-history');
    workoutHistorySection.innerHTML = '';

    workoutHistory.forEach(function(workout) {
        var workoutDetails = `Exercise: ${workout.exercise}, Sets: ${workout.sets}, Reps: ${workout.reps}, Duration: ${workout.duration} minutes`;
        workoutHistorySection.innerHTML += '<p>' + workoutDetails + '</p>';
    });
}

// Function to calculate total workout time (in minutes)
function calculateTotalWorkoutTime() {
    var totalDuration = workoutHistory.reduce(function(sum, workout) {
        return sum + workout.duration;
    }, 0);
    return totalDuration;
}

// Function to calculate calories burned (placeholder calculation)
function calculateCaloriesBurned() {
    var totalCalories = workoutHistory.length * 100; // Placeholder calculation
    return totalCalories;
}

// Function to display workout statistics
function displayWorkoutStatistics() {
    var totalWorkoutTime = calculateTotalWorkoutTime();
    var totalCaloriesBurned = calculateCaloriesBurned();

    var workoutStatisticsSection = document.getElementById('workout-statistics');
    workoutStatisticsSection.innerHTML = `
        <p>Total Workout Time: ${totalWorkoutTime} minutes</p>
        <p>Total Calories Burned: ${totalCaloriesBurned} calories</p>
    `;
}

// Call the functions to display workout history and statistics
displayWorkoutHistory();
displayWorkoutStatistics();

// CHART
// Create the chart using the generated data
var ctx = document.getElementById('workout-chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3'], // Example labels
        datasets: [{
            label: 'Workout Duration',
            data: [30, 45, 60], // Example data points
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// submit goals
document.getElementById('submit-goals').addEventListener('click', function() {
    var duration = document.getElementById('duration').value;
    var calories = document.getElementById('calories').value;
    var workoutType = document.getElementById('workout-type').value;

    if (duration && calories && workoutType) {
        var goalsData = {
            duration: duration,
            calories: calories,
            workoutType: workoutType
        };

        var goalsDataString = JSON.stringify(goalsData);
        localStorage.setItem('fitnessGoals', goalsDataString);

        alert('Fitness goals have been updated!');
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('delete-goals').addEventListener('click', function() {
    localStorage.removeItem('fitnessGoals');

});
 
// Retrieve goals data from local storage
var goalsDataString = localStorage.getItem('fitnessGoals');

if (goalsDataString) {
    // Convert the JSON string back to an object
    var goalsData = JSON.parse(goalsDataString);

    // Display goals in the HTML element
    var goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = `
        <li>Duration: ${goalsData.duration} minutes</li>
        <li>Calories Burned: ${goalsData.calories} calories</li>
        <li>Workout Type: ${goalsData.workoutType}</li>
    `;
}

//Update goals
document.getElementById('log-workout').addEventListener('click', function() {
    // Code to capture user input for logging workouts goes here
    var exercise = document.getElementById('exercise').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var duration = document.getElementById('duration').value;

    if (exercise && sets && reps && duration) {
        // Call a function to handle workout logging and progress update
        logWorkout(exercise, sets, reps, duration);
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('edit-goals').addEventListener('click', function() {
    var goalsDataString = localStorage.getItem('fitnessGoals');

    if (goalsDataString) {
        var goalsData = JSON.parse(goalsDataString);
        document.getElementById('duration').value = goalsData.duration;
        document.getElementById('calories').value = goalsData.calories;
        document.getElementById('workout-type').value = goalsData.workoutType;
    }

});

// Retrieve workout history data from local storage
var workoutHistoryString = localStorage.getItem('workoutHistory');

if (workoutHistoryString) {
    var workoutHistory = JSON.parse(workoutHistoryString);
}

if (workoutHistory && workoutHistory.length > 0) {
    var historyList = document.getElementById('history-list');
    workoutHistory.forEach(function(workout) {
        var listItem = document.createElement('li');
        listItem.textContent = `Exercise: ${workout.exercise}, Sets: ${workout.sets}, Reps: ${workout.reps}, Duration: ${workout.duration} minutes`;
        historyList.appendChild(listItem);
    });
} else {
    var historyList = document.getElementById('history-list');
    historyList.innerHTML = '<p>No workout history available.</p>';
}

// Retrieve data for the chart (replace this with your actual data)
var chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Workout Progress',
        data: [10, 15, 20, 18, 25, 30, 28], // Replace with your actual data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Get the canvas element
var chartCanvas = document.getElementById('progress-chart').getContext('2d');

// Create the chart
var myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 40 // Adjust based on your data range
            }
        }
    }
});


// Get the canvas element
var chartCanvas = document.getElementById('progress-chart').getContext('2d');

// Check if a chart instance already exists
if (window.myChart instanceof Chart) {
    // Destroy the existing chart
    window.myChart.destroy();
}

// Create the chart
var myChart = new Chart(chartCanvas, {
    type: 'bar',
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 40 // Adjust based on data range
            }
        }
    }
});
