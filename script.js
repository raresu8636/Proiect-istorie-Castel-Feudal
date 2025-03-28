// Funcționalitate pentru quiz
function startQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    
    const questions = [
        { question: "Ce material era cel mai folosit în construcția castelelor medievale?", answer: "piatra" },
        { question: "Care este unul dintre cele mai faimoase castele din România?", answer: "Castelul Bran" },
        { question: "Cine locuia într-un castel feudal?", answer: "nobilii" },
        { question: "Care era scopul principal al unui castel feudal?", answer: "aparare" },
        { question: "Ce element arhitectural era folosit pentru a apăra castelul de invadatori?", answer: "sant cu apa" }
    ];
    
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${q.question}</p><input type='text' id='answer${index}'><button onclick='checkAnswer(${index}, "${q.answer}")'>Verifică</button><span id='result${index}'></span>`;
        quizContainer.appendChild(div);
    });
}

function checkAnswer(index, correctAnswer) {
    const userAnswer = document.getElementById(`answer${index}`).value.trim().toLowerCase();
    const resultSpan = document.getElementById(`result${index}`);
    if (userAnswer === correctAnswer) {
        resultSpan.textContent = "✔️ Corect!";
        resultSpan.style.color = "green";
    } else {
        resultSpan.textContent = "❌ Greșit!";
        resultSpan.style.color = "red";
    }
}

// Funcționalitate pentru grafice
document.addEventListener('DOMContentLoaded', function() {
    // Verifică dacă există elementul feudalCastleChart
    if (document.getElementById('feudalCastleChart')) {
        var ctx = document.getElementById('feudalCastleChart').getContext('2d');
        var feudalCastleChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ziduri', 'Turnuri', 'Locuințe', 'Grajduri', 'Depozite', 'Capelă'],
                datasets: [{
                    label: 'Elemente ale Cetății Feudale',
                    data: [10, 5, 8, 3, 4, 2],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
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
    }

    // Verifică dacă există elementul architectureChart
    if (document.getElementById('architectureChart')) {
        var ctx = document.getElementById('architectureChart').getContext('2d');
        var architectureChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Turnuri', 'Ziduri', 'Săli', 'Camere', 'Capelă'],
                datasets: [{
                    label: 'Elemente Arhitecturale',
                    data: [5, 10, 3, 7, 2],
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
    }

    // Verifică dacă există elementul rolesChart
    if (document.getElementById('rolesChart')) {
        var ctx = document.getElementById('rolesChart').getContext('2d');
        var rolesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Nobili', 'Cavaleri', 'Servitori', 'Meșteșugari'],
                datasets: [{
                    label: 'Rolurile Oamenilor în Castel',
                    data: [10, 20, 50, 20],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Verifică dacă există elementul famousCastlesChart
    if (document.getElementById('famousCastlesChart')) {
        var ctx = document.getElementById('famousCastlesChart').getContext('2d');
        var famousCastlesChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Castelul Bran', 'Castelul Corvinilor', 'Castelul Peleș'],
                datasets: [{
                    label: 'Castele Faimoase',
                    data: [40, 30, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    const quizForm = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('results');

    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const answers = {
                q1: document.querySelector('input[name="q1"]:checked')?.value,
                q2: document.querySelector('input[name="q2"]:checked')?.value,
                q3: document.querySelector('input[name="q3"]:checked')?.value,
                q4: document.querySelector('input[name="q4"]:checked')?.value
            };

            let score = 0;
            if (answers.q1 === 'a') score++;
            if (answers.q2 === 'b') score++;
            if (answers.q3 === 'b') score++;
            if (answers.q4 === 'b') score++;

            resultsDiv.textContent = `Ai obținut ${score} din 4 puncte.`;
        });
    } else {
        console.error('Elementul cu ID-ul "quiz-form" nu a fost găsit.');
    }

    const images = document.querySelectorAll('aside img');

    images.forEach(img => {
        img.addEventListener('click', function(event) {
            event.preventDefault();
            this.classList.toggle('hovered');
        });
    });
});
