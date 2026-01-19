"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// --- INTERNAL ICON COMPONENTS (No external dependency) ---
const IconBase = ({
  children,
  size = 24,
  className = "",
  ...props
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, props), children);
const Menu = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "6",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "18",
  y2: "18"
}));
const X = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6 6 12 12"
}));
const ArrowRight = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 5 7 7-7 7"
}));
const Star = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
  points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
}));
const Zap = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
  points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
}));
const Droplet = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l.6.74C15.87 7.27 19 11.63 19 15.32A7 7 0 0 1 12 22a7 7 0 0 1-7-6.68c0-3.69 3.13-8.05 6.4-12.08z"
}));
const Scale = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M12 3v18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 7h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "m5 7-2 5h4l-2-5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m19 7-2 5h4l-2-5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 17h8"
}));
const ChevronDown = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const ChevronLeft = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m15 18-6-6 6-6"
}));
const ChevronRight = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m9 18 6-6-6-6"
}));
const CircleDot = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1"
}));
const Layers = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
}));
const Disc = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "2"
}));
const Hammer = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17.64 15 22 10.64"
}), /*#__PURE__*/React.createElement("path", {
  d: "m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H14.5c-.85 0-1.65-.33-2.25-.93L11 4.64"
}));
const Rotate3D = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m15.194 13.707 3.814 1.86-1.86 3.814"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 15.57c-1.838 2.481-4.3 4.43-7 4.43-5.523 0-10-4.477-10-10S6.477 0 12 0c2.8 0 5.348 2.021 7.214 4.577"
}));
const MousePointer2 = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "m4 4 7.07 17 2.51-7.39L21 11.07z"
}));
const ZoomIn = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  x2: "16.65",
  y1: "21",
  y2: "16.65"
}), /*#__PURE__*/React.createElement("line", {
  x1: "11",
  x2: "11",
  y1: "8",
  y2: "14"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  x2: "14",
  y1: "11",
  y2: "11"
}));
const Globe = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "2",
  x2: "22",
  y1: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
}));
const MessageSquare = props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
  d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
}));

// --- CUSTOM SKATEBOARD ICON ---
const SkateboardIcon = ({
  size = 24,
  className = "",
  strokeWidth = 2
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.5 10C2.5 10 4 8.5 6 8.5H18C20 8.5 21.5 10 21.5 10"
}), /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "10",
  width: "20",
  height: "3",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6.5 13V15"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17.5 13V15"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "6.5",
  cy: "17",
  r: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17.5",
  cy: "17",
  r: "2"
}));

// --- TRANSLATIONS (EN / FR) ---
const translations = {
  en: {
    nav: {
      product: "Products",
      gear: "Gear",
      blog: "Blog/Event",
      schedule: "Schedule",
      register: "Register"
    },
    meta: {
      title: "RAPTOR [X] - Street Skateboarding"
    },
    hero: {
      badge: "SPECIAL",
      subtext: "[X] SERIES",
      desc: "The perfect fusion of ergonomic design and ultimate sensor technology.",
      boldDesc: "Pitch Black. Powerful. Premium.",
      preOrder: "Pre-Order Now",
      explore: "Explore",
      alt: "Raptor [X] hero background"
    },
    marquee: "STREET // SKATE // POWER // RAPTOR-X //",
    collection: {
      title: "Collection",
      sub: "Upcoming Products 2026"
    },
    gear: {
      title: "Gear",
      sub: "Essential Accessories for the Ultimate Skate Experience",
      cta: "Add to Cart"
    },
    blog: {
      title: "Blog & Events",
      sub: "Latest News, Stories & Community Highlights"
    },
    blueprint: {
      title: "Under The Hood",
      sub: "Carbon-Spine Architecture",
      drag: "Drag to Rotate",
      auto: "Auto Spin",
      stop: "Stop",
      parts: {
        deck: {
          label: "Kinetic Energy Return",
          desc: "The carbon layer stores energy on landing and releases it on pop. Higher ollies, less effort."
        },
        trucks: {
          label: "Moisture Lock",
          desc: "Hydrophobic epoxy resin seals the plies, preventing the UK damp from killing your board."
        },
        wheels: {
          label: "Featherweight Strength",
          desc: "15% lighter than standard 7-ply decks without sacrificing breaking strength."
        }
      }
    },
    marquee2: "NEXT LEVEL PERFORMANCE // PRECISION ENGINEERED //",
    nextLevel: {
      title: "Next Level",
      sub: "Performance . Precision . Power",
      alt: "Raptor [X] banner background"
    },
    timeline: {
      title: "Timeline",
      imageAlt: "RAPTOR [X] billboard at a skate plaza"
    },
    register: {
      title: "Ready to",
      sub: "Dominate?",
      desc: "Limited slots available. Register today to be the first owner.",
      placeholder: "Enter your email address",
      button: "Get Invitation",
      sending: "Submitting...",
      success: "Submitted successfully",
      successEmail: "Submitted. Confirmation email sent.",
      successSaved: "Submitted. Email confirmation not configured.",
      error: "Submission failed. Please try again."
    },
    registerSurvey: {
      title: "Skater Intake",
      desc: "Share your ride and shopping habits so we can tailor drops and gear recommendations.",
      note: "Optional — under 1 minute"
    },
    form: {
      title: "Skater Profile Survey",
      sub: "Quick multiple-choice questions about your ride, shopping habits, and favorite accessories",
      desc: "Your answers help us tailor drops, events, and gear recommendations.",
      preview: "Question Preview",
      open: "Open Google Form",
      close: "Close"
    },
    chat: {
      label: "Raptor AI",
      brand: "Raptor[X]",
      title: "Raptor [X] AI Assistant",
      titleSuffix: "AI Assistant",
      subtitle: "Skate + streetwear intel",
      greeting: "Hey — I'm the RAPTOR [X] concierge. Ask me about decks, street culture, streetwear fits, or event drops.",
      placeholder: "Ask about boards, streetwear, events...",
      send: "Send",
      open: "Chat",
      close: "Close",
      thinking: "Dialing in the setup...",
      error: "Assistant is temporarily unavailable. Please try again soon.",
      statusOffline: "Assistant offline",
      retry: "Retry",
      quickTitle: "Quick picks",
      suggestions: ["Best deck size for street skating?", "Wheel hardness for rough Paris streets?", "Streetwear fit guide for RAPTOR [X] drops", "Event schedule highlights"],
      disclaimer: "Focused on skate, street culture, and RAPTOR [X]."
    },
    langSwitch: {
      toEnglish: "Switch to English",
      toFrench: "Switch to French"
    },
    ui: {
      close: "Close"
    },
    footer: {
      rights: "Product copyright of Raptor Gaming Gear © 2024.",
      design: "Designed for the future.",
      support: "Support",
      instagram: "Instagram",
      twitter: "Twitter",
      facebook: "Facebook"
    },
    schedule: [{
      date: "26 JAN",
      events: [{
        time: "14:00",
        title: "London: Southbank Centre Skate Space"
      }, {
        time: "16:00",
        title: "Live Demo + Try-it-out Zone"
      }, {
        time: "17:30",
        title: "Meet & Greet with Pro Riders"
      }]
    }, {
      date: "27 JAN",
      events: [{
        time: "13:00",
        title: "Bristol: Dean Lane Skatepark"
      }, {
        time: "14:30",
        title: "Best Trick Contest"
      }, {
        time: "16:00",
        title: "Street Art Collab"
      }]
    }, {
      date: "28 JAN",
      events: [{
        time: "16:00",
        title: "Manchester: Projekts MCR Skatepark"
      }, {
        time: "18:00",
        title: "Skate Jam + DJ Set"
      }, {
        time: "19:30",
        title: "RaptorX Giveaway"
      }]
    }]
  },
  fr: {
    nav: {
      product: "Produits",
      gear: "Équipement",
      blog: "Blog/Événements",
      schedule: "Programme",
      register: "S'inscrire"
    },
    meta: {
      title: "RAPTOR [X] - Skate de rue"
    },
    hero: {
      badge: "SPÉCIAL",
      subtext: "[X] SÉRIE",
      desc: "La fusion parfaite d'un design ergonomique et d'une technologie de capteur ultime.",
      boldDesc: "Noir Absolu. Puissant. Premium.",
      preOrder: "Pré-commander",
      explore: "Explorer",
      alt: "Arrière-plan héro RAPTOR [X]"
    },
    marquee: "RUE // SKATE // PUISSANCE // RAPTOR-X //",
    collection: {
      title: "Collection",
      sub: "Produits à venir 2026"
    },
    gear: {
      title: "Équipement",
      sub: "Accessoires Essentiels pour l'Expérience Skate Ultime",
      cta: "Ajouter au panier"
    },
    blog: {
      title: "Blog & Événements",
      sub: "Dernières Nouvelles, Histoires & Temps Forts Communautaires"
    },
    blueprint: {
      title: "Sous le capot",
      sub: "Architecture à épine dorsale en carbone",
      drag: "Glisser pour tourner",
      auto: "Rotation Auto",
      stop: "Arrêt",
      parts: {
        deck: {
          label: "Retour d'énergie cinétique",
          desc: "La couche carbone stocke l'énergie à l'atterrissage et la libère au pop. Ollies plus hauts, moins d'effort."
        },
        trucks: {
          label: "Verrouillage anti-humidité",
          desc: "La résine époxy hydrophobe scelle les plis et empêche l'humidité UK d'abîmer la planche."
        },
        wheels: {
          label: "Résistance ultralégère",
          desc: "15% plus léger qu'un deck 7 plis standard sans sacrifier la résistance."
        }
      }
    },
    marquee2: "PERFORMANCE DE NIVEAU SUPÉRIEUR // INGÉNIERIE DE PRÉCISION //",
    nextLevel: {
      title: "Niveau Supérieur",
      sub: "Performance . Précision . Puissance",
      alt: "Arrière-plan bannière RAPTOR [X]"
    },
    timeline: {
      title: "Chronologie",
      imageAlt: "Billboard RAPTOR [X] sur une place skate"
    },
    register: {
      title: "Prêt à",
      sub: "Dominer?",
      desc: "Places limitées. Inscrivez-vous aujourd'hui pour être le premier propriétaire.",
      placeholder: "Entrez votre adresse email",
      button: "Obtenir l'invitation",
      sending: "Envoi...",
      success: "Envoyé avec succès",
      successEmail: "Envoyé. Email de confirmation envoyé.",
      successSaved: "Envoyé. Email de confirmation non configuré.",
      error: "Échec de l'envoi. Réessayez."
    },
    registerSurvey: {
      title: "Profil Skater Express",
      desc: "Partage ta pratique et tes habitudes d'achat pour personnaliser les drops et recommandations.",
      note: "Optionnel — moins d'une minute"
    },
    form: {
      title: "Questionnaire Profil Skater",
      sub: "Questions rapides sur ta pratique, tes achats et tes accessoires préférés",
      desc: "Tes réponses nous aident à personnaliser les drops, événements et recommandations.",
      preview: "Aperçu des questions",
      open: "Ouvrir le Google Form",
      close: "Fermer"
    },
    chat: {
      label: "Raptor AI",
      brand: "Raptor[X]",
      title: "Raptor [X] AI Assistant",
      titleSuffix: "Assistant IA",
      subtitle: "Skate + streetwear",
      greeting: "Salut — je suis le concierge RAPTOR [X]. Demande-moi des conseils sur les decks, la street culture, les fits streetwear, ou les drops événements.",
      placeholder: "Demande des decks, du streetwear, des events...",
      send: "Envoyer",
      open: "Chat",
      close: "Fermer",
      thinking: "Réglage en cours...",
      error: "Assistant temporairement indisponible. Réessaie bientôt.",
      statusOffline: "Assistant hors ligne",
      retry: "Reessayer",
      quickTitle: "Accès rapide",
      suggestions: ["Quelle largeur de deck pour le street ?", "Dureté de roues pour les rues parisiennes ?", "Guide fits streetwear pour les drops RAPTOR [X]", "Temps forts du programme"],
      disclaimer: "Axé sur le skate, la street culture et RAPTOR [X]."
    },
    langSwitch: {
      toEnglish: "Passer en anglais",
      toFrench: "Passer en français"
    },
    ui: {
      close: "Fermer"
    },
    footer: {
      rights: "Droits d'auteur du produit Raptor Gaming Gear © 2024.",
      design: "Conçu pour le futur.",
      support: "Assistance",
      instagram: "Instagram",
      twitter: "Twitter",
      facebook: "Facebook"
    },
    schedule: [{
      date: "26 JAN",
      events: [{
        time: "14:00",
        title: "Londres : Southbank Centre Skate Space"
      }, {
        time: "16:00",
        title: "Démo live + Zone d'essai"
      }, {
        time: "17:30",
        title: "Meet & Greet avec les pros"
      }]
    }, {
      date: "27 JAN",
      events: [{
        time: "13:00",
        title: "Bristol : Dean Lane Skatepark"
      }, {
        time: "14:30",
        title: "Concours Best Trick"
      }, {
        time: "16:00",
        title: "Collab street art"
      }]
    }, {
      date: "28 JAN",
      events: [{
        time: "16:00",
        title: "Manchester : Projekts MCR Skatepark"
      }, {
        time: "18:00",
        title: "Skate jam + DJ set"
      }, {
        time: "19:30",
        title: "Giveaway RaptorX"
      }]
    }]
  }
};
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeO7w14EwzrwlTRuU1VWPFFKL_3-p6Moo8ySis3rfshZPc_jg/viewform?embedded=true";
const GOOGLE_FORM_ACTION_URL = GOOGLE_FORM_URL.replace("viewform?embedded=true", "formResponse");
const GOOGLE_FORM_FIELDS = {
  event_date: "entry.2092238618",
  event_city: "entry.1556369182",
  entrant_name_dob: "entry.1226124600",
  guardian_name: "entry.1461203638",
  entrant_age_sex: "entry.2047783657",
  guest_names: "entry.1482528636",
  experience: "entry.1145490362",
  board_types: "entry.1452731896",
  phone: "entry.652036710",
  email: "entry.1527478809",
  address: "entry.1329828399",
  favorite_pros: ""
};
const GOOGLE_FORM_READY = !GOOGLE_FORM_URL.includes("REPLACE_WITH_FORM_ID") && Object.values(GOOGLE_FORM_FIELDS).every(value => !value || !value.includes("REPLACE_"));
const registerSurvey = {
  en: [{
    id: "event-date",
    name: "event_date",
    type: "date",
    question: "Event date you want to attend",
    required: true
  }, {
    id: "event-city",
    name: "event_city",
    type: "multi",
    question: "Event location (cities) you want to attend",
    options: ["Paris", "Lyon"],
    required: true
  }, {
    id: "entrant-name-dob",
    name: "entrant_name_dob",
    type: "text",
    question: "Main entrant full name and date of birth",
    placeholder: "Full name, DD/MM/YYYY",
    required: true
  }, {
    id: "guardian-name",
    name: "guardian_name",
    type: "text",
    question: "Parent/guardian name (if main entrant is under 18)",
    placeholder: "Full name",
    required: true
  }, {
    id: "entrant-age-sex",
    name: "entrant_age_sex",
    type: "text",
    question: "Main entrant age and sex",
    placeholder: "Age, sex",
    required: true
  }, {
    id: "guest-names",
    name: "guest_names",
    type: "textarea",
    question: "Names of up to two guests (18+)",
    placeholder: "Guest 1, Guest 2",
    required: true
  }, {
    id: "experience",
    name: "experience",
    type: "single",
    question: "Skateboarding experience",
    options: ["Beginner", "Intermediate", "Advanced", "Pro"],
    required: true
  }, {
    id: "board-types",
    name: "board_types",
    type: "multi",
    question: "Types of skateboards owned",
    options: ["Street", "Cruiser", "Longboard", "Freestyle", "Downhill", "Electric", "Other"]
  }, {
    id: "favorite-pros",
    name: "favorite_pros",
    type: "text",
    question: "Favorite professional skateboarders",
    placeholder: "Names"
  }, {
    id: "phone",
    name: "phone",
    type: "tel",
    question: "Phone number (work/home/mobile + preferred method)",
    placeholder: "+33 ... (preferred contact)"
  }, {
    id: "email",
    name: "email",
    type: "email",
    question: "Email address of the main entrant",
    placeholder: "name@email.com"
  }, {
    id: "address",
    name: "address",
    type: "textarea",
    question: "Home address of main entrant",
    placeholder: "Street, City, Postal code, Country"
  }],
  fr: [{
    id: "event-date",
    name: "event_date",
    type: "date",
    question: "Date de l'événement souhaitée",
    required: true
  }, {
    id: "event-city",
    name: "event_city",
    type: "multi",
    question: "Ville(s) de l'événement souhaitée(s)",
    options: [{
      label: "Paris",
      value: "Paris"
    }, {
      label: "Lyon",
      value: "Lyon"
    }],
    required: true
  }, {
    id: "entrant-name-dob",
    name: "entrant_name_dob",
    type: "text",
    question: "Nom complet et date de naissance du participant principal",
    placeholder: "Nom complet, JJ/MM/AAAA",
    required: true
  }, {
    id: "guardian-name",
    name: "guardian_name",
    type: "text",
    question: "Nom du parent/tuteur (si moins de 18 ans)",
    placeholder: "Nom complet",
    required: true
  }, {
    id: "entrant-age-sex",
    name: "entrant_age_sex",
    type: "text",
    question: "Âge et sexe du participant principal",
    placeholder: "Âge, sexe",
    required: true
  }, {
    id: "guest-names",
    name: "guest_names",
    type: "textarea",
    question: "Noms de jusqu'à deux invités (18+)",
    placeholder: "Invité 1, Invité 2",
    required: true
  }, {
    id: "experience",
    name: "experience",
    type: "single",
    question: "Expérience en skateboard",
    options: [{
      label: "Débutant",
      value: "Beginner"
    }, {
      label: "Intermédiaire",
      value: "Intermediate"
    }, {
      label: "Avancé",
      value: "Advanced"
    }, {
      label: "Pro",
      value: "Pro"
    }],
    required: true
  }, {
    id: "board-types",
    name: "board_types",
    type: "multi",
    question: "Types de skateboards possédés",
    options: [{
      label: "Street",
      value: "Street"
    }, {
      label: "Cruiser",
      value: "Cruiser"
    }, {
      label: "Longboard",
      value: "Longboard"
    }, {
      label: "Freestyle",
      value: "Freestyle"
    }, {
      label: "Downhill",
      value: "Downhill"
    }, {
      label: "Électrique",
      value: "Electric"
    }, {
      label: "Autre",
      value: "Other"
    }]
  }, {
    id: "favorite-pros",
    name: "favorite_pros",
    type: "text",
    question: "Skateurs professionnels favoris",
    placeholder: "Noms"
  }, {
    id: "phone",
    name: "phone",
    type: "tel",
    question: "Numéro de téléphone (pro/domicile/mobile + méthode préférée)",
    placeholder: "+33 ... (contact préféré)"
  }, {
    id: "email",
    name: "email",
    type: "email",
    question: "Adresse email du participant principal",
    placeholder: "nom@email.com"
  }, {
    id: "address",
    name: "address",
    type: "textarea",
    question: "Adresse postale du participant principal",
    placeholder: "Rue, Ville, Code postal, Pays"
  }]
};

// --- CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    const handleMouseOver = e => {
      if (e.target.closest('button, a, input, .cursor-pointer')) {
        cursor.classList.add('hovered');
      } else {
        cursor.classList.remove('hovered');
      }
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: cursorRef,
    className: "custom-cursor hidden md:block"
  });
};

// --- COMPONENTS ---
const GlitchText = ({
  text,
  className = ""
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `glitch-wrapper ${className}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "glitch",
    "data-text": text
  }, text));
};
const InfiniteMarquee = ({
  text,
  direction = 'left',
  speed = 20,
  className = ""
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `overflow-hidden whitespace-nowrap py-4 border-y-2 border-black ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `inline-block ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`,
    style: {
      animationDuration: `${speed}s`
    }
  }, [...Array(10)].map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "mx-8 font-black uppercase italic tracking-widest text-2xl font-graffiti"
  }, text, " ", /*#__PURE__*/React.createElement("span", {
    className: "opacity-30 mx-4"
  }, "//")))), /*#__PURE__*/React.createElement("div", {
    className: `absolute top-0 inline-block ${direction === 'left' ? 'animate-marquee-left2' : 'animate-marquee-right2'}`,
    style: {
      animationDuration: `${speed}s`
    }
  }, [...Array(10)].map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "mx-8 font-black uppercase italic tracking-widest text-2xl font-graffiti"
  }, text, " ", /*#__PURE__*/React.createElement("span", {
    className: "opacity-30 mx-4"
  }, "//")))));
};

