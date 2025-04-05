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

    const images = document.querySelectorAll('aside img');
    let activeImage = null;

    images.forEach(img => {
        img.addEventListener('click', function(event) {
            event.preventDefault();
            
            if (activeImage && activeImage !== this) {
                activeImage.classList.remove('hovered');
            }
            
            this.classList.toggle('hovered');
            activeImage = this.classList.contains('hovered') ? this : null;
    });
});
