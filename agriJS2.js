let agri = [
  { id: 1, nom: "Blé", semis: "Septembre", recolte: 150 },
  { id: 2, nom: "Maïs", semis: "Avril", recolte: 200 },
  { id: 3, nom: "Riz", semis: "Mai", recolte: 180 },
  { id: 4, nom: "Orge", semis: "Octobre", recolte: 140 },
  { id: 5, nom: "Avoine", semis: "Mars", recolte: 120 },
  { id: 6, nom: "Pommes de terre", semis: "Mars", recolte: 250 },
  { id: 7, nom: "Tomates", semis: "Avril", recolte: 90 },
  { id: 8, nom: "Carottes", semis: "Mai", recolte: 100 },
  { id: 9, nom: "Betteraves sucrières", semis: "Mars", recolte: 150 },
  { id: 10, nom: "Coton", semis: "Avril", recolte: 300 },
  { id: 11, nom: "Soja", semis: "Juin", recolte: 220 },
  { id: 12, nom: "Canne à sucre", semis: "Novembre", recolte: 350 },
  { id: 13, nom: "Tournesol", semis: "Mai", recolte: 180 },
  { id: 14, nom: "Vigne", semis: "Mars", recolte: 250 },
  { id: 15, nom: "Légumes verts", semis: "Avril", recolte: 90 },
];

let highest = [];
let highestR = [];
let lowestR = [];

const inputContainer = document.querySelector("#inputContainer");
const cardsContainer = document.querySelector("#cardsContainer");
const chartsContainer = document.querySelector("#chartsContainer");
const form = document.querySelector("form");
const btnReset = document.querySelector("#btnReset");

let btnItem = document.querySelectorAll(".btnItem");

btnReset.addEventListener("click", () => {
  itemInput.value = "Banane";
  semiInput.value = "Mars";
  recolteInput.value = 9720;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newAgriItem = {
    id: agri.length + 1,
    nom: itemInput.value,
    semis: semiInput.value,
    recolte: parseInt(recolteInput.value),
  };
  //   console.warn(newAgriItem);
  agri.unshift(newAgriItem);
  cardsContainer.innerHTML = "";

  console.log(agri);
  displayCards();
});

const createNodeElement = (element) => {
  const node = document.createElement(element.tag);
  node.textContent = element.text;

  element.attributes.forEach((attr) => {
    node.setAttribute(attr.name, attr.value);
  });

  element.children.forEach((child) => {
    node.appendChild(createNodeElement(child));
  });

  return node;
};

const getList = () => {
  if (window.localStorage.listAgri) {
    return window.localStorage.listAgri;
  } else {
    agri.map((el) => {
      console.log(el);
      return (window.localStorage.listAgri += el);
    });

    // for (let el of agri) {
    //   window.localStorage.listAgri += el;
    // }
    return window.localStorage.listAgri;
  }
};

const displayCards = () => {
  let addRecoltes = 0;
  let itemId = agri.length + 1;

  //   console.log(getList());

  for (let item of agri) {
    const card = {
      tag: "div",
      text: "",
      attributes: [
        { name: "class", value: "cardItem" },
        { name: "id", value: item.id },
      ],
      children: [
        {
          tag: "h3",
          text: item.nom,
          attributes: [{ name: "class", value: "nomItem" }],
          children: [],
        },
        {
          tag: "p",
          text: "Semis : " + item.semis,
          attributes: [{ name: "class", value: "semiItem" }],
          children: [],
        },
        {
          tag: "p",
          text: "Recolte : " + item.recolte + " tonnes",
          attributes: [{ name: "class", value: "recolteItem" }],
          children: [],
        },
        {
          tag: "div",
          text: "Supprimer",
          attributes: [
            { name: "class", value: "btnItem" },
            { name: "id", value: item.id },
          ],
          children: [],
        },
      ],
    };

    cardsContainer.appendChild(createNodeElement(card));
    addRecoltes += item.recolte;
    itemId++;
  }

  setBtnItem();

  chartsContainer.innerHTML = "";
  displayChartsContainer(highestR, addRecoltes);
  displayChartsContainer(lowestR);
};

const setBtnItem = () => {
  btnItem = document.querySelectorAll(".btnItem");
  btnItem.forEach((btn) => {
    btn.addEventListener("click", () => {
      cardsContainer.innerHTML = "";
      agri = [
        ...agri.filter((item) => {
          return item.id !== Number(btn.id);
        }),
      ];

      displayCards();
    });
  });
};

const displayChartsContainer = (rank, totalRecolte) => {
  let reclt = agri.find(
    (r) =>
      r.recolte ===
      (rank === highestR ? Math.max : Math.min)(...agri.map((el) => el.recolte))
  );

  if (totalRecolte)
    chartsContainer.innerHTML += `Total des récoltes : ${totalRecolte} tonnes<br>`;

  chartsContainer.innerHTML += `Plus ${
    rank === highestR ? "haute" : "basse"
  } récolte : ${reclt.nom} avec ${reclt.recolte} tonnes<br>`;
};

displayCards();
