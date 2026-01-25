class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.lastScrollTop = 0;

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
    this.initEvents();
    this.registerCSSProperty();
  }

  // Registra la propiedad CSS para la animación del gradiente
  registerCSSProperty() {
    if (CSS.registerProperty) {
      try {
        CSS.registerProperty({
          name: "--grad-pos",
          syntax: "<percentage>",
          inherits: false,
          initialValue: "0%",
        });
      } catch (e) {
        /* Ya registrada */
      }
    }
  }

  initEvents() {
    const burgerMenu = this.shadowRoot.querySelector(".burger-menu");
    const linkMenu = this.shadowRoot.querySelector(".link-menu");
    const generalMenu = this.shadowRoot.querySelector(".general-menu");

    // Lógica Burger Menu
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      linkMenu.classList.toggle("active");

      // Bloquear scroll en el body
      document.body.style.overflow = linkMenu.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    // Lógica Scroll (Slide up/down)
    window.addEventListener("scroll", () => {
      const st = window.scrollY || document.documentElement.scrollTop;

      if (st > this.lastScrollTop && st > 100) {
        generalMenu.classList.add("goUp");
        generalMenu.classList.remove("down");
      } else {
        generalMenu.classList.add("down");
        generalMenu.classList.remove("goUp");
      }
      this.lastScrollTop = st;
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          --color-white: #fff;
          --media-query-movile: 768px;
        }

        .general-menu {
          top: 0;
          left: 0;
          color: var(--color-white);
          padding: 30px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          width: 100%;
          box-sizing: border-box;
          background: var(--general-background);
          transition: transform 0.5s ease-out;
          z-index: 200;
          font-size: 1.4rem;
        }

        .general-menu.goUp { transform: translateY(-100%); }
        .general-menu.down { transform: translateY(0); }

        .link-menu {
          display: flex;
          gap: 15px;
          align-items: center;
          transition: all 0.6s ease-in;
        }

        .link-menu .btn-contact {
          --grad-pos: 0%;
          padding: 12px 20px;
          border-radius: 5px;
          text-decoration: none;
          color: #e7e7e7;
          margin-left: 10px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(90deg, #31647c var(--grad-pos), #1b879f var(--grad-pos), #166190);
          transition: --grad-pos 1s ease, all 0.6s ease;
        }

        .link-menu .btn-contact:hover { --grad-pos: 100%; }

        .link-menu a { color: inherit; text-decoration: none; }
        .link-menu a:hover { text-decoration: underline; text-underline-offset: 5px; }

        /* Mobile menu */
        @media (max-width: 768px) {
          .link-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100vh;
            flex-direction: column;
            background: var(--general-background);
            padding: 50px 20px;
            transform: translateY(-150%);
            gap: 40px;
          }

          .link-menu.active { transform: translateY(0); }

          .burger-menu {
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
          }

          .burger {
            width: 30px;
            height: 3px;
            background: white;
            transition: 0.3s;
          }

          .burger-menu.active #burger-up { transform: translateY(11px) rotate(45deg); }
          .burger-menu.active #burger-down { transform: translateY(0) rotate(-45deg); }
        }

        @media (min-width: 769px) {
          .burger-menu { display: none; }
        }
      </style>

      <header class="general-menu">
        <h2 style="margin:0">AGENCIA MV</h2>
        <nav class="link-menu">
          <a href="${this.link_index}">Bienvenida</a>
          <a href="${this.link_services}">Servicios</a>
          <a href="${this.link_contact}">Contáctanos</a>
          <a class="btn-contact">999-33-44-22</a>
        </nav>
        <div class="burger-menu">
          <div id="burger-up" class="burger"></div>
          <div id="burger-down" class="burger"></div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
