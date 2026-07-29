const menuBtn = document.getElementById("menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        function toggleAnnouncement(id, button) {

            const content = document.getElementById(id);
            if (content.classList.contains("hidden")) {
                content.classList.remove("hidden");
                button.innerHTML = "Λιγότερα ↑";
            }
            else {
                content.classList.add("hidden");
                button.innerHTML = "Περισσότερα ↓";
            }
        }