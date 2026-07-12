document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        // Semua jawaban tertutup saat halaman pertama dibuka
        answer.style.maxHeight = "0px";
        answer.style.overflow = "hidden";

        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            // Tutup semua FAQ
            faqItems.forEach((otherItem) => {
                const otherAnswer = otherItem.querySelector(".faq-answer");

                otherItem.classList.remove("active");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = "0px";
                }
            });

            // Buka FAQ yang diklik
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
