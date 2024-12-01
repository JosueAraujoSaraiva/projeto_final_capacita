document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 6; // Quantidade de itens por página
    const items = document.querySelectorAll(".imagens .certificacao");
    const paginationLinks = document.querySelectorAll(".pagination .page-link");

    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Função para exibir a página correta
    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Oculta todos os itens e exibe os da página atual
        items.forEach((item, index) => {
            item.style.display = index >= start && index < end ? "block" : "none";
        });

        // Atualiza o estado ativo na paginação
        paginationLinks.forEach((link) => {
            link.parentElement.classList.remove("active");
            if (parseInt(link.textContent) === page) {
                link.parentElement.classList.add("active");
            }
        });

        // Gerencia os botões Previous e Next
        paginationLinks[0].parentElement.classList.toggle("disabled", currentPage === 1);
        paginationLinks[paginationLinks.length - 1].parentElement.classList.toggle("disabled", currentPage === totalPages);
    }

    // Adiciona eventos de clique aos links de paginação
    paginationLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const text = link.textContent.trim();

            if (text === "Previous" && currentPage > 1) {
                showPage(currentPage - 1);
            } else if (text === "Next" && currentPage < totalPages) {
                showPage(currentPage + 1);
            } else if (!isNaN(text)) {
                showPage(parseInt(text));
            }
        });
    });

    // Exibe a primeira página ao carregar
    showPage(1);
});