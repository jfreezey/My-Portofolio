// Mengambil elemen yang diperlukan
const navbar = document.querySelector("header > div");
const menuLinks = document.querySelectorAll(".navbar a, .btn-contact");
const backToTop = document.getElementById("back-to-top");

const sections = [...menuLinks].map((link) =>
    document.querySelector(link.getAttribute("href"))
).filter(Boolean);

function updateOnScroll() {
    // Menambahkan bayangan navbar saat scroll
    navbar.classList.toggle("scrolled", window.scrollY > 20);

    // Menampilkan tombol setelah scroll sejauh 400px
    backToTop.hidden = window.scrollY < 400;

    // Menentukan bagian halaman yang sedang dibaca
    let currentSection = sections[0];
    const offset = navbar.getBoundingClientRect().bottom + 24;

    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) {
            currentSection = section;
        }
    });

    // Mengaktifkan Contact ketika mencapai akhir halaman
    if (
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - 2
    ) {
        currentSection = sections[sections.length - 1];
    }

    // Memberi tanda aktif pada menu yang sesuai
    menuLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection.id}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Kembali ke atas saat tombol diklik
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    menuLinks[0].focus({ preventScroll: true });
});

// Memperbarui tampilan saat scroll, resize, dan halaman selesai dimuat
window.addEventListener("scroll", updateOnScroll, { passive: true });
window.addEventListener("resize", updateOnScroll);
window.addEventListener("load", updateOnScroll);

updateOnScroll();