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

        // Reset position if deselected
        if (!this.classList.contains('active')) {
            this.style.position = '';
        }
    });
});

// Verificare răspunsuri pentru quiz
document.getElementById('submit-quiz').addEventListener('click', function () {
    const correctAnswers = {
        q1: 'a', // Reședință pentru nobili și apărare
        q2: 'b', // Piatră
        q3: 'b', // Donjon
        q4: 'b'  // Element de apărare
    };

    let quizScore = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Iterate through each question and check the answers
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswer) {
            quizScore++;
        }
    }

    // Afișează rezultatele
    const resultsDiv = document.getElementById('results');
    const blanksScore = parseInt(resultsDiv.dataset.blanksScore || 0); // Obține scorul lacunelor
    const totalScore = quizScore + blanksScore;

    resultsDiv.innerHTML = `<p>Ai răspuns corect la ${quizScore} din ${totalQuestions} întrebări din quiz.</p>`;
    resultsDiv.innerHTML += `<p>Ai răspuns corect la ${blanksScore} lacune.</p>`;
    resultsDiv.innerHTML += `<p>Scor total: ${totalScore} puncte.</p>`;
});

// Funcție pentru a randomiza un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Variabilă globală pentru a urmări dropdown-ul activ
let activeDropdown = null;

// Funcționalitate pentru lacune
document.querySelectorAll('.blank').forEach(blank => {
    blank.addEventListener('click', function () {
        // Dacă lacuna are deja text completat, nu deschidem dropdown-ul
        if (blank.textContent.trim() !== '________') {
            return;
        }

        // Dacă există un dropdown activ, îl eliminăm
        if (activeDropdown && activeDropdown !== this) {
            const existingDropdown = activeDropdown.querySelector('.blank-options');
            if (existingDropdown) {
                existingDropdown.remove();
            }
        }

        // Dacă dropdown-ul curent este deja deschis, îl închidem
        const existingDropdown = this.querySelector('.blank-options');
        if (existingDropdown) {
            existingDropdown.remove();
            activeDropdown = null; // Resetează dropdown-ul activ
            return;
        }

        // Creăm dropdown-ul cu opțiuni
        let options = ['creneluri', 'turnuri de apărare', 'sălii mari', 'Hunedoara', 'gotică', 'Leonardo da Vinci'];
        options = shuffleArray(options); // Randomizează opțiunile

        const dropdown = document.createElement('div');
        dropdown.classList.add('blank-options');

        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => {
                blank.textContent = option; // Setează răspunsul selectat
                dropdown.remove(); // Elimină dropdown-ul după selecție
                activeDropdown = null; // Resetează dropdown-ul activ
            });
            dropdown.appendChild(optionDiv);
        });

        this.appendChild(dropdown);
        dropdown.style.display = 'block';
        activeDropdown = this; // Setează dropdown-ul curent ca activ
    });
});

// Verificare răspunsuri pentru lacune
document.getElementById('submit-blanks').addEventListener('click', function () {
    const blanks = document.querySelectorAll('.blank');
    let blanksScore = 0;

    // Obține răspunsurile utilizatorului pentru primele două lacune
    const firstAnswer = blanks[0].textContent.trim();
    const secondAnswer = blanks[1].textContent.trim();

    // Permite interschimbabilitatea pentru primele două lacune, dar verifică dacă sunt identice
    if (firstAnswer === secondAnswer) {
        // Dacă răspunsurile sunt identice, niciuna nu primește puncte
        blanks[0].style.color = 'red';
        blanks[1].style.color = 'red';
    } else {
        const validAnswers = ['creneluri', 'turnuri de apărare'];
        if (validAnswers.includes(firstAnswer)) {
            blanksScore++;
            blanks[0].style.color = 'green'; // Evidențiază răspunsul corect
        } else {
            blanks[0].style.color = 'red'; // Evidențiază răspunsul greșit
        }

        if (validAnswers.includes(secondAnswer)) {
            blanksScore++;
            blanks[1].style.color = 'green'; // Evidențiază răspunsul corect
        } else {
            blanks[1].style.color = 'red'; // Evidențiază răspunsul greșit
        }
    }

    // Verificare normală pentru celelalte lacune
    blanks.forEach((blank, index) => {
        if (index > 1) {
            const userAnswer = blank.textContent.trim();
            const correctAnswer = blank.getAttribute('data-correct');
            if (userAnswer === correctAnswer) {
                blanksScore++;
                blank.style.color = 'green'; // Evidențiază răspunsul corect
            } else {
                blank.style.color = 'red'; // Evidențiază răspunsul greșit
            }
        }
    });

    const totalBlanks = blanks.length;
    const resultsDiv = document.getElementById('results');
    resultsDiv.dataset.blanksScore = blanksScore; // Salvează scorul pentru total
    resultsDiv.innerHTML = `<p>Ai răspuns corect la ${blanksScore} din ${totalBlanks} lacune.</p>`;
});

// Resetare quiz și lacune
document.getElementById('reset-quiz').addEventListener('click', function () {
    // Resetează lacunele
    document.querySelectorAll('.blank').forEach(blank => {
        blank.textContent = '________';
        blank.style.color = ''; // Elimină stilurile de culoare
    });

    // Resetează quiz-ul
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });

    // Resetează rezultatele
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.dataset.blanksScore = 0;
});

// Funcționalitate pentru imaginile din tooltip
document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', function (event) {
        event.preventDefault(); // Previne comportamentul implicit al link-ului

        // Găsește imaginea din tooltip
        const image = this.querySelector('.tooltip-content img');

        // Creează un container pentru afișarea imaginii în dreapta
        let imageContainer = document.querySelector('.tooltip-image-container');
        if (!imageContainer) {
            imageContainer = document.createElement('div');
            imageContainer.classList.add('tooltip-image-container');
            document.body.appendChild(imageContainer);
        }

        // Afișează imaginea în container
        imageContainer.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" class="tooltip-image">
        `;

        // Adaugă eveniment pentru deschiderea imaginii într-un tab nou
        const displayedImage = imageContainer.querySelector('.tooltip-image');
        displayedImage.addEventListener('click', () => {
            window.open(image.src, '_blank');
        });
    });
});