// --- PRODUCT BLUEPRINT COMPONENT ---
const ProductBlueprint = ({
  product,
  isAnimating,
  lang
}) => {
  const t = translations[lang];
  const theme = product.theme || {
    accent: "#111111",
    accentSecondary: "#333333",
    labelGradient: "linear-gradient(135deg, #111111, #333333)",
    textClass: "text-black drop-shadow-lg"
  };
  const accentPrimary = theme.accent;
  const accentSecondary = theme.accentSecondary || theme.accent;
  const labelGradient = theme.labelGradient;
  const [mousePos, setMousePos] = React.useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isMobileLayout, setIsMobileLayout] = React.useState(false);
  const containerRef = React.useRef(null);
  const handleMouseMove = e => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({
      x,
      y
    });
  };
  const partContent = t.blueprint.parts;
  const parts = [{
    id: 'deck',
    label: partContent.deck.label,
    desc: partContent.deck.desc,
    icon: /*#__PURE__*/React.createElement(Zap, {
      size: 16
    }),
    anchor: {
      x: -40,
      y: -120,
      z: 10
    },
    pos: {
      x: -180,
      y: -160,
      z: 50
    }
  }, {
    id: 'trucks',
    label: partContent.trucks.label,
    desc: partContent.trucks.desc,
    icon: /*#__PURE__*/React.createElement(Droplet, {
      size: 16
    }),
    anchor: {
      x: 50,
      y: 50,
      z: 20
    },
    pos: {
      x: 200,
      y: 0,
      z: 80
    }
  }, {
    id: 'wheels',
    label: partContent.wheels.label,
    desc: partContent.wheels.desc,
    icon: /*#__PURE__*/React.createElement(Scale, {
      size: 16
    }),
    anchor: {
      x: 80,
      y: 100,
      z: 20
    },
    pos: {
      x: 200,
      y: 160,
      z: 20
    }
  }];

  // Add floating animation state
  const [floatOffset, setFloatOffset] = React.useState(0);
  const floatDistance = isHovering ? 28 : 0;
  const tiltX = isHovering ? (mousePos.y - 0.5) * 12 : 0;
  const tiltY = isHovering ? (mousePos.x - 0.5) * -12 : 0;
  const wobbleZ = Math.sin(floatOffset * 1.4) * 1.6;
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset(prev => (prev + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateLayout = () => setIsMobileLayout(window.innerWidth <= 900);
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);
  const mobileLayout = {
    deck: {
      anchor: {
        x: 10,
        y: -80
      },
      pos: {
        x: 60,
        y: -140
      }
    },
    trucks: {
      anchor: {
        x: 30,
        y: -20
      },
      pos: {
        x: 0,
        y: -70
      }
    },
    wheels: {
      anchor: {
        x: 40,
        y: 40
      },
      pos: {
        x: 0,
        y: 80
      }
    },
    grip: {
      anchor: {
        x: -30,
        y: 90
      },
      pos: {
        x: 0,
        y: 190
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "relative w-full h-[420px] sm:h-[520px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden product-blueprint-stage",
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-full flex items-center justify-center perspective-1000"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${isAnimating ? 'spin-space' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `product-blueprint-board relative w-[260px] sm:w-[300px] md:w-[400px] h-[420px] sm:h-[460px] md:h-[500px] transition-all duration-1000 ease-out will-change-transform ${isAnimating ? 'spin-space-inner' : ''}`,
    style: {
      transform: `translateY(${Math.sin(floatOffset) * 10 - floatDistance}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${wobbleZ}deg) translateZ(${isHovering ? 18 : 0}px)`,
      filter: isHovering ? 'drop-shadow(0 30px 70px rgba(0,0,0,0.32))' : 'drop-shadow(0 16px 36px rgba(0,0,0,0.2))',
      transition: 'transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1), filter 900ms cubic-bezier(0.2, 0.7, 0.2, 1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-full h-full transition-all duration-1000 ease-out ${isAnimating ? 'scale-75 opacity-0 blur-md rotate-y-12 translate-z-minus-20' : 'scale-100 opacity-100 blur-0 rotate-y-0 translate-z-0'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-20 w-[60%] h-10 bg-black/20 blur-2xl rounded-full transition-all duration-300",
    style: {
      opacity: isHovering ? 0.55 : 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 pointer-events-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse",
    style: {
      animationDelay: '0s',
      transform: `translateY(${Math.sin(floatOffset * 2) * 4}px)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse",
    style: {
      animationDelay: '1s',
      transform: `translateY(${Math.sin(floatOffset * 1.5) * 6}px)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full opacity-40 animate-pulse",
    style: {
      animationDelay: '2s',
      transform: `translateY(${Math.sin(floatOffset * 1.8) * 5}px)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/2 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-70 animate-pulse",
    style: {
      animationDelay: '0.5s',
      transform: `translateY(${Math.sin(floatOffset * 2.2) * 3}px)`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center pointer-events-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-[320px] md:w-[420px] h-[200px]",
    style: {
      transform: 'rotateZ(-45deg) translateZ(-8px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-10 right-10 top-1/2 h-[2px] border-t border-dashed border-neutral-700/40"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[18%] top-[44%] w-24 md:w-28 h-[6px] bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-700 rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[18%] top-[44%] w-24 md:w-28 h-[6px] bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-700 rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[18%] top-[48%] w-16 md:w-20 h-[2px] bg-neutral-600/60 rounded-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[18%] top-[48%] w-16 md:w-20 h-[2px] bg-neutral-600/60 rounded-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[14%] top-[36%] w-4 md:w-5 h-4 md:h-5 bg-gradient-to-br from-neutral-100 to-neutral-500 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[14%] top-[50%] w-4 md:w-5 h-4 md:h-5 bg-gradient-to-br from-neutral-100 to-neutral-500 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[14%] top-[36%] w-4 md:w-5 h-4 md:h-5 bg-gradient-to-br from-neutral-100 to-neutral-500 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[14%] top-[50%] w-4 md:w-5 h-4 md:h-5 bg-gradient-to-br from-neutral-100 to-neutral-500 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
  }))), product.image ? /*#__PURE__*/React.createElement("img", {
    src: product.image,
    alt: product.name,
    loading: "lazy",
    decoding: "async",
    className: `w-full h-auto object-contain transform transition-all duration-700 ${product.imgClass || ''}`,
    style: {
      transform: `rotateZ(-45deg) translateZ(0px) scale(${isHovering ? 1.06 : 1.02})`,
      filter: 'contrast(1.05)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "w-full h-[220px] flex items-center justify-center text-neutral-300 text-xl font-black uppercase tracking-[0.3em]"
  }, "RAPTOR [X]")), parts.map(part => {
    const layout = isMobileLayout ? mobileLayout[part.id] : null;
    const anchorX = layout ? layout.anchor.x : part.anchor.x;
    const anchorY = layout ? layout.anchor.y : part.anchor.y;
    const posX = layout ? layout.pos.x : part.pos.x;
    const posY = layout ? layout.pos.y : part.pos.y;
    return /*#__PURE__*/React.createElement("div", {
      key: part.id,
      className: "absolute inset-0 pointer-events-none"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full border-[3px] z-10 shadow-lg transition-all duration-300",
      style: {
        transform: `translate(${anchorX}px, ${anchorY}px)`,
        borderColor: accentPrimary,
        boxShadow: `0 0 12px ${accentSecondary}80`,
        opacity: isHovering ? 1 : 0.7
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 rounded-full animate-ping",
      style: {
        backgroundColor: accentSecondary,
        opacity: isHovering ? 0.9 : 0.6
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1/2 left-1/2 w-[2px] bg-neutral-900 transition-all duration-300",
      style: {
        height: Math.sqrt(Math.pow(posX - anchorX, 2) + Math.pow(posY - anchorY, 2)),
        transform: `translate(${anchorX}px, ${anchorY}px) rotateZ(${-90 + Math.atan2(posY - anchorY, posX - anchorX) * 180 / Math.PI}deg)`,
        transformOrigin: '0 0',
        opacity: isHovering ? 0.8 : 0.5
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1/2 left-1/2 pointer-events-auto transition-all duration-300 blueprint-tag",
      style: {
        transform: `translate(${posX - 128}px, ${posY - 40}px)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex group hover:scale-105 transition-all duration-300 border-2",
      style: {
        borderColor: accentPrimary,
        boxShadow: `0 10px 40px rgba(0,0,0,0.2), 0 0 15px ${accentSecondary}30`,
        opacity: isHovering ? 1 : 0.8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center text-white shrink-0 blueprint-tag-icon",
      style: labelGradient ? {
        backgroundImage: labelGradient
      } : {
        backgroundColor: accentPrimary
      }
    }, part.icon), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 bg-white blueprint-tag-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-black uppercase font-graffiti text-black leading-none mb-1 blueprint-tag-title"
    }, part.label), /*#__PURE__*/React.createElement("span", {
      className: "text-neutral-600 font-bold leading-tight blueprint-tag-desc"
    }, part.desc))))));
  }))))));
};
const RevealOnScroll = ({
  children,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`
  }, children);
};
const RobotAvatar = ({
  size = 56,
  eyeOffset,
  wrapperRef,
  expression = "cute",
  className = ""
}) => /*#__PURE__*/React.createElement("div", {
  ref: wrapperRef,
  className: `chat-robot-3d chat-expression-${expression} ${className}`,
  style: {
    "--robot-size": `${size}px`,
    "--eye-x": `${eyeOffset?.x || 0}px`,
    "--eye-y": `${eyeOffset?.y || 0}px`
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "chat-robot-tilt"
}, /*#__PURE__*/React.createElement("div", {
  className: "chat-robot-head"
}, /*#__PURE__*/React.createElement("div", {
  className: "chat-robot-face"
}, /*#__PURE__*/React.createElement("div", {
  className: "chat-robot-screen"
}, /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-eye"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-eye"
})))), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-band"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-ear left"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-ear right"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-neck"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-body"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-legs"
}, /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-leg"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-leg"
})), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-board"
}, /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-wheels"
}, /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-wheel"
}), /*#__PURE__*/React.createElement("span", {
  className: "chat-robot-wheel"
})))));
const ChatbotWidget = ({
  lang
}) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: t.chat.greeting
  }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cursorShift, setCursorShift] = useState({
    x: 0,
    y: 0
  });
  const [eyeOffset, setEyeOffset] = useState({
    x: 0,
    y: 0
  });
  const [robotMood, setRobotMood] = useState("cute");
  const [isCursorNear, setIsCursorNear] = useState(false);
  const [chatStatus, setChatStatus] = useState({
    state: "unknown",
    message: ""
  });
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const robotRef = useRef(null);
  const headerRobotRef = useRef(null);
  const localizeValue = value => {
    if (typeof value === "string") return value;
    return value?.[lang] || value?.en || "";
  };
  const getPageText = () => {
    if (typeof document === "undefined") return "";
    const root = document.querySelector("#root");
    const text = root?.innerText || document.body?.innerText || "";
    return text.replace(/\s+/g, " ").trim();
  };
  const getPageImages = () => {
    if (typeof document === "undefined") return [];
    const origin = window.location.origin;
    return Array.from(document.querySelectorAll("img")).map(img => {
      const src = img.currentSrc || img.getAttribute("src") || "";
      if (!src || src.startsWith("data:")) return null;
      let url = src;
      try {
        url = new URL(src, origin).toString();
      } catch (error) {
        url = src;
      }
      return {
        alt: (img.getAttribute("alt") || "").trim(),
        src: url
      };
    }).filter(Boolean);
  };
  const buildSiteContext = () => {
    const productSummary = products.map(item => `${item.name} — ${localizeValue(item.sub)} (${localizeValue(item.badge)})`).join("; ");
    const productImages = products.map(item => {
      const sub = localizeValue(item.sub);
      const badge = localizeValue(item.badge);
      const tags = ["deck", sub, badge].filter(Boolean).join(" | ");
      return `${item.name} (${sub}): ${item.image} [tags: ${tags}]`;
    }).join("\n");
    const gearSummary = gear.map(item => `${localizeValue(item.name)}: ${localizeValue(item.sub)} — ${item.price}. ${localizeValue(item.description)}`).join("; ");
    const gearImages = gear.map(item => `${localizeValue(item.name)}: ${item.image}`).join("\n");
    const scheduleSummary = t.schedule.map(day => `${day.date}: ${day.events.map(event => `${event.time} ${event.title}`).join(", ")}`).join(" | ");
    const pageText = getPageText();
    const images = getPageImages().map(image => `${image.alt || "Image"} — ${image.src}`).join("\n");
    return ["PAGE TEXT:", pageText || "No page text available.", "IMAGES:", images || "No images available.", "PRODUCT IMAGE MAP:", productImages || "No product images available.", "GEAR IMAGE MAP:", gearImages || "No gear images available.", "STRUCTURED DATA:", "Brand: RAPTOR [X]", `Collection products: ${productSummary}`, `Gear catalog: ${gearSummary}`, `Event timeline: ${scheduleSummary}`].join("\n");
  };
  const apiBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    const metaBase = document.querySelector('meta[name="raptor-api-base"]')?.getAttribute("content");
    if (metaBase && metaBase.trim()) return metaBase.trim();
    const origin = window.location.origin;
    if (origin === "null") return "http://localhost:8787";
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") return origin;
    return `https://api.${hostname}`;
  }, []);
  const fallbackApiBase = "https://raptorx-api.onrender.com";
  const apiBases = [apiBase, fallbackApiBase].filter(Boolean).filter((value, index, array) => array.indexOf(value) === index);
  const buildApiUrl = (base, path) => base ? `${base}${path}` : path;
  const chatApiUrls = apiBases.length ? apiBases.map(base => buildApiUrl(base, "/api/chat")) : ["/api/chat"];
  const healthApiUrls = apiBases.length ? apiBases.map(base => buildApiUrl(base, "/api/health")) : ["/api/health"];
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const fetchWithTimeout = async (url, options, timeoutMs = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal
      });
    } catch (error) {
      const message = (error?.message || "").toLowerCase();
      if (error?.name === "AbortError" || message.includes("aborted") || message.includes("timeout")) {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };
  const checkHealth = async () => {
    for (const url of healthApiUrls) {
      try {
        const response = await fetchWithTimeout(url, {
          method: "GET"
        }, 4000);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || "Health check failed.");
        }
        return data;
      } catch (error) {
        continue;
      }
    }
    return null;
  };
  const updateStatusFromHealth = health => {
    if (health && health.status === "ok") {
      setChatStatus({
        state: "online",
        message: ""
      });
      setShowOfflineBanner(false);
      return;
    }
    if (health && health.status === "error") {
      setChatStatus({
        state: "offline",
        message: health.message || t.chat.error
      });
      return;
    }
    setChatStatus({
      state: "offline",
      message: t.chat.error
    });
  };
  const refreshStatus = async () => {
    const health = await checkHealth();
    updateStatusFromHealth(health);
    return health;
  };
  const fetchWithRetry = async (url, options, attempts = 3) => {
    const urls = Array.isArray(url) ? url : [url];
    let lastError = null;
    for (const currentUrl of urls) {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        try {
          const response = await fetchWithTimeout(currentUrl, options, 10000);
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(data.error || "Chat request failed.");
          }
          return data;
        } catch (error) {
          lastError = error;
          const message = (error?.message || "").toLowerCase();
          if (message.includes("timed out") || message.includes("aborted")) {
            break;
          }
          if (attempt < attempts - 1) {
            await sleep(500 * Math.pow(2, attempt));
          }
        }
      }
    }
    throw lastError || new Error(t.chat.error);
  };
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isSending, isOpen]);
  useEffect(() => {
    let animationFrame = null;
    const handleMove = event => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const offsetX = (event.clientX / window.innerWidth - 0.5) * 24;
        const offsetY = (event.clientY / window.innerHeight - 0.5) * 24;
        setCursorShift({
          x: offsetX,
          y: offsetY
        });
        const candidates = [robotRef.current, headerRobotRef.current].filter(Boolean);
        if (!candidates.length) {
          setIsCursorNear(false);
          return;
        }
        let closest = null;
        let minDistance = Infinity;
        candidates.forEach(node => {
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = event.clientX - centerX;
          const dy = event.clientY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            minDistance = distance;
            closest = {
              dx,
              dy
            };
          }
        });
        if (!closest) return;
        const maxDistance = 220;
        const influence = Math.max(0, Math.min(1, (maxDistance - minDistance) / maxDistance));
        const clamp = value => Math.max(-6, Math.min(6, value * 0.06));
        setEyeOffset({
          x: clamp(closest.dx) * influence,
          y: clamp(closest.dy) * influence
        });
        setIsCursorNear(minDistance < 140);
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{
          ...prev[0],
          content: t.chat.greeting
        }];
      }
      return prev;
    });
  }, [lang]);
  useEffect(() => {
    let intervalId = null;
    refreshStatus();
    intervalId = setInterval(refreshStatus, 20000);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [lang]);
  const getExpressionFromReply = text => {
    const content = text.toLowerCase();
    const happyTokens = ["stoked", "awesome", "great", "glad", "love", "sick", "fire", "dope", "perfect", "fantastic", "excellent", "nice", "cool", "lets go", "let's go", "rad", "amazing", "super", "genial", "génial", "incroyable", "parfait", "top", "tuyet", "tuyệt", "tuyet voi", "tuyệt vời", "vui", "hay", "dep", "đẹp"];
    const sadTokens = ["sorry", "unfortunately", "can't", "cannot", "cant", "error", "offline", "issue", "problem", "fail", "not able", "sad", "rất tiếc", "rat tiec", "xin loi", "xin lỗi", "khong", "không", "desole", "désolé", "malheureusement", "probleme", "problème", "impossible"];
    if (sadTokens.some(token => content.includes(token))) return "sad";
    if (happyTokens.some(token => content.includes(token))) return "happy";
    return "cute";
  };
  const getChatErrorMessage = error => {
    const rawMessage = error?.message || "";
    const normalized = rawMessage.toLowerCase();
    if (normalized.includes("timed out") || normalized.includes("aborted")) return "Request timed out. Please try again.";
    const isNetworkError = normalized.includes("failed to fetch") || normalized.includes("network") || normalized.includes("offline");
    if (isNetworkError || !rawMessage) return t.chat.error;
    return rawMessage;
  };
  const sendMessage = async text => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    const userMessage = {
      role: "user",
      content: trimmed
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    setRobotMood("cute");
    const history = [...messages, userMessage].filter(item => item && typeof item.content === "string").map(item => ({
      role: item.role,
      content: item.content
    })).slice(-12);
    try {
      const siteContext = buildSiteContext();
      const data = await fetchWithRetry(chatApiUrls, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: history,
          lang,
          siteContext
        })
      });
      if (!data.reply) {
        throw new Error("Chat response missing.");
      }
      setChatStatus({
        state: "online",
        message: ""
      });
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply
      }]);
      setRobotMood(getExpressionFromReply(data.reply));
      setShowOfflineBanner(false);
    } catch (error) {
      const health = await refreshStatus();
      const errorMessage = health?.status === "error" && health.message ? health.message : getChatErrorMessage(error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage
      }]);
      setRobotMood("sad");
      setShowOfflineBanner(true);
    } finally {
      setIsSending(false);
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(input);
  };
  const handleKeyDown = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };
  const handleSuggestion = suggestion => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const activeExpression = isCursorNear ? "happy" : robotMood;
  const renderChatBrand = text => {
    if (typeof text !== "string") return text;
    const pattern = /(RAPTOR\s*\[X\]|Raptor\s*\[X\]|Raptor\[X\])/g;
    const isBrandToken = /^(RAPTOR\s*\[X\]|Raptor\s*\[X\]|Raptor\[X\])$/;
    const parts = text.split(pattern);
    return parts.map((part, index) => {
      if (isBrandToken.test(part)) {
        return /*#__PURE__*/React.createElement("span", {
          key: `brand-${index}`,
          className: "chat-brand"
        }, part);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: `text-${index}`
      }, part);
    });
  };
  const renderChatMessage = text => {
    if (typeof text !== "string") return text;
    const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    const items = [];
    let listItems = [];
    const imageRegex = /(https?:\/\/[^\s)]+?\.(?:png|jpe?g|webp|gif|svg)|\/event\/[^\s)]+?\.(?:png|jpe?g|webp|gif|svg))/gi;
    const imageLineRegex = /^image:\s*/i;
    const imageLines = lines.filter(line => imageLineRegex.test(line));
    const contentLines = lines.filter(line => !imageLineRegex.test(line));
    const renderInline = content => {
      const segments = content.split(/\*\*(.+?)\*\*/g);
      return segments.map((segment, idx) => {
        if (idx % 2 === 1) {
          return /*#__PURE__*/React.createElement("strong", {
            key: `b-${idx}`,
            className: "chat-highlight"
          }, renderChatBrand(segment));
        }
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: `t-${idx}`
        }, renderChatBrand(segment));
      });
    };
    const extractImageUrls = line => {
      const matches = line.match(imageRegex);
      return matches ? Array.from(new Set(matches)) : [];
    };
    const stripImageUrls = line => line.replace(imageRegex, "").replace(/\s{2,}/g, " ").trim();
    const getImageLabel = url => {
      const normalizedUrl = (url || "").toLowerCase();
      const productMatch = products.find(item => normalizedUrl.includes((item.image || "").toLowerCase()));
      if (productMatch) {
        const subLabel = localizeValue(productMatch.sub);
        return `Raptor[X] ${subLabel}`.trim();
      }
      const gearMatch = gear.find(item => normalizedUrl.includes((item.image || "").toLowerCase()));
      if (gearMatch) {
        return `[Gear] ${localizeValue(gearMatch.name)}`.trim();
      }
      const raw = (url || "").split("/").pop() || "";
      const base = decodeURIComponent(raw).replace(/\.[^.]+$/, "");
      const label = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
      return label || "Raptor[X]";
    };
    const getImageTag = url => {
      const value = (url || "").toLowerCase();
      if (value.includes("/event/")) return "Event";
      if (value.includes("gear/")) return "Gear";
      if (value.includes("canva.site")) return "Deck";
      return "Product";
    };
    const renderImages = (urls, keyPrefix) => urls.map((url, idx) => /*#__PURE__*/React.createElement("div", {
      key: `${keyPrefix}-img-${idx}`,
      className: "chat-image-card"
    }, /*#__PURE__*/React.createElement("img", {
      src: url,
      alt: getImageLabel(url),
      loading: "lazy",
      decoding: "async",
      className: "chat-inline-image"
    }), /*#__PURE__*/React.createElement("div", {
      className: "chat-image-bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chat-image-tag"
    }, getImageTag(url)), /*#__PURE__*/React.createElement("span", null, getImageLabel(url)))));
    const flushList = () => {
      if (listItems.length) {
        items.push(/*#__PURE__*/React.createElement("ul", {
          key: `list-${items.length}`
        }, listItems.map((item, idx) => {
          const urls = extractImageUrls(item);
          const textOnly = stripImageUrls(item);
          return /*#__PURE__*/React.createElement("li", {
            key: `li-${items.length}-${idx}`
          }, textOnly ? /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEF9 ", renderInline(textOnly)) : /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEF9"), urls.length ? /*#__PURE__*/React.createElement("div", null, renderImages(urls, `li-${items.length}-${idx}`)) : null);
        })));
        listItems = [];
      }
    };
    imageLines.forEach((line, index) => {
      const cleaned = line.replace(imageLineRegex, "").trim();
      const urls = extractImageUrls(cleaned);
      if (urls.length) {
        items.push(/*#__PURE__*/React.createElement("div", {
          key: `img-top-${index}`
        }, renderImages(urls, `top-${index}`)));
      }
    });
    contentLines.forEach((line, index) => {
      const isBullet = /^[-•]\s+/.test(line);
      const isDivider = /^[-_]{3,}$/.test(line);
      const isHeading = /^(\d+\.|[A-Z][A-Z\s]+:)/.test(line);
      if (isBullet) {
        listItems.push(line.replace(/^[-•]\s+/, ""));
      } else if (isDivider) {
        flushList();
        items.push(/*#__PURE__*/React.createElement("div", {
          key: `div-${index}`,
          className: "chat-divider"
        }));
      } else if (isHeading) {
        flushList();
        items.push(/*#__PURE__*/React.createElement("div", {
          key: `h-${index}`,
          className: "chat-heading"
        }, "\uD83C\uDFC1 ", renderInline(line.replace(/:$/, ""))));
      } else {
        flushList();
        const urls = extractImageUrls(line);
        const textOnly = stripImageUrls(line);
        if (textOnly) {
          items.push(/*#__PURE__*/React.createElement("p", {
            key: `p-${index}`
          }, renderInline(textOnly)));
        }
        if (urls.length) {
          items.push(/*#__PURE__*/React.createElement("div", {
            key: `img-${index}`
          }, renderImages(urls, `p-${index}`)));
        }
      }
    });
    flushList();
    return items;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-4 sm:right-6 z-[9997] flex flex-col items-end gap-3"
  }, isOpen && showOfflineBanner && chatStatus.state === "offline" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 rounded-full bg-black text-yellow-300 border border-yellow-400 px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase tracking-widest font-bold"
  }, t.chat.statusOffline), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: refreshStatus,
    className: "text-[10px] uppercase tracking-widest bg-yellow-400 text-black px-3 py-1 rounded-full font-bold hover:bg-yellow-300 transition"
  }, t.chat.retry)), /*#__PURE__*/React.createElement("div", {
    className: `relative w-[86vw] sm:w-[340px] md:w-[400px] transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "chat-orbit"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-3xl overflow-hidden border border-black/10 bg-white text-black shadow-[0_30px_70px_rgba(0,0,0,0.2)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b border-black/10 flex items-center justify-between bg-gradient-to-r from-yellow-400 via-yellow-200 to-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-header-robot",
    style: {
      transform: `translate3d(${cursorShift.x * 0.15}px, ${cursorShift.y * 0.15}px, 0)`
    }
  }, /*#__PURE__*/React.createElement(RobotAvatar, {
    size: 36,
    eyeOffset: eyeOffset,
    wrapperRef: headerRobotRef,
    expression: activeExpression
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-black uppercase tracking-[0.3em] text-black/70"
  }, t.chat.subtitle), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chat-brand"
  }, t.chat.brand), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-bold uppercase tracking-widest text-black"
  }, t.chat.titleSuffix)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIsOpen(false),
    className: "text-black/60 hover:text-black transition"
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    ref: messagesRef,
    className: "max-h-[420px] sm:max-h-[520px] overflow-y-auto px-4 py-4 space-y-3 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_60%)]"
  }, messages.map((message, index) => /*#__PURE__*/React.createElement("div", {
    key: `${message.role}-${index}`,
    className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `chat-message max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'user' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-black border border-black/5'}`
  }, message.role === 'user' ? renderChatBrand(message.content) : renderChatMessage(message.content)))), isSending && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[82%] rounded-2xl px-4 py-3 text-sm text-black border border-black/5 bg-gray-100"
  }, t.chat.thinking))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-full text-[10px] uppercase tracking-[0.3em] text-black/60"
  }, t.chat.quickTitle), t.chat.suggestions.map(suggestion => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: suggestion,
    onClick: () => handleSuggestion(suggestion),
    className: "px-3 py-1 rounded-full border border-black/10 text-[10px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition"
  }, suggestion))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "flex items-end gap-2"
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: inputRef,
    value: input,
    onChange: event => setInput(event.target.value),
    onKeyDown: handleKeyDown,
    placeholder: t.chat.placeholder,
    rows: 2,
    className: "flex-1 resize-none bg-white text-black border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black placeholder:text-gray-400"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSending,
    className: "px-4 py-3 rounded-2xl bg-black text-yellow-300 text-xs font-black uppercase tracking-widest hover:bg-black/80 transition disabled:opacity-60 disabled:cursor-not-allowed"
  }, t.chat.send)), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-[10px] uppercase tracking-widest text-black/50"
  }, t.chat.disclaimer)))), isOpen ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIsOpen(false),
    className: "chat-float relative flex items-center gap-3 px-4 py-3 rounded-full bg-yellow-400 text-black font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(255,214,0,0.35)]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 rounded-full border border-black/10"
  }), /*#__PURE__*/React.createElement(MessageSquare, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs sm:text-sm"
  }, t.chat.close)) : /*#__PURE__*/React.createElement("div", {
    className: "transition-transform duration-150",
    style: {
      transform: `translate3d(${cursorShift.x}px, ${cursorShift.y}px, 0)`
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIsOpen(true),
    className: "chat-float chat-launcher",
    "aria-label": t.chat.open
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `translate3d(${cursorShift.x * 0.2}px, ${cursorShift.y * 0.2}px, 0)`
    }
  }, /*#__PURE__*/React.createElement(RobotAvatar, {
    size: 72,
    eyeOffset: eyeOffset,
    wrapperRef: robotRef,
    expression: activeExpression
  })), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, t.chat.open))));
};

