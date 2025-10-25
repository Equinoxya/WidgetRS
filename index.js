async function Info() {
    const reponse = await fetch ("info.json");
    const socials = await reponse.json();

 const container = document.getElementById('widgets-container');
        let currentWidget = null;

        function showWidgetsSequence() {
            let currentIndex = 0;

            function showNext() {
                // Supprimer le widget précédent
                if (currentWidget) currentWidget.remove();

                // Vérifier s'il reste un widget à afficher
                if (currentIndex >= socials.length) {
                    // Fin de la séquence : aucun widget à afficher
                    currentWidget = null;
                    return;
                }

                // Créer le widget actuel
                const social = socials[currentIndex];
                currentWidget = document.createElement('div');
                currentWidget.classList.add('widget');
                currentWidget.style.opacity = 0;
                currentWidget.innerHTML = `
                    <img src="${social.img}" alt="logo ${social.reseau}">
                    <div class="${social.class}">${social.name}</div>
                `;
                container.appendChild(currentWidget);

                // Animation fade-in
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    opacity += 0.05;
                    currentWidget.style.opacity = opacity;
                    if (opacity >= 1) clearInterval(fadeIn);
                }, 50);

                currentIndex++;
                setTimeout(showNext, 3000); // Passer au widget suivant après 3s
            }

            showNext();
        }

        // Lancer la séquence
        showWidgetsSequence();
    
}

Info();