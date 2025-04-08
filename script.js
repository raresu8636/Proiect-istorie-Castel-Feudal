const images = document.querySelectorAll('aside img');
let activeImage = null;

images.forEach(img => {
    img.addEventListener('click', function(event) {
        event.preventDefault();

        if (activeImage && activeImage !== this) {
            activeImage.classList.remove('active');
        }

        this.classList.toggle('active');
        activeImage = this.classList.contains('active') ? this : null;
    });
});

const submitQuizButton = document.getElementById('submit-quiz');
if (submitQuizButton) {
    submitQuizButton.addEventListener('click', function () {
        const correctAnswers = {
            q1: 'a', // Reședință pentru nobili și apărare
            q2: 'b', // Piatră
            q3: 'b', // Donjon
            q4: 'b'  // Element de apărare
        };

        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Iterate through each question and check the answers
        for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            if (selectedOption && selectedOption.value === correctAnswer) {
                score++;
            }
        }

        // Display the results
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<p>Ai răspuns corect la ${score} din ${totalQuestions} întrebări.</p>`;
        if (score === totalQuestions) {
            resultsDiv.innerHTML += `<p>Felicitări! Ai obținut punctaj maxim!</p>`;
        } else {
            resultsDiv.innerHTML += `<p>Mai încearcă pentru a obține un scor mai bun!</p>`;
        }
    });
}