// --- DATA ---
const products = [{
  id: 1,
  name: "RAPTOR [X]",
  sub: {
    en: "MATTE BLACK",
    fr: "NOIR MAT"
  },
  badge: {
    en: "MUST HAVE",
    fr: "MUST HAVE"
  },
  image: "https://janeportforlio.my.canva.site/ljmu/_assets/media/9146ede3d5e8626f9199ee8fd66398b6.png",
  theme: {
    accent: "#000000",
    textClass: "text-black drop-shadow-lg"
  }
}, {
  id: 2,
  name: "RAPTOR [X]",
  sub: {
    en: "PURE WHITE",
    fr: "BLANC PUR"
  },
  badge: {
    en: "LIMITED",
    fr: "ÉDITION LIMITÉE"
  },
  image: "https://janeportforlio.my.canva.site/ljmu/_assets/media/624bbc730a47d752679739ac1e89f29c.png",
  theme: {
    accent: "#1f2937",
    textClass: "text-gray-800 drop-shadow-md"
  }
}, {
  id: 3,
  name: "RAPTOR [X]",
  sub: {
    en: "TITANIUM",
    fr: "TITANE"
  },
  badge: {
    en: "LIMITED FOR UK",
    fr: "LIMITÉ POUR LE UK"
  },
  image: "https://janeportforlio.my.canva.site/ljmu/_assets/media/34e8ea85e73bc80883121127c99b0f8c.png",
  theme: {
    accent: "#012169",
    accentSecondary: "#C8102E",
    labelGradient: "linear-gradient(135deg, #012169, #C8102E)",
    textClass: "text-transparent bg-clip-text bg-gradient-to-r from-[#012169] to-[#C8102E] drop-shadow-sm"
  }
}, {
  id: 4,
  name: "RAPTOR [X]",
  sub: {
    en: "GIRL EDITION",
    fr: "ÉDITION FILLE"
  },
  badge: {
    en: "SPECIAL GIFT",
    fr: "CADEAU SPÉCIAL"
  },
  image: "https://janeportforlio.my.canva.site/ljmu/_assets/media/19e686d94a78159e19bf1bcda460ee8b.png",
  theme: {
    accent: "#ec4899",
    textClass: "text-pink-500 drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)]"
  }
}];
const gear = [{
  id: 1,
  name: {
    en: "BABY RAPTOR RIDE TEE",
    fr: "T-SHIRT BABY RAPTOR RIDE"
  },
  sub: {
    en: "Soft Cotton Graphic T-Shirt",
    fr: "T-shirt graphique en coton doux"
  },
  image: "gear/7.png",
  price: "$32",
  badge: {
    en: "GIRL'S FAVORITE",
    fr: "PRÉFÉRÉE DES FILLES"
  },
  badgeTone: "bg-pink-500 text-white",
  imageClass: "scale-[1.22] md:scale-[1.3] group-hover:scale-[1.3] md:group-hover:scale-[1.36]",
  description: {
    en: "Playful baby-raptor deck art on breathable cotton. Easy daily fit with a clean front-back story.",
    fr: "Illustration baby-raptor sur coton respirant. Coupe facile au quotidien, visuel propre recto-verso."
  }
}, {
  id: 2,
  name: {
    en: "HATCHLING HOODIE",
    fr: "HOODIE HATCHLING"
  },
  sub: {
    en: "Baby Raptor Pullover",
    fr: "Pull à capuche Baby Raptor"
  },
  image: "gear/8.png",
  price: "$68",
  badge: {
    en: "UP COMING 2026",
    fr: "UP COMING 2026"
  },
  badgeTone: "bg-sky-300 text-black",
  imageClass: "scale-[1.2] md:scale-[1.28] group-hover:scale-[1.28] md:group-hover:scale-[1.34]",
  description: {
    en: "Cozy fleece pullover with egg crest front and dino backprint. Warm, soft, and session-ready.",
    fr: "Pull polaire cosy avec écusson oeuf devant et print dino au dos. Chaud, doux, prêt pour les sessions."
  }
}, {
  id: 3,
  name: {
    en: "RAPTOR CREST HOODIE",
    fr: "HOODIE RAPTOR CREST"
  },
  sub: {
    en: "Classic Logo Pullover",
    fr: "Pull logo classique"
  },
  image: "gear/9.png",
  price: "$74",
  badge: {
    en: "CORE CLASSIC",
    fr: "CLASSIQUE"
  },
  badgeTone: "bg-black text-white",
  imageClass: "scale-[0.96] md:scale-[0.98] group-hover:scale-[1.0] md:group-hover:scale-[1.02]",
  description: {
    en: "Minimal chest crest on a heavyweight gray hoodie. Built for night rides and clean fits.",
    fr: "Crest minimal sur hoodie gris épais. Parfait pour les sessions de nuit et les fits clean."
  }
}, {
  id: 4,
  name: {
    en: "NIGHT CLAW TEE",
    fr: "T-SHIRT NIGHT CLAW"
  },
  sub: {
    en: "Front Crest + Back Claw",
    fr: "Crest avant + griffes dos"
  },
  image: "gear/10.png",
  price: "$36",
  badge: {
    en: "FREESTYLE",
    fr: "FREESTYLE"
  },
  badgeTone: "bg-neutral-900 text-white",
  imageClass: "scale-[1.2] md:scale-[1.28] group-hover:scale-[1.28] md:group-hover:scale-[1.34]",
  description: {
    en: "Stealth black tee with claw-strike backprint. Smooth hand feel, durable seams, all-day comfort.",
    fr: "T-shirt noir stealth avec griffes au dos. Toucher doux, coutures solides, confort toute la journée."
  }
}, {
  id: 5,
  name: {
    en: "RAPTOR X ZIP HOODIE",
    fr: "HOODIE ZIP RAPTOR X"
  },
  sub: {
    en: "Signature Back Logo",
    fr: "Logo signature au dos"
  },
  image: "gear/11.png",
  price: "$88",
  badge: {
    en: "SKATER LOVE IT",
    fr: "SKATER LOVE IT"
  },
  badgeTone: "bg-yellow-300 text-black",
  imageClass: "scale-[1.22] md:scale-[1.3] group-hover:scale-[1.3] md:group-hover:scale-[1.36]",
  description: {
    en: "Zip-up layer with oversized back mark and contrast drawcords. Easy on, easy off between runs.",
    fr: "Zip avec logo dos oversized et cordons contrastés. Facile à enfiler entre deux runs."
  }
}, {
  id: 6,
  name: {
    en: "RAPTOR DAILY DUO",
    fr: "RAPTOR DAILY DUO"
  },
  sub: {
    en: "Steel Tumbler + Phone Case",
    fr: "Gobelet acier + coque téléphone"
  },
  image: "gear/12.png",
  price: "$49",
  badge: {
    en: "ESSENTIAL",
    fr: "ESSENTIAL"
  },
  badgeTone: "bg-emerald-300 text-black",
  imageClass: "scale-[1.18] md:scale-[1.24] group-hover:scale-[1.24] md:group-hover:scale-[1.3]",
  description: {
    en: "Matching carry kit: insulated tumbler and shock-ready phone case with the Raptor mark.",
    fr: "Kit assorti : tumbler isolé et coque résistante aux chocs avec le logo Raptor."
  }
}];
const launchPost = {
  image: "event/Gemini_Generated_Image_34rwdg34rwdg34rw.png",
  dateLabel: {
    en: "01/12/2026",
    fr: "01/12/2026"
  },
  title: {
    en: "Raptor[X] France Invasion: When British Precision Meets Parisian Spirit",
    fr: "L'Invasion Française de Raptor[X] : Quand la Précision Britannique Rencontre l'Esprit Parisien"
  },
  excerpt: {
    en: "From London streets to Parisian boulevards, Raptor[X] launches its titanium skateboard revolution across France. Discover the cultural fusion, technological innovation, and community-driven rollout that bridges UK engineering with French street culture. A groundbreaking partnership between British innovation and French skate heritage.",
    fr: "Des rues londoniennes aux boulevards parisiens, Raptor[X] lance sa révolution du skateboard en titane à travers la France. Découvrez la fusion culturelle, l'innovation technologique et le déploiement communautaire qui relie l'ingénierie britannique à la culture street française. Un partenariat révolutionnaire entre l'innovation britannique et l'héritage skate français."
  },
  tags: {
    en: ["UK Skate Culture", "France Launch 2026", "Titanium Technology", "Streetwear Partnerships", "Community First", "Cross-Cultural Fusion"],
    fr: ["Culture Skate UK", "Lancement France 2026", "Technologie Titane", "Partenariats Streetwear", "Communauté d'Abord", "Fusion Interculturelle"]
  },
  sections: {
    en: [{
      h: "A Cultural Bridge: UK Precision Meets French Passion",
      p: "In the heart of Paris, where the Seine River mirrors the architectural grandeur of centuries-old bridges, Raptor[X] creates its own cultural crossing. What emerges when meticulous British engineering dances with the artistic rebellion of French street culture? A revolutionary movement that transcends national boundaries and unites skateboarders under a single titanium banner. Our titanium decks become more than equipment—they transform into cultural ambassadors, forged in UK workshops yet soul-crafted for Parisian skate parks. This isn't just a product launch; it's a cultural renaissance where precision engineering meets passionate expression, creating skateboards that honor both the technical mastery of British craftsmanship and the creative freedom of French artistic spirit.",
      image: "event/Gemini_Generated_Image_o8k0rdo8k0rdo8k0.png"
    }, {
      h: "Titanium Revolution: Engineering Excellence Redefined",
      p: "Raptor[X] titanium skateboards represent the absolute pinnacle of street skate technology, pushing the boundaries of what's possible in board design. Aerospace-grade titanium delivers an unprecedented strength-to-weight ratio that defies conventional skateboard materials, offering durability that rivals steel while maintaining the lightweight agility essential for technical street skating. Advanced sensor integration provides real-time performance tracking, capturing data on board flex, landing impact, and slide efficiency to help riders optimize their technique. The ergonomic grip design, precision-engineered through extensive rider testing, reduces hand fatigue during extended sessions while maintaining the tactile feedback crucial for trick execution. Ceramic hybrid bearings, precision-machined to microscopic tolerances, deliver lightning-fast acceleration and smooth, predictable performance across diverse street surfaces.",
      image: "event/Gemini_Generated_Image_34rwdg34rwdg34rw.png"
    }, {
      h: "Strategic Rollout: Building Lasting Community Connections",
      p: "Our France invasion unfolds through a meticulously calculated expansion strategy that prioritizes authentic community engagement over mass-market saturation. Paris takes center stage on January 26th with the iconic Place de la République launch event, establishing the foundation for what becomes a nationwide movement. The rollout extends systematically through France's most vibrant skate hubs: Lyon brings southern European warmth to the equation, Marseille adds Mediterranean energy, Bordeaux contributes southwest sophistication, Lille offers northern European edge, Toulouse blends academic culture with street innovation, Nantes provides coastal creativity, Strasbourg delivers cross-border cultural fusion, and Montpellier completes the southern arc with youthful dynamism. Each city receives dedicated demonstration events, collaborative partnerships with local skate communities, and authentic engagement opportunities that build genuine, lasting connections with regional skate scenes."
    }, {
      h: "Digital Partnership Ecosystem: Data-Driven Collaborations",
      p: "Raptor[X] France leverages an unprecedented digital partnership ecosystem that combines authentic street credibility with measurable social media influence. Republique Skate Shop (Paris) commands 45K+ Instagram followers through consistently authentic street photography and community-focused content creation. Bercy Board Lab (Paris) engages 32K TikTok followers with technical demonstration videos, bearing maintenance tutorials, and behind-the-scenes manufacturing insights. Lyon Street Lines builds community across 28K followers through multi-platform storytelling that captures the essence of French skate culture. Marais Streetwear Studio (Paris) reaches 52K fashion-forward enthusiasts with carefully curated content that blends skate aesthetics with contemporary fashion trends. Canal Street Goods (Paris) maintains 41K highly engaged followers through urban lifestyle storytelling that resonates with the skate-adjacent demographic. Each partnership represents a strategic alliance between Raptor[X]'s technological innovation and France's influential digital skate voices."
    }, {
      h: "Timeline Breakdown: 6 Days of Cultural Fusion",
      p: "The Raptor[X] France Tour unfolds across six transformative days, each carefully designed to bridge UK skate heritage with French street innovation. January 26: Place de la République erupts with a community jam featuring live music, UK team meet-and-greets, and the official titanium deck reveal. January 28: Bercy Skatepark transforms into a technical laboratory showcasing sensor technology through indoor wheel testing sessions and performance optimization workshops. January 31: Lyon hosts the southern pilgrimage, bringing legendary French riders together with UK skate pioneers for an unforgettable convergence of skate cultures. Each event becomes more than a product demonstration—it evolves into a cultural exchange that strengthens the global skate community and establishes Raptor[X] as a bridge between skateboarding nations."
    }, {
      h: "The Future: UK-France Skate Alliance",
      p: "Raptor[X] France 2026 transcends the boundaries of a simple product launch, emerging as the foundation of a lasting cultural alliance between skateboarding nations. British engineering precision finds its perfect complement in French creative expression, giving birth to a new chapter in skateboarding history that celebrates both technical mastery and artistic freedom. As we construct bridges between nations united by their passion for skateboarding, Raptor[X] becomes more than a brand—it becomes a movement that honors the timeless pursuit of the perfect ride, the endless exploration of urban landscapes, and the unbreakable bonds of the global skate community. Join us as we redefine what's possible when skate cultures converge, creating a future where every rider, regardless of nationality, shares in the universal language of skateboarding."
    }],
    fr: [{
      h: "Un Pont Culturel : La Précision Britannique Rencontre la Passion Française",
      p: "Au cœur de Paris, où la Seine reflète la grandeur architecturale des ponts centenaires, Raptor[X] crée sa propre traversée culturelle. Que naît-il lorsque l'ingénierie britannique méticuleuse danse avec la rébellion artistique de la culture street française ? Un mouvement révolutionnaire qui transcende les frontières nationales et unit les skateboarders sous une seule bannière en titane. Nos decks en titane deviennent plus que des équipements — ils se transforment en ambassadeurs culturels, forgés dans les ateliers britanniques mais conçus pour l'âme des skateparks parisiens. Ce n'est pas seulement un lancement de produit ; c'est une renaissance culturelle où la précision technique rencontre l'expression passionnée, créant des skateboards qui honorent à la fois la maîtrise technique de l'artisanat britannique et la liberté créative de l'esprit artistique français.",
      image: "event/Gemini_Generated_Image_o8k0rdo8k0rdo8k0.png"
    }, {
      h: "Révolution Titane : L'Excellence Technique Redéfinie",
      p: "Les skateboards Raptor[X] en titane représentent le summum absolu de la technologie street skate, repoussant les limites de ce qui est possible dans la conception de planches. Le titane de qualité aéronautique offre un rapport résistance-poids sans précédent qui défie les matériaux conventionnels de skateboard, offrant une durabilité rivale de l'acier tout en maintenant l'agilité légère essentielle pour le skate de rue technique. L'intégration avancée de capteurs fournit un suivi des performances en temps réel, capturant des données sur la flexion de la planche, l'impact à l'atterrissage et l'efficacité de glisse pour aider les riders à optimiser leur technique. La conception ergonomique de la poignée, ingénieurisée avec précision grâce à des tests extensifs de riders, réduit la fatigue des mains pendant les sessions prolongées tout en maintenant le retour tactile crucial pour l'exécution de figures. Les roulements hybrides céramiques, usinés avec précision à des tolérances microscopiques, offrent une accélération fulgurante et des performances lisses, prévisibles sur diverses surfaces de rue.",
      image: "event/Gemini_Generated_Image_34rwdg34rwdg34rw.png"
    }, {
      h: "Déploiement Stratégique : Construire des Connexions Communautaires Durables",
      p: "Notre invasion française se déroule à travers une stratégie d'expansion méticuleusement calculée qui priorise l'engagement communautaire authentique sur la saturation du marché de masse. Paris prend le devant de la scène le 26 janvier avec l'événement de lancement iconique Place de la République, établissant les fondations de ce qui devient un mouvement national. Le déploiement s'étend systématiquement à travers les hubs de skate les plus dynamiques de France : Lyon apporte la chaleur d'Europe du Sud à l'équation, Marseille ajoute l'énergie méditerranéenne, Bordeaux contribue à la sophistication du sud-ouest, Lille offre le tranchant d'Europe du Nord, Toulouse mélange la culture académique avec l'innovation de rue, Nantes apporte la créativité côtière, Strasbourg offre la fusion culturelle transfrontalière, et Montpellier complète l'arc méridional avec le dynamisme juvénile. Chaque ville reçoit des événements de démonstration dédiés, des partenariats collaboratifs avec les communautés de skate locales, et des opportunités d'engagement authentiques qui construisent des connexions véritables et durables avec les scènes régionales de skate."
    }, {
      h: "Écosystème de Partenariats Numériques : Collaborations Axées sur les Données",
      p: "Raptor[X] France exploite un écosystème de partenariats numériques sans précédent qui combine la crédibilité street authentique avec l'influence mesurable des médias sociaux. Republique Skate Shop (Paris) commande plus de 45K followers Instagram grâce à une photographie de rue constamment authentique et une création de contenu axée sur la communauté. Bercy Board Lab (Paris) engage 32K followers TikTok avec des vidéos de démonstration technique, des tutoriels de maintenance de roulements et des insights derrière les scènes de fabrication. Lyon Street Lines construit une communauté à travers 28K followers grâce à un storytelling multiplateforme qui capture l'essence de la culture skate française. Marais Streetwear Studio (Paris) atteint 52K passionnés fashion-forward avec un contenu soigneusement curaté qui mélange les esthétiques skate avec les tendances de mode contemporaines. Canal Street Goods (Paris) maintient 41K followers hautement engagés grâce à un storytelling de style de vie urbain qui résonne avec le public skate-adjacent. Chaque partenariat représente une alliance stratégique entre l'innovation technologique de Raptor[X] et les voix numériques influentes du skate français."
    }, {
      h: "Calendrier Détaillé : 6 Jours de Fusion Culturelle",
      p: "La tournée Raptor[X] France se déroule sur six jours transformatifs, chacun soigneusement conçu pour relier l'héritage skate britannique à l'innovation street française. 26 janvier : Place de la République éclate avec un jam communautaire featuring musique live, rencontres avec l'équipe UK, et la révélation officielle des decks en titane. 28 janvier : Bercy Skatepark se transforme en laboratoire technique présentant la technologie des capteurs à travers des sessions de test de roues en intérieur et des ateliers d'optimisation des performances. 31 janvier : Lyon accueille le pèlerinage du sud, réunissant des riders français légendaires avec des pionniers du skate britannique pour une convergence inoubliable des cultures skate. Chaque événement devient plus qu'une démonstration de produit — il évolue vers un échange culturel qui renforce la communauté skate mondiale et établit Raptor[X] comme un pont entre les nations du skateboard."
    }, {
      h: "L'Avenir : L'Alliance Skate UK-France",
      p: "Raptor[X] France 2026 transcende les limites d'un simple lancement de produit, émergeant comme la fondation d'une alliance culturelle durable entre les nations du skateboard. La précision de l'ingénierie britannique trouve son complément parfait dans l'expression créative française, donnant naissance à un nouveau chapitre dans l'histoire du skateboard qui célèbre à la fois la maîtrise technique et la liberté artistique. Alors que nous construisons des ponts entre des nations unies par leur passion pour le skateboard, Raptor[X] devient plus qu'une marque — elle devient un mouvement qui honore la quête intemporelle de la glisse parfaite, l'exploration sans fin des paysages urbains, et les liens indestructibles de la communauté skate mondiale. Rejoignez-nous alors que nous redéfinissons ce qui est possible lorsque les cultures skate convergent, créant un avenir où chaque rider, quelle que soit sa nationalité, partage le langage universel du skateboard."
    }]
  },
  timeline: {
    title: {
      en: "France Tour Timeline",
      fr: "Calendrier de la Tournée France"
    },
    events: [{
      date: "26 JAN",
      city: "Paris",
      venue: "Place de la République",
      desc: {
        en: "Check-in: Place de la Republique",
        fr: "Accueil: Place de la Republique"
      }
    }, {
      date: "27 JAN",
      city: "Paris",
      venue: "Bercy Skatepark",
      desc: {
        en: "Tech Lab: Setup Clinic",
        fr: "Tech Lab: Clinique Setup"
      }
    }, {
      date: "28 JAN",
      city: "Paris",
      venue: "Palais de Tokyo Plaza",
      desc: {
        en: "Street Art Collab",
        fr: "Street Art Collab"
      }
    }, {
      date: "29 JAN",
      city: "Paris",
      venue: "Le Marais Pop-up",
      desc: {
        en: "Gear Lab Custom Bar",
        fr: "Gear Lab Custom Bar"
      }
    }, {
      date: "30 JAN",
      city: "Paris",
      venue: "Canal Saint-Martin",
      desc: {
        en: "Community Cruise",
        fr: "Community Cruise"
      }
    }, {
      date: "31 JAN",
      city: "Lyon",
      venue: "Hôtel de Ville Lyon",
      desc: {
        en: "Finals & Awards",
        fr: "Finales & Awards"
      }
    }]
  }
};

