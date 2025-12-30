// =========================
// CONFIGURACIÓN (EDITA AQUÍ)
// =========================

// 1) Pon tu WhatsApp en formato internacional SIN + ni espacios.
// Panamá: 507 + tu número. Ej: "50761234567"
const WHATSAPP_NUMBER = "50760000000";

// 2) Datos de contacto
const CONTACT = {
  phoneText: "+507 6000-0000",
  email: "correo@tudominio.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/"
};

// 3) Productos del catálogo (agrega/edita)
const PRODUCTS = [
  {
    id: "P001",
    name: "Luces LED H4",
    desc: "Alta intensidad, bajo consumo, ideal para faros.",
    tag: "Luces",
    price: "Desde $25",
  },
  {
    id: "P002",
    name: "Barra LED 24”",
    desc: "Perfecta para off-road y mejor visibilidad nocturna.",
    tag: "LED Bar",
    price: "Desde $45",
  },
  {
    id: "P003",
    name: "Luces Ambiente Interior",
    desc: "Kit RGB para cabina con control y efectos.",
    tag: "Interior",
    price: "Desde $18",
  },
  {
    id: "P004",
    name: "Cámara Reversa",
    desc: "Mejora el parqueo y la seguridad al retroceder.",
    tag: "Seguridad",
    price: "Desde $30",
  },
  {
    id: "P005",
    name: "Cargador 12V USB-C",
    desc: "Carga rápida para celular y accesorios en el vehículo.",
    tag: "Energía",
    price: "Desde $10",
  },
  {
    id: "P006",
    name: "Luces de Niebla",
    desc: "Mejor visión en lluvia y neblina, estilo deportivo.",
    tag: "Luces",
    price: "Desde $28",
  },
];

// =========================
// FUNCIONES
// =========================

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function productMessage(p) {
  return `Hola, me interesa este producto: ${p.name} (Código: ${p.id}). ¿Me puedes cotizar y decir disponibilidad?`;
}

function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<div style="color:#b9b9b9; padding:10px;">No se encontraron productos.</div>`;
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.title = "Clic para cotizar por WhatsApp";

    card.innerHTML = `
      <div class="card__img">${p.tag}</div>
      <div class="card__body">
        <div class="card__title"><strong>${p.name}</strong></div>
        <div class="card__desc">${p.desc}</div>
        <div class="card__meta">
          <span class="tag">${p.id}</span>
          <span class="price">${p.price}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      window.open(waLink(productMessage(p)), "_blank");
    });

    grid.appendChild(card);
  });
}

function setupContact() {
  document.getElementById("phoneText").textContent = CONTACT.phoneText;
  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = CONTACT.email;
  emailLink.href = `mailto:${CONTACT.email}`;

  const ig = document.getElementById("igLink");
  const fb = document.getElementById("fbLink");
  const tt = document.getElementById("ttLink");

  ig.href = CONTACT.instagram;
  fb.href = CONTACT.facebook;
  tt.href = CONTACT.tiktok;

  document.getElementById("year").textContent = new Date().getFullYear();
}

function setupWhatsappButtons() {
  const genericMsg = "Hola, quiero cotizar productos del catálogo. ¿Me ayudas por favor?";
  const link = waLink(genericMsg);

  ["btnWhatsappTop", "btnWhatsappHero", "btnWhatsappFooter"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.href = link;
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = PRODUCTS.filter((p) =>
      (p.name + " " + p.desc + " " + p.tag + " " + p.id).toLowerCase().includes(q)
    );
    renderProducts(filtered);
  });
}

// =========================
// INIT
// =========================
setupContact();
setupWhatsappButtons();
setupSearch();
renderProducts(PRODUCTS);
