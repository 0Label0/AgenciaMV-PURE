class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.link_index = "./index.html";
    this.link_services = "./templates/services.html";
    this.link_contact = "./templates/contact.html";
  }

  static get observedAttributes() {
    return ["link_index", "link_services", "link_contact"];
  }
  attributeChangedCallback(routes, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[routes] = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .footer {
          background: #111;
          color: #ddd;
          padding: 3rem 1.5rem 1rem;
          font-family: "Inter", sans-serif;
        }

        /* Container */
        .footer .footer__container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Logo */
        .footer .footer__logo {
          font-size: 1.6rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        /* About */
        .footer .footer__about p {
          line-height: 1.5;
          font-size: 0.95rem;
        }

        /* Headings */
        .footer h3 {
          color: #fff;
          font-size: 1rem;
          margin-bottom: 0.8rem;
        }

        /* Lists */
        .footer ul {
          list-style: none;
          padding: 0;
        }

        .footer ul li {
          margin-bottom: 0.4rem;
        }

        .footer ul li a {
          color: #bbb;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer ul li a:hover {
          color: #fff;
        }

        /* Contact */
        .footer .footer__contact p {
          margin: 0.3rem 0;
          font-size: 0.9rem;
        }

        /* Social */
        .footer .footer__contact .footer__social {
          margin-top: 0.5rem;
        }

        .footer .footer__contact .footer__social a {
          color: #bbb;
          margin-right: 0.6rem;
          font-size: 1.2rem;
          transition: color 0.2s;
        }

        /* Social icons hover */
        .footer .footer__contact .footer__social a .fa-github:hover {
          color: #f5f1f1;
        }

        .footer .footer__contact .footer__social a .fa-x-twitter:hover {
          color: #ffeff3;
        }

        .footer .footer__contact .footer__social a .fa-instagram:hover {
          background: linear-gradient(
            45deg,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf,
            #4f5bd5
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Bottom */
        .footer .footer__bottom {
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid #222;
          padding-top: 1rem;
          font-size: 0.85rem;
          color: #777;
        }

      </style>
      <footer class="footer">
        <div class="footer__container">
          <div class="footer__about">
            <h2 class="footer__logo">AgenciaMV</h2>
            <p>Desarrollamos soluciones prácticas y modernas para tu negocio.</p>
          </div>

          <div class="footer__links">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="${this.link_index}">Inicio</a></li>
              <li><a href="${this.link_services}">Servicios</a></li>
              <li><a href="${this.link_contact}">Contacto</a></li>
            </ul>
          </div>
          <!-- 
          <div class="footer__legal">
            <h3>Legal</h3>
            <ul>
              <li><a href="/aviso-legal">Aviso legal</a></li>
              <li><a href="/privacidad">Política de privacidad</a></li>
              <li><a href="/cookies">Política de cookies</a></li>
            </ul>
          </div> -->

          <div class="footer__contact">
            <h3>Contacto</h3>
            <p>info@misitio.com</p>
            <p>+34 600 123 456</p>
            <div class="footer__social">
              <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
              <a href="#"><i class="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p>© 2025 AgenciaMV. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