// --- APP ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lang, setLang] = useState('en');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [registerStatus, setRegisterStatus] = useState({
    state: "idle",
    message: ""
  });
  const [isRegisterSending, setIsRegisterSending] = useState(false);
  const t = translations[lang];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
  }, [lang]);
  useEffect(() => {
    const updateLayout = () => setIsMobileView(window.innerWidth <= 768);
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [showSuccess]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [isAnimating]);
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 1) % products.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev - 1 + products.length) % products.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'fr' : 'en');
  };
  const getLocalized = value => {
    if (typeof value === "string") return value;
    return value?.[lang] || value?.en || "";
  };
  const resolveApiBase = () => {
    if (typeof window === "undefined") return "";
    const metaBase = document.querySelector('meta[name="raptor-api-base"]')?.getAttribute("content");
    if (metaBase && metaBase.trim()) return metaBase.trim();
    const origin = window.location.origin;
    if (origin === "null") return "http://localhost:8787";
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") return origin;
    return `https://api.${hostname}`;
  };
  const handleRegisterSubmit = async event => {
    event.preventDefault();
    if (isRegisterSending) return;
    setIsRegisterSending(true);
    setRegisterStatus({
      state: "sending",
      message: t.register.sending
    });
    const formData = new FormData(event.currentTarget);
    const formPayload = {};
    Object.keys(GOOGLE_FORM_FIELDS).forEach(key => {
      const values = formData.getAll(key).filter(Boolean);
      if (!values.length) return;
      formPayload[key] = values.length === 1 ? values[0] : values;
    });
    const googleData = new FormData();
    Object.entries(GOOGLE_FORM_FIELDS).forEach(([key, entryId]) => {
      if (!entryId) return;
      const values = formData.getAll(key);
      values.forEach(value => {
        if (value) googleData.append(entryId, value);
      });
    });
    try {
      const apiBase = resolveApiBase();
      const response = await fetch(`${apiBase}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          form: formPayload,
          fields: GOOGLE_FORM_FIELDS,
          googleFormActionUrl: GOOGLE_FORM_ACTION_URL,
          lang
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || t.register.error);
      }
      let message = t.register.success;
      if (data.emailStatus === "sent") message = t.register.successEmail;
      if (data.emailStatus === "skipped") message = t.register.successSaved;
      setRegisterStatus({
        state: "success",
        message
      });
      setShowSuccess(true);
      event.currentTarget.reset();
    } catch (error) {
      if (GOOGLE_FORM_READY) {
        try {
          await fetch(GOOGLE_FORM_ACTION_URL, {
            method: "POST",
            mode: "no-cors",
            body: googleData
          });
          setRegisterStatus({
            state: "success",
            message: t.register.successSaved
          });
          setShowSuccess(true);
          event.currentTarget.reset();
        } catch (fallbackError) {
          setRegisterStatus({
            state: "error",
            message: t.register.error
          });
        }
      } else {
        setRegisterStatus({
          state: "error",
          message: error?.message || t.register.error
        });
      }
    } finally {
      setIsRegisterSending(false);
    }
  };
  const activeProduct = products[activeIndex];
  const fallbackTheme = {
    accent: "#111111",
    textClass: "text-black drop-shadow-lg"
  };
  const activeTheme = activeProduct.theme || fallbackTheme;
  const activeBadge = getLocalized(activeProduct.badge);
  const activeSub = getLocalized(activeProduct.sub);
  const activeBadgeStyle = activeProduct.badgeStyle || {
    backgroundColor: activeTheme.accent,
    color: "white",
    boxShadow: `0 0 20px ${activeTheme.accent}40`
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `font-sans text-neutral-900 bg-white overflow-x-hidden selection:bg-black selection:text-white ${isMobileView ? 'mobile-layout' : 'desktop-layout'}`
  }, /*#__PURE__*/React.createElement(CustomCursor, null), /*#__PURE__*/React.createElement("div", {
    className: "noise-overlay"
  }), /*#__PURE__*/React.createElement("nav", {
    className: `fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-4 border-b border-gray-200' : 'bg-transparent py-6'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 group cursor-pointer nav-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-center transition-all duration-300 transform group-hover:rotate-12 ${scrolled ? 'text-neutral-800' : 'text-white'}`
  }, /*#__PURE__*/React.createElement(SkateboardIcon, {
    size: 32,
    strokeWidth: 2,
    className: "transform -rotate-12 group-hover:rotate-0 transition-transform duration-300"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline text-4xl sm:text-5xl md:text-6xl tracking-wide leading-none transition-colors duration-300 font-graffiti brand-3d"
  }, "SCATERS")), /*#__PURE__*/React.createElement("div", {
    className: `hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-neutral-600' : 'text-gray-300'}`
  }, /*#__PURE__*/React.createElement("a", {
    href: "#products",
    className: `hover:text-black transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full ${scrolled ? 'hover:text-black after:bg-black' : 'hover:text-white after:bg-white'}`
  }, t.nav.product), /*#__PURE__*/React.createElement("a", {
    href: "#gear",
    className: `hover:text-black transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full ${scrolled ? 'hover:text-black after:bg-black' : 'hover:text-white after:bg-white'}`
  }, t.nav.gear), /*#__PURE__*/React.createElement("a", {
    href: "#blog",
    className: `hover:text-black transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full ${scrolled ? 'hover:text-black after:bg-black' : 'hover:text-white after:bg-white'}`
  }, t.nav.blog), /*#__PURE__*/React.createElement("a", {
    href: "#schedule",
    className: `hover:text-black transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full ${scrolled ? 'hover:text-black after:bg-black' : 'hover:text-white after:bg-white'}`
  }, t.nav.schedule), /*#__PURE__*/React.createElement("a", {
    href: "#register",
    className: `px-6 py-2 border transition-all hover:bg-white hover:text-black ${scrolled ? 'border-black text-black' : 'border-white text-white'}`
  }, t.nav.register), /*#__PURE__*/React.createElement("button", {
    onClick: toggleLang,
    className: `flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${scrolled ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'}`
  }, /*#__PURE__*/React.createElement(Globe, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, lang.toUpperCase()))), /*#__PURE__*/React.createElement("button", {
    className: `md:hidden p-2 ${scrolled ? 'text-black' : 'text-white'}`,
    onClick: () => setIsMenuOpen(!isMenuOpen)
  }, isMenuOpen ? /*#__PURE__*/React.createElement(X, {
    size: 32
  }) : /*#__PURE__*/React.createElement(Menu, {
    size: 32
  }))), isMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-full left-0 w-full bg-white shadow-2xl p-8 flex flex-col gap-6 md:hidden animate-fade-in-down border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#products",
    className: "text-3xl font-black uppercase text-neutral-800 font-graffiti",
    onClick: () => setIsMenuOpen(false)
  }, t.nav.product), /*#__PURE__*/React.createElement("a", {
    href: "#gear",
    className: "text-3xl font-black uppercase text-neutral-800 font-graffiti",
    onClick: () => setIsMenuOpen(false)
  }, t.nav.gear), /*#__PURE__*/React.createElement("a", {
    href: "#blog",
    className: "text-3xl font-black uppercase text-neutral-800 font-graffiti",
    onClick: () => setIsMenuOpen(false)
  }, t.nav.blog), /*#__PURE__*/React.createElement("a", {
    href: "#schedule",
    className: "text-3xl font-black uppercase text-neutral-800 font-graffiti",
    onClick: () => setIsMenuOpen(false)
  }, t.nav.schedule), /*#__PURE__*/React.createElement("a", {
    href: "#register",
    className: "text-3xl font-black uppercase text-neutral-800 font-graffiti",
    onClick: () => setIsMenuOpen(false)
  }, t.nav.register), /*#__PURE__*/React.createElement("button", {
    onClick: toggleLang,
    className: "flex items-center gap-2 text-xl font-bold uppercase mt-4"
  }, /*#__PURE__*/React.createElement(Globe, {
    size: 20
  }), " ", lang === 'en' ? t.langSwitch.toFrench : t.langSwitch.toEnglish))), /*#__PURE__*/React.createElement("header", {
    className: "relative w-full min-h-[100svh] md:h-screen overflow-hidden bg-black flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 w-full h-full z-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://janeportforlio.my.canva.site/ljmu/_assets/media/ec46a9ab0a64ca9b7e665d37f2805c10.jpg",
    alt: t.hero.alt,
    className: "w-full h-full object-contain opacity-60 animate-slow-zoom hero-image",
    loading: "eager",
    decoding: "async",
    fetchpriority: "high"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-50"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-1/3 right-1/3 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-700 opacity-50"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center hero-container"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, {
    className: "reveal-no-transform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-6 hero-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-[1px] w-12 bg-white"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-mono text-sm tracking-[0.3em] uppercase"
  }, t.hero.badge)), /*#__PURE__*/React.createElement("div", {
    className: "mb-8 transform -rotate-2"
  }, /*#__PURE__*/React.createElement(GlitchText, {
    text: "RAPTOR",
    className: "text-5xl sm:text-6xl md:text-9xl text-white font-graffiti leading-none"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 text-4xl sm:text-5xl md:text-8xl font-graffiti block mt-2"
  }, t.hero.subtext)), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 text-base sm:text-lg md:text-xl max-w-xl font-light leading-relaxed mb-12 border-l-2 border-white pl-6 hero-desc"
  }, t.hero.desc, " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("strong", {
    className: "text-white"
  }, t.hero.boldDesc)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-6 hero-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#register",
    className: "group relative px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-wider overflow-hidden cursor-pointer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 group-hover:text-white transition-colors duration-300 font-graffiti"
  }, t.hero.preOrder), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#products",
    className: "group px-10 py-4 border border-white text-white font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm flex items-center gap-2 cursor-pointer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-graffiti"
  }, t.hero.explore), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 20,
    className: "group-hover:translate-x-1 transition-transform"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
  }, /*#__PURE__*/React.createElement(ChevronDown, {
    size: 24,
    className: "text-white"
  }))), /*#__PURE__*/React.createElement(InfiniteMarquee, {
    text: t.marquee,
    speed: 25,
    className: "bg-yellow-400 text-black border-black"
  }), /*#__PURE__*/React.createElement("section", {
    id: "products",
    className: "py-20 md:py-32 bg-white text-black overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 z-0 opacity-5 pointer-events-none",
    style: {
      backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, {
    className: "reveal-no-transform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-end mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-7xl font-black text-neutral-900 mb-2 uppercase tracking-tighter font-graffiti"
  }, t.collection.title), /*#__PURE__*/React.createElement("p", {
    className: "text-neutral-500 font-graffiti"
  }, t.collection.sub)), /*#__PURE__*/React.createElement("div", {
    className: "h-[1px] w-full md:w-1/2 bg-neutral-200 mb-4 md:mb-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center collection-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-1 space-y-6 order-2 md:order-1 relative z-20 text-center md:text-left collection-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("span", {
    className: `inline-block px-4 py-1 text-xs font-black uppercase tracking-widest mb-4 transition-all duration-500 ease-out transform collection-badge ${isAnimating ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'} ${activeProduct.badgeClass || ''}`,
    style: activeBadgeStyle
  }, activeProduct.badgeTextClass ? /*#__PURE__*/React.createElement("span", {
    className: activeProduct.badgeTextClass
  }, activeBadge) : activeBadge)), /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("h3", {
    className: `text-4xl sm:text-5xl md:text-7xl font-black uppercase italic leading-none transition-all duration-500 delay-100 transform collection-title ${isAnimating ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'} ${activeTheme.textClass}`
  }, activeProduct.name)), /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("p", {
    className: `text-xl font-bold text-white uppercase tracking-widest transition-all duration-500 delay-200 transform collection-subtitle ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`
  }, activeSub)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 pt-8 collection-nav"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev,
    className: "p-3 sm:p-4 border border-gray-200 hover:bg-black hover:text-white transition-colors rounded-full shadow-lg active:scale-95 cursor-pointer"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 24
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleNext,
    className: "p-3 sm:p-4 border border-gray-200 hover:bg-black hover:text-white transition-colors rounded-full shadow-lg active:scale-95 cursor-pointer"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-span-1 md:col-span-2 h-[420px] sm:h-[520px] md:h-[600px] order-1 md:order-2 float-wobble collection-stage"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: event => {
      event.stopPropagation();
      handlePrev();
    },
    className: "collection-switch collection-switch--prev",
    "aria-label": "Previous product"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: event => {
      event.stopPropagation();
      handleNext();
    },
    className: "collection-switch",
    "aria-label": "Next product"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18
  })), /*#__PURE__*/React.createElement(ProductBlueprint, {
    product: activeProduct,
    isAnimating: isAnimating,
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10 border-t border-gray-100 collection-thumbs"
  }, products.map((item, index) => {
    const productSub = getLocalized(item.sub);
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: () => {
        if (index !== activeIndex && !isAnimating) {
          setIsAnimating(true);
          setTimeout(() => {
            setActiveIndex(index);
            setIsAnimating(false);
          }, 700);
        }
      },
      className: `cursor-pointer group text-center transition-all duration-300 ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `h-20 sm:h-24 md:h-28 rounded-xl mb-4 flex items-center justify-center p-4 bg-gray-50 border transition-all duration-300 collection-thumb ${activeIndex === index ? 'border-black shadow-lg bg-white' : 'border-transparent'}`
    }, item.image ? /*#__PURE__*/React.createElement("img", {
      src: item.image,
      className: `w-full h-full object-contain float-wobble ${item.imgClass || ''}`,
      alt: productSub,
      loading: "lazy",
      decoding: "async"
    }) : /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400"
    }, "RAPTOR [X]")), /*#__PURE__*/React.createElement("p", {
      className: `text-[10px] font-bold uppercase tracking-wider collection-thumb-label ${item.theme?.textClass || fallbackTheme.textClass}`
    }, productSub));
  })))), /*#__PURE__*/React.createElement("section", {
    id: "gear",
    className: "py-20 md:py-32 bg-gray-50 text-black overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 z-0 opacity-5 pointer-events-none",
    style: {
      backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-end mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-7xl font-black text-neutral-900 mb-2 uppercase tracking-tighter font-graffiti"
  }, t.gear.title), /*#__PURE__*/React.createElement("p", {
    className: "text-neutral-500 font-graffiti"
  }, t.gear.sub)), /*#__PURE__*/React.createElement("div", {
    className: "h-[1px] w-full md:w-1/2 bg-neutral-200 mb-4 md:mb-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-8 gear-grid"
  }, gear.map(item => {
    const gearName = getLocalized(item.name);
    const gearSub = getLocalized(item.sub);
    const gearDesc = getLocalized(item.description);
    const gearBadge = item.badge ? getLocalized(item.badge) : "";
    return /*#__PURE__*/React.createElement(RevealOnScroll, {
      key: item.id,
      className: "group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative bg-white rounded-2xl shadow-lg transition-all duration-500 overflow-hidden cursor-pointer transform-gpu group-hover:-translate-y-2 group-hover:shadow-2xl"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute -bottom-12 -left-12 w-40 h-40 bg-sky-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    }), gearBadge && /*#__PURE__*/React.createElement("div", {
      className: `absolute left-4 top-4 z-20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-2 ring-white/80 -rotate-6 ${item.badgeTone}`
    }, gearBadge), /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 sm:h-64 md:h-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6 overflow-hidden transition-transform duration-700 ease-out"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_60%)] opacity-80"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-6 rounded-3xl border border-white/70 opacity-60"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-12 rounded-3xl border border-black/10 opacity-70"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-x-10 bottom-6 h-6 bg-black/10 blur-xl rounded-full"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 flex items-center justify-center pointer-events-none"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: "",
      "aria-hidden": "true",
      loading: "lazy",
      decoding: "async",
      className: `w-full h-full object-contain opacity-20 blur-[2px] translate-x-3 translate-y-3 ${item.imageClass || ''}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 flex items-center justify-center pointer-events-none"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: "",
      "aria-hidden": "true",
      loading: "lazy",
      decoding: "async",
      className: `w-full h-full object-contain opacity-10 blur-[6px] translate-x-6 translate-y-6 ${item.imageClass || ''}`
    })), /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: gearName,
      loading: "lazy",
      decoding: "async",
      className: `relative w-full h-full object-contain transform-gpu transition-transform duration-700 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] group-hover:-translate-y-1 ${item.imageClass || ''}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "p-5 sm:p-6 flex flex-col h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-black font-graffiti uppercase tracking-wide mb-1"
    }, gearName), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-sm font-mono"
    }, gearSub))), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-700 text-sm leading-relaxed flex-1"
    }, gearDesc), /*#__PURE__*/React.createElement("div", {
      className: "mt-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full text-center px-4 py-3 rounded-full border border-black text-black font-black uppercase tracking-widest text-xs"
    }, "Coming soon")))));
  })))), /*#__PURE__*/React.createElement(InfiniteMarquee, {
    text: t.marquee2,
    direction: "right",
    speed: 30,
    className: "bg-yellow-400 text-black border-black"
  }), /*#__PURE__*/React.createElement("section", {
    className: "py-24 md:py-40 bg-black relative overflow-hidden flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 opacity-40 perspective-1000"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full animate-rotate-3d-space"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://janeportforlio.my.canva.site/ljmu/_assets/media/18b70166e240a17416c00b7014895828.jpg",
    alt: t.nextLevel.alt,
    className: "w-full h-full object-contain grayscale",
    loading: "lazy",
    decoding: "async"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 relative z-10 text-center"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center justify-center w-20 h-20 border-2 border-white/30 rounded-full mb-8 animate-pulse"
  }, /*#__PURE__*/React.createElement(SkateboardIcon, {
    size: 32,
    className: "text-white"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "150",
    viewBox: "0 0 800 150",
    className: "mx-auto block overflow-visible"
  }, /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: "50%",
    dominantBaseline: "middle",
    textAnchor: "middle",
    className: "font-graffiti text-4xl sm:text-6xl md:text-9xl font-black fill-transparent stroke-white animate-draw-text"
  }, t.nextLevel.title)), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 font-light text-base sm:text-xl tracking-widest uppercase"
  }, t.nextLevel.sub)))), /*#__PURE__*/React.createElement("section", {
    id: "schedule",
    className: "py-20 md:py-32 bg-neutral-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-20"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl font-black text-black mb-4 uppercase tracking-tighter font-graffiti"
  }, t.timeline.title), /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-1 bg-black"
  }))), /*#__PURE__*/React.createElement(RevealOnScroll, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-16"
  }, /*#__PURE__*/React.createElement("img", {
    src: "ng v.jpg",
    alt: t.timeline.imageAlt,
    className: "w-full h-auto object-contain shadow-xl",
    loading: "lazy",
    decoding: "async"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-0 border-t border-l border-gray-300 schedule-grid"
  }, t.schedule.map((day, i) => /*#__PURE__*/React.createElement(RevealOnScroll, {
    key: i,
    delay: i * 150,
    className: "border-r border-b border-gray-300 bg-white hover:bg-neutral-50 transition duration-300 p-6 sm:p-10 h-full group schedule-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "timeline-date text-4xl sm:text-5xl md:text-6xl font-black text-white transition-colors duration-500 font-graffiti",
    style: {
      textShadow: "0 1px 0 #1f2937, 0 2px 0 #1f2937, 0 3px 0 #1f2937, -1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 1px 1px 0 #1f2937"
    }
  }, day.date)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, day.events.map((event, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    className: "relative pl-6 border-l-2 border-gray-200 group-hover:border-black transition-colors duration-500"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold font-mono text-gray-500 mb-1"
  }, event.time), /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-bold text-black"
  }, event.title))))))))), /*#__PURE__*/React.createElement("section", {
    id: "blog",
    className: "py-20 md:py-32 bg-black text-white overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("style", null, `
                                                        :root{
                                                            --rx-bg:#ffffff;
                                                            --rx-card:#ffffff;
                                                            --rx-card2:#ffffff;
                                                            --rx-text:#0b0b0b;
                                                            --rx-muted:#4b5563;
                                                            --rx-line:#000000;
                                                            --rx-accent:#f2c200;
                                                            --rx-accent2:#ffd54a;
                                                            --rx-radius:18px;
                                                        }

                            .rx-wrap{max-width:1200px;margin:0 auto;padding:0 16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;color:var(--rx-text);}
                                                        .rx-shell{background:var(--rx-bg);border-radius:calc(var(--rx-radius) + 6px);border:1px solid var(--rx-line);box-shadow:0 12px 30px rgba(0,0,0,.12);overflow:hidden;font-family:'Sedgwick Ave Display', cursive;color:var(--rx-text)}
                                                        .rx-hero{padding:40px;background:#ffffff;}
                            .rx-hero img{max-width:100%;height:auto;margin:16px 0;border-radius:12px}
                            .rx-kicker{display:inline-flex;gap:10px;align-items:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--rx-accent);font-weight:700}
                            .rx-h1{margin:14px 0 20px;font-size:clamp(44px,8vw,78px);line-height:1.08;font-weight:900;text-align:center}
                            .rx-sub{margin:0 0 18px;font-size:18px;line-height:1.75;color:var(--rx-muted);font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-badges{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
                            .rx-badge{font-size:12px;color:var(--rx-muted);border:1px solid var(--rx-line);padding:6px 10px;border-radius:999px;background:#ffffff;font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-actions{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}
                            .rx-btn{appearance:none;border:1px solid var(--rx-line);background:#ffffff;color:var(--rx-text);padding:10px 14px;border-radius:999px;cursor:pointer;font-weight:700;font-size:14px;display:inline-flex;gap:8px;align-items:center;text-decoration:none;transition:all .12s ease;font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-btn:hover{transform:translateY(-1px);background:#ffffff;border-color:#000000}
                            .rx-btn.primary{background:linear-gradient(90deg, var(--rx-accent), var(--rx-accent2));border-color:rgba(242,194,0,.55);color:#101010}
                            .rx-btn.primary:hover{filter:saturate(1.03) brightness(1.1)}
                            .rx-note{margin-top:12px;color:var(--rx-muted);font-size:12px;line-height:1.55;font-family:'Aptos Display', 'Segoe UI', sans-serif}

                            .rx-body{padding:32px 40px;background:linear-gradient(180deg, rgba(0,0,0,.01), rgba(0,0,0,0));}
                            .rx-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:24px}
                            @media (max-width:960px){.rx-grid{grid-template-columns:1fr}}

                            .rx-box{background:linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.7));border:1px solid var(--rx-line);border-radius:var(--rx-radius);padding:20px}
                            .rx-title{margin:0 0 16px;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:var(--rx-accent);font-weight:900}
                            .rx-prose h2{margin:22px 0 14px;font-size:30px;font-weight:900;color:var(--rx-text)}
                            .rx-prose p{margin:0 0 18px;color:var(--rx-muted);line-height:1.85;font-size:18px;font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-prose strong{color:var(--rx-accent);font-weight:900}

                            .rx-timeline{display:grid;gap:12px}
                            .rx-step{display:grid;grid-template-columns:100px 1fr;gap:14px;align-items:start;border:1px solid var(--rx-line);border-radius:14px;background:#ffffff;padding:14px;transition:all .12s ease}
                            .rx-step:hover{background:#ffffff;border-color:#000000}
                            .rx-date{font-weight:900;font-size:17px;letter-spacing:.05em;color:var(--rx-accent)}
                            .rx-city{font-size:13px;color:var(--rx-muted);margin-top:3px;letter-spacing:.05em}
                            .rx-step h4{margin:0;font-size:21px;color:var(--rx-text);font-weight:800}
                            .rx-step p{margin:6px 0 0;color:var(--rx-muted);font-size:15px;line-height:1.75;font-family:'Aptos Display', 'Segoe UI', sans-serif}

                            .rx-partners{display:grid;gap:12px}
                            .rx-partner{display:flex;justify-content:space-between;gap:14px;align-items:center;border:1px solid var(--rx-line);border-radius:14px;background:#ffffff;padding:14px;transition:all .12s ease}
                            .rx-partner:hover{background:#ffffff;border-color:#000000}
                            .rx-partner b{display:block;font-size:20px;color:var(--rx-text);font-weight:900}
                            .rx-partner span{display:block;font-size:14px;color:var(--rx-muted);margin-top:4px;font-family:'Aptos Display', 'Segoe UI', sans-serif}

                            .rx-faq{display:grid;gap:12px}
                            .rx-qa{border:1px solid var(--rx-line);border-radius:14px;background:#ffffff;overflow:hidden;transition:all .12s ease}
                            .rx-qa:hover{border-color:#000000}
                            .rx-q{width:100%;text-align:left;background:transparent;border:0;color:var(--rx-text);padding:14px;cursor:pointer;font-weight:800;display:flex;justify-content:space-between;gap:12px;font-size:19px;transition:color .12s ease}
                            .rx-q:hover{color:var(--rx-accent)}
                            .rx-a{display:block;padding:0 14px 14px;color:var(--rx-muted);font-size:16px;line-height:1.85;font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-qa.open .rx-a{display:block}
                            .rx-chevron{color:var(--rx-accent);opacity:.95;transition:transform .12s ease}
                            .rx-qa.open .rx-chevron{transform:rotate(180deg)}

                            .rx-footer{padding:18px 40px;border-top:1px solid var(--rx-line);background:#ffffff;text-align:center}
                            .rx-mini{color:var(--rx-muted);font-size:14px;line-height:1.8;font-family:'Aptos Display', 'Segoe UI', sans-serif}
                            .rx-link{color:var(--rx-accent);text-decoration:none;border-bottom:1px solid rgba(242,194,0,.55);transition:all .12s ease}
                            .rx-link:hover{border-bottom-color:var(--rx-accent);color:var(--rx-accent2)}
                            `), /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: `
                                                                <section class="rx-wrap">
                                                                    <article class="rx-shell" aria-label="Scaters RaptorX Unleashed UK Tour 2024">
                                                                        <header class="rx-hero">
                                                                            <div class="rx-kicker">◆ SCATERS • RAPTORX UNLEASHED 2026 ◆</div>
                                                                            <h1 class="rx-h1">RaptorX Unleashed:<br/>Waking Up the UK Streets</h1>
                                                                            <p class="rx-sub">
                                                                                Scaters officially launches the RaptorX series with a 3‑city tour across London, Bristol, and Manchester. Live demos, pro rider meetups, and exclusive gear drops—UK street culture on full blast.
                                                                            </p>
                                                                            <img src="/event/Skater%20at%20Republique%20Paris%202.png" alt="Scaters RaptorX UK tour hero" style="margin: 22px 0; border-radius: 12px; width: 100%; height: auto; object-fit: contain;"/>
                                                                            <div class="rx-badges">
                                                                                <span class="rx-badge">▸ London • Bristol • Manchester</span>
                                                                                <span class="rx-badge">▸ 26–28 JAN 2026</span>
                                                                                <span class="rx-badge">▸ Live Demos</span>
                                                                                <span class="rx-badge">▸ Official Launch</span>
                                                                            </div>
                                                                            <div class="rx-actions">
                                                                                <a class="rx-btn primary" href="#register">✦ RSVP for Updates</a>
                                                                                <a class="rx-btn" href="#products">✦ Explore Decks</a>
                                                                                <a class="rx-btn" href="#gear">✦ Shop Gear</a>
                                                                            </div>
                                                                        </header>

                                                                        <div class="rx-body">
                                                                            <div class="rx-grid">
                                                                                <section class="rx-box rx-prose">
                                                                                    <div class="rx-title">Event Overview</div>
                                                                                    <p>It’s time to shatter the winter silence. This spring, Scaters brings a new storm to the UK—<strong>RaptorX</strong>. The new series is built on crisp pop, a dialed concave, and modern UK‑street‑art inspired graphics. The tour is our way of putting the board under your feet, not just on your screen.</p>

                                                                                    <h2>Scaters RaptorX: Redefining Skate Style</h2>
                                                                                    <p>Crafted with advanced cold‑press tech and graphics lifted from contemporary UK street art, <strong>RaptorX</strong> is born to conquer every terrain—from London stair sets to Manchester bowls.</p>
                                                                                    <img src="event/Skater%20at%20Republique%20Paris.png" alt="RaptorX deck detail shot" style="margin: 16px 0; border-radius: 12px; width: 100%; height: auto; object-fit: cover;"/>
                                                                                    <img src="event/Skater%20at%20Republique%20Paris1.png" alt="Scaters RaptorX street session" style="margin: 16px 0; border-radius: 12px; width: 100%; height: auto; object-fit: cover;"/>

                                                                                    <h2>The Event Schedule: UK Roadshow</h2>
                                                                                    <p>3 Days. 3 Cities. 1 Vibe. The Scaters team and pro riders are rolling in with demos, meetups, and exclusive drops. Pull up early for the best spots.</p>

                                                                                    <div class="rx-timeline" id="rxTimeline">
                                                                                        <div class="rx-step">
                                                                                            <div>
                                                                                                <div class="rx-date">26 JAN</div>
                                                                                                <div class="rx-city">LONDON</div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h4>▸ Southbank Centre Skate Space</h4>
                                                                                                <p>14:00–18:00 • Live demo, try‑it‑out zone, meet & greet with pro riders.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="rx-step">
                                                                                            <div>
                                                                                                <div class="rx-date">27 JAN</div>
                                                                                                <div class="rx-city">BRISTOL</div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h4>▸ Dean Lane Skatepark</h4>
                                                                                                <p>13:00–17:00 • Best Trick contest and street art collab.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="rx-step">
                                                                                            <div>
                                                                                                <div class="rx-date">28 JAN</div>
                                                                                                <div class="rx-city">MANCHESTER</div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h4>▸ Projekts MCR Skatepark</h4>
                                                                                                <p>16:00–20:00 • Skate jam, DJs, and RaptorX giveaway.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <img src="/event/Titanium%20deck.jpg" alt="RaptorX tour community session" style="margin: 16px 0; border-radius: 12px; width: 100%; height: auto; object-fit: contain;"/>

                                                                                    <!-- SECTION: PARTNERS -->
                                                                                    <section>
                                                                                        <h2>Our Partners: Fueling the UK Skate Scene</h2>
                                                                                        <p>
                                                                                            The <strong>Scaters RaptorX Launch UK</strong> is more than just a tour; it's a collaboration with the pillars of our community. We have selected <strong class="text-black">Slam City Skates</strong>, <strong class="text-black">Fifty Fifty Store</strong>, and <strong class="text-black">Black Sheep Store</strong> as our <em>exclusive launch partners</em>.
                                                                                        </p>
                                                                                        <p class="mt-2 text-sm text-gray-500">
                                                                                            These legendary <strong>UK skate shops</strong> don't just sell gear; they keep the culture alive. By partnering with them, we ensure that the RaptorX launch supports the local ecosystem directly.
                                                                                        </p>
                                                                                        <ul class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold text-center mt-6">
                                                                                            <li class="bg-gray-100 p-4 rounded hover:bg-gray-200 cursor-pointer transition border-b-4 border-transparent hover:border-black">
                                                                                                <span class="block text-lg font-bold text-gray-900">Slam City Skates</span>
                                                                                                <span class="text-xs font-normal text-gray-500 uppercase tracking-wide">London • Official Partner</span>
                                                                                            </li>
                                                                                            <li class="bg-gray-100 p-4 rounded hover:bg-gray-200 cursor-pointer transition border-b-4 border-transparent hover:border-indigo-600">
                                                                                                <span class="block text-lg font-bold text-gray-900">Fifty Fifty Store</span>
                                                                                                <span class="text-xs font-normal text-gray-500 uppercase tracking-wide">Bristol • Official Partner</span>
                                                                                            </li>
                                                                                            <li class="bg-gray-100 p-4 rounded hover:bg-gray-200 cursor-pointer transition border-b-4 border-transparent hover:border-yellow-500">
                                                                                                <span class="block text-lg font-bold text-gray-900">Black Sheep Store</span>
                                                                                                <span class="text-xs font-normal text-gray-500 uppercase tracking-wide">Manchester • Official Partner</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </section>

                                                                                    <hr class="my-8 border-gray-200">

                                                                                    <!-- SECTION: CALL TO ACTION -->
                                                                                    <section class="text-center py-10 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-inner border border-red-100">
                                                                                        <span class="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-100 rounded-full">Coming Soon</span>
                                                                                        <h2 class="mt-0 text-3xl font-black text-gray-900">How to Secure Your RaptorX?</h2>
                                                                                        
                                                                                        <p class="mb-4 text-lg">
                                                                                            The countdown has begun. The <strong>Scaters RaptorX series</strong> officially drops nationwide on <strong>26th Jan 2026</strong>.
                                                                                        </p>
                                                                                        <p class="mb-8 text-gray-600 max-w-xl mx-auto">
                                                                                            Don't wait for a shipping confirmation. Be the first to feel the concave and pop by visiting our <strong>authorized local dealers</strong> on launch day.
                                                                                        </p>
                                                                                        
                                                                                        <div class="bg-white border-l-4 border-yellow-400 p-4 rounded shadow-sm mb-8 text-left max-w-2xl mx-auto">
                                                                                            <p class="text-sm text-gray-700 m-0">
                                                                                                <strong>🚫 Online Sales Policy:</strong> To support the core scene, Scaters will <u>not</u> be selling the RaptorX directly online at launch. Please visit your local skate shop to pre-order or purchase.
                                                                                            </p>
                                                                                        </div>
                                                                                        
                                                                                        <div>
                                                                                            <a href="/store-locator" class="inline-flex items-center bg-black text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-gray-800 hover:scale-105 transition transform duration-200 uppercase tracking-widest group">
                                                                                                <span>Find Launch Locations</span>
                                                                                                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                                                            </a>
                                                                                        </div>
                                                                                    </section>
                                                                                </section>

                                                                                <aside class="rx-box">
                                                                                    <div class="rx-title">Event Essentials</div>

                                                                                    <div class="rx-partners">
                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>Dates</b>
                                                                                                <span>26–28 January 2026</span>
                                                                                            </div>
                                                                                            <a class="rx-btn" href="#schedule" style="font-size:12px">Schedule</a>
                                                                                        </div>

                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>Cities</b>
                                                                                                <span>London • Bristol • Manchester</span>
                                                                                            </div>
                                                                                            <a class="rx-btn" href="#products" style="font-size:12px">Decks</a>
                                                                                        </div>

                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>Partners</b>
                                                                                                <span>Slam City • Fifty Fifty • Black Sheep</span>
                                                                                            </div>
                                                                                            <a class="rx-btn" href="#gear" style="font-size:12px">Gear</a>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div style="height:16px;"></div>
                                                                                    <div class="rx-title">Social Tags</div>

                                                                                    <div class="rx-partners">
                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>#ScatersRaptorX</b>
                                                                                                <span>Tag your clips from the tour.</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>#RaptorXUKTour</b>
                                                                                                <span>City highlights and drops.</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="rx-partner">
                                                                                            <div>
                                                                                                <b>#SkateUK</b>
                                                                                                <span>UK scene shout‑outs.</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div style="height:16px;"></div>
                                                                                    <div class="rx-title">Event Locations</div>

                                                                                    <div class="rx-partners">
                                                                                        <div class="rx-partner" style="flex-direction: column; align-items: stretch;">
                                                                                            <div>
                                                                                                <b>Southbank Centre Skate Space</b>
                                                                                                <span>London • Belvedere Rd, SE1 8XX</span>
                                                                                            </div>
                                                                                            <iframe
                                                                                                title="Southbank Centre Skate Space"
                                                                                                src="https://www.google.com/maps?q=Southbank%20Centre%20Skate%20Space%20Belvedere%20Rd%20SE1%208XX&output=embed"
                                                                                                style="margin-top: 10px; width: 100%; height: 180px; border: 0; border-radius: 12px;"
                                                                                                loading="lazy"
                                                                                                referrerpolicy="no-referrer-when-downgrade"
                                                                                            ></iframe>
                                                                                        </div>
                                                                                        <div class="rx-partner" style="flex-direction: column; align-items: stretch;">
                                                                                            <div>
                                                                                                <b>Dean Lane Skatepark</b>
                                                                                                <span>Bristol • The Deaner</span>
                                                                                            </div>
                                                                                            <iframe
                                                                                                title="Dean Lane Skatepark"
                                                                                                src="https://www.google.com/maps?q=Dean%20Lane%20Skatepark%20Bristol&output=embed"
                                                                                                style="margin-top: 10px; width: 100%; height: 180px; border: 0; border-radius: 12px;"
                                                                                                loading="lazy"
                                                                                                referrerpolicy="no-referrer-when-downgrade"
                                                                                            ></iframe>
                                                                                        </div>
                                                                                        <div class="rx-partner" style="flex-direction: column; align-items: stretch;">
                                                                                            <div>
                                                                                                <b>Projekts MCR Skatepark</b>
                                                                                                <span>Manchester • Indoor park</span>
                                                                                            </div>
                                                                                            <iframe
                                                                                                title="Projekts MCR Skatepark"
                                                                                                src="https://www.google.com/maps?q=Projekts%20MCR%20Skatepark%20Manchester&output=embed"
                                                                                                style="margin-top: 10px; width: 100%; height: 180px; border: 0; border-radius: 12px;"
                                                                                                loading="lazy"
                                                                                                referrerpolicy="no-referrer-when-downgrade"
                                                                                            ></iframe>
                                                                                        </div>
                                                                                    </div>
                                                                                </aside>
                                                                            </div>
                                                                        </div>

                                                                        <footer class="rx-footer">
                                                                            <div class="rx-mini">
                                                                                Ready to pull up? Follow the tour, share your clips, and find a local dealer for the RaptorX series.
                                                                            </div>
                                                                        </footer>
                                                                    </article>
                                                                </section>
                                                                `
    }
  }), /*#__PURE__*/React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
                                                                (function(){
                                                                    // FAQ toggle
                                                                    const faqContainer = document.getElementById('rxFaq');
                                                                    if (faqContainer) {
                                                                        faqContainer.addEventListener('click', (e) => {
                                                                            const btn = e.target.closest('.rx-q');
                                                                            if (!btn) return;
                                                                            const qa = btn.closest('.rx-qa');
                                                                            if (!qa) return;
                                                                            qa.classList.toggle('open');
                                                                        });
                                                                    }

                                                                    // Add to calendar .ics
                                                                    const calBtn = document.getElementById('rxAddToCalendar');
                                                                    if (calBtn) {
                                                                        calBtn.addEventListener('click', () => {
                                                                            const ics = [
                                                                                'BEGIN:VCALENDAR',
                                                                                'VERSION:2.0',
                                                                                'PRODID:-//RAPTORX//FranceInvasion//EN',
                                                                                'CALSCALE:GREGORIAN',
                                                                                'METHOD:PUBLISH',
                                                                                'BEGIN:VEVENT',
                                                                                'UID:raptorx-france-invasion-2026@raptorx',
                                                                                'DTSTAMP:20260101T000000Z',
                                                                                'SUMMARY:RAPTOR[X] FRANCE INVASION (Paris → Lyon)',
                                                                                'DESCRIPTION:Official tour: 26–31 JAN. Sessions, setup clinics, street art, pop-up streetwear, community rides.',
                                                                                'LOCATION:Paris & Lyon, France',
                                                                                'DTSTART:20260126T070000Z',
                                                                                'DTEND:20260131T180000Z',
                                                                                'END:VEVENT',
                                                                                'END:VCALENDAR'
                                                                            ].join('\\r\\n');

                                                                            const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
                                                                            const url = URL.createObjectURL(blob);
                                                                            const link = document.createElement('a');
                                                                            link.href = url;
                                                                            link.download = 'RAPTORX_France_Invasion.ics';
                                                                            document.body.appendChild(link);
                                                                            link.click();
                                                                            link.remove();
                                                                            setTimeout(() => URL.revokeObjectURL(url), 100);

                                                                            // GA4 tracking (if gtag available)
                                                                            if (typeof gtag !== 'undefined') {
                                                                                gtag('event', 'add_to_calendar', {
                                                                                    event_category: 'engagement',
                                                                                    event_label: 'RAPTORX_France_Invasion'
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                })();
                                                                `
    }
  }))), /*#__PURE__*/React.createElement("section", {
    id: "register",
    className: "relative py-20 md:py-32 bg-black text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-50 register-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center"
  }, /*#__PURE__*/React.createElement(RevealOnScroll, null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none font-graffiti"
  }, t.register.title, " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, t.register.sub)), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 mb-12 max-w-lg mx-auto text-lg"
  }, t.register.desc), /*#__PURE__*/React.createElement("form", {
    className: "w-full max-w-3xl mx-auto space-y-6 register-form",
    onSubmit: handleRegisterSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold uppercase tracking-[0.3em] text-yellow-400"
  }, t.registerSurvey.title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-sm mt-2"
  }, t.registerSurvey.desc)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase tracking-widest text-gray-500"
  }, t.registerSurvey.note)), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-6"
  }, registerSurvey[lang].map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "text-sm font-bold text-white"
  }, item.question), item.type === "single" || item.type === "multi" ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, item.options.map((option, optionIndex) => {
    const inputType = item.type === "multi" ? "checkbox" : "radio";
    const inputName = item.name;
    const inputId = `${inputName}-${optionIndex}`;
    const optionLabel = typeof option === "string" ? option : option.label;
    const optionValue = typeof option === "string" ? option : option.value;
    return /*#__PURE__*/React.createElement("label", {
      key: inputId,
      htmlFor: inputId,
      className: "cursor-pointer register-option-label"
    }, /*#__PURE__*/React.createElement("input", {
      id: inputId,
      type: inputType,
      name: inputName,
      value: optionValue,
      required: item.required && inputType === "radio" && optionIndex === 0,
      className: "peer sr-only"
    }), /*#__PURE__*/React.createElement("span", {
      className: "inline-flex items-center px-3 py-2 rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-wide text-gray-300 transition hover:border-white/60 peer-checked:bg-yellow-400 peer-checked:border-yellow-400 peer-checked:text-black register-option"
    }, optionLabel));
  })) : item.type === "textarea" ? /*#__PURE__*/React.createElement("textarea", {
    name: item.name,
    placeholder: item.placeholder || "",
    rows: 3,
    required: item.required,
    className: "w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
  }) : /*#__PURE__*/React.createElement("input", {
    type: item.type || "text",
    name: item.name,
    placeholder: item.placeholder || "",
    required: item.required,
    className: "w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none"
  }))))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isRegisterSending,
    className: `w-full px-10 py-4 font-black text-xl uppercase tracking-widest transition-colors font-graffiti ${isRegisterSending ? 'bg-yellow-300/70 text-black/70 cursor-not-allowed' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`
  }, isRegisterSending ? t.register.sending : t.register.button), registerStatus.state !== "idle" && /*#__PURE__*/React.createElement("p", {
    className: `text-sm text-center ${registerStatus.state === "error" ? 'text-red-400' : registerStatus.state === "success" ? 'text-emerald-300' : 'text-yellow-300'}`
  }, registerStatus.message))))), showSuccess && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[9999] flex items-center justify-center px-6",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
    onClick: () => setShowSuccess(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "success-orbit"
  }), /*#__PURE__*/React.createElement("div", {
    className: "success-pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-pop-inner font-graffiti"
  }, t.register.success), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowSuccess(false),
    className: "mt-4 mx-auto flex items-center justify-center px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-black bg-yellow-400 rounded-full shadow-[0_12px_30px_rgba(255,214,0,0.35)] hover:bg-yellow-300 transition-colors"
  }, t.ui.close)))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-black text-neutral-500 py-16 border-t border-neutral-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-start gap-12 footer-layout"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4 text-white"
  }, /*#__PURE__*/React.createElement(SkateboardIcon, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-black uppercase italic font-graffiti"
  }, "Raptor[X]")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs max-w-xs leading-relaxed"
  }, t.footer.design, " ", /*#__PURE__*/React.createElement("br", null), t.footer.rights)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-16 text-xs uppercase tracking-widest font-bold footer-links"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#products",
    className: "hover:text-white transition"
  }, t.nav.product), /*#__PURE__*/React.createElement("a", {
    href: "#gear",
    className: "hover:text-white transition"
  }, t.nav.gear), /*#__PURE__*/React.createElement("a", {
    href: "#blog",
    className: "hover:text-white transition"
  }, t.nav.blog), /*#__PURE__*/React.createElement("a", {
    href: "#schedule",
    className: "hover:text-white transition"
  }, t.nav.schedule), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition"
  }, t.footer.support)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition"
  }, t.footer.instagram), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition"
  }, t.footer.twitter), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition"
  }, t.footer.facebook)))))), /*#__PURE__*/React.createElement(ChatbotWidget, {
    lang: lang
  }));
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    console.error('App render error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        className: "min-h-screen bg-black text-white flex items-center justify-center px-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "max-w-md text-center"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "text-3xl font-black font-graffiti uppercase mb-4"
      }, "Raptor[X]"), /*#__PURE__*/React.createElement("p", {
        className: "text-gray-400 text-sm"
      }, "The page is temporarily unavailable. Please refresh or try again in a moment.")));
    }
    return this.props.children;
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));
