class AppCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initSplide();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/ `
            <style>
                :host {
                    display: block;
                    box-sizing: border-box;
                }

                .services-container {
                    padding: 36px 20px;
                    width: 100%;
                    background: linear-gradient(90deg, #0b3e27, #176542);
                    min-height: 100vh;
                    box-sizing: border-box;
                }

                .services-container h2 {
                    font-size: 9rem;
                    color: #72e647;
                    margin: 50px 0;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .services-container h2 {
                        font-size: 3rem;
                        margin: 30px 0;
                    }
                }

                .services {
                    flex-direction: column;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 700px;
                }

                .card-container {
                    width: 100%;
                    max-width: 1200px;
                }

                .splide__list {
                    display: flex;
                    cursor: grab;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }

                .card {
                    margin: 0 10px 50px;
                    min-width: 460px;
                    flex: 1;
                    width: auto;
                    height: 555px;
                    transition: all 0.5s ease;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    padding: 5px 5px 20px;
                    box-sizing: border-box;
                    position: relative;
                    background-color: #fafafb;
                    color: #000;
                }

                @media (max-width: 768px) {
                    .card {
                        min-width: 300px;
                    }
                }

                .card img {
                    width: 95%;
                    height: 60%;
                    object-fit: cover;
                    position: absolute;
                    top: 34%;
                    left: 50%;
                    border-radius: 5px;
                    transform: translate(-50%, -50%);
                }

                .card div {
                    margin-left: 20px;
                    z-index: 10;
                }

                .card h3 {
                    font-size: 2.2rem;
                    font-weight: 900;
                    margin: 0 0 10px 0;
                }

                @media (max-width: 768px) {
                    .card h3 {
                        font-size: 1.5rem;
                    }
                }

                .btn-card {
                    padding-inline: 5px;
                    list-style: none;
                    text-decoration: none;
                    border: none;
                    width: 90%;
                    height: 40px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    font-weight: 700;
                    align-items: center;
                    font-size: 1.2rem;
                    text-align: center;
                }

                .btn-card span.arrow {
                    transition: all 0.2s ease-in;
                    margin-right: 5px;
                }

                .btn-card:hover span.arrow {
                    transform: translateX(3px);
                }

                .arrow-card {
                    z-index: 20;
                    display: flex;
                    width: 100%;
                    margin-top: 5%;
                    justify-content: flex-end;
                    position: relative;
                }

                .arrow-card i {
                    margin-right: 10%;
                    border: 2px dashed #000;
                    border-radius: 50%;
                    font-size: 1.7rem;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: rotate(-45deg);
                    transition: all 0.5s;
                }

                .arrow-card i:hover {
                    transform: rotate(0);
                    border: 2px solid #000;
                    cursor: pointer;
                }

                .card:hover {
                    flex: 1.3;
                }

                /* Card types */
                .type-1 {
                    background-color: #306f52;
                    color: #fff;
                }
                .type-1 .btn-card {
                    background-color: #72e647;
                    color: #000;
                }
                .type-1 p {
                    color: #ffffffa5;
                }

                .type-2 {
                    background-color: #72e647;
                    color: #000;
                }
                .type-2 .btn-card {
                    background-color: #fff;
                    color: #000;
                }
                .type-2 p {
                    color: #00000094;
                }

                .type-3 {
                    background-color: #fafafb;
                    color: #000;
                }
                .type-3 .btn-card {
                    background-color: #004e09;
                    color: #72e647;
                }
                .type-3 p {
                    color: #00000094;
                }

                .splide__arrows {
                    display: none !important;
                }
            </style>

            <section class="services-container">
                <h2 class="title">SERVICIOS</h2>

                <div class="services splide" id="services">
                    <div class="card-container splide__track no-select">
                        <div class="splide__list">
                            <article class="card type-1 splide__slide" id="estrategia-comercial">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>ESTRATEGIA <br> COMERCIAL</h3>
                                    <p>ESTUDIAMOS TU CICLO DE VENTAS</p>
                                    <a href="/page/services/#estrategia-comercial" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                            <article class="card type-2 splide__slide" id="branding">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>BRANDING</h3>
                                    <p>CONSTRUIMOS TU MARCA</p>
                                    <a href="/page/services/#branding" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                            <article class="card type-3 splide__slide" id="redes-sociales">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>REDES SOCIALES</h3>
                                    <p>DA A CONOCER TU MARCA</p>
                                    <a href="/page/services/#redes-sociales" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                            <article class="card type-1 splide__slide" id="pagina-web">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>PÁGINA WEB</h3>
                                    <p>LA CARTA DE PRESENTACIÓN</p>
                                    <a href="/page/services/#pagina-web" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                            <article class="card type-3 splide__slide" id="posicionamiento">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>POSICIONAMIENTO</h3>
                                    <p>NO SIRVE CON ESTAR, HAY QUE DESTACAR</p>
                                    <a href="/page/services/#posicionamiento" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                            <article class="card type-2 splide__slide" id="desarrollo-negocio">
                                <div class="arrow-card"><i class="fa-solid fa-arrow-right"></i></div>
                                <div>
                                    <h3>DESARROLLO DEL NEGOCIO</h3>
                                    <p>¿QUÉ QUIERES HACER CON TU NEGOCIO?</p>
                                    <a href="/page/services/#desarrollo-negocio" class="btn-card">
                                        <span>SABER MÁS</span> <span class="arrow"> &gt; </span>
                                    </a>
                                </div>
                            </article>

                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    initSplide() {
        const el = this.shadowRoot.getElementById('services');
        if (!el || el.classList.contains('is-initialized')) return;

        new Splide(el, {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: 80,
            pagination: false,
            drag: true,
            pauseOnHover: true,
            flickVelocity: 0.8,
            flickPower: 100,
            breakpoints: {
                768: {
                    focus: 'center',
                },
            },
        }).mount();

        el.classList.add('is-initialized');
    }
}

customElements.define("app-carousel", AppCarousel);
