/* Aya Saouli Portfolio — English / Arabic translations */

(() => {
  "use strict";

  const translations = {
    en: {
      "skip to content": "Skip to content",
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      certificates: "Certificates",
      contact: "Contact",
      hello_im: "Hello — I'm",
      hero_desc: "I build modern web and mobile applications with performance, accessibility and clean user experiences in mind.",
      "View projects": "View projects",
      "Contact me": "Contact me",
      profile: "Profile",
      "about me": "About me",
      about_me_desc: "Hello — I'm Aya, a Web and Mobile Developer passionate about creating responsive, accessible and performant applications. I work across front-end and back-end development and enjoy turning ideas into polished products.",
      focused_on_clean_code: "Focused on clean code, maintainable architecture and reliable user experiences.",
      interested_in_ux: "Interested in UX, animations, developer tooling and modern application development.",
      open_to_collaboration: "Open to collaboration, freelance projects and professional opportunities.",
      toolkit: "Toolkit",
      selected_work: "SELECTED WORK",
      movies_bot: "🎬 Movies Bot",
      chatbot_to_search_movie_data_and_recommendations: "Chatbot to search movie data and recommendations.",
      receipt_management: "📜 Receipt Management",
      tool_to_manage_receipts_and_generate_reports: "Tool to manage receipts and generate reports.",
      stock_manager: "📦 Stock Manager",
      inventory_and_stock_management_platform: "Inventory and stock management platform.",
      noda_plast_film_company_website: "📦 NodaPlastFilm company website",
      company_website_for_noda_plast_film: "Company website for NodaPlastFilm.",
      achievements: "Achievements",
      "let's_connect": "Let's connect",
      name: "Name",
      email: "Email",
      message: "Message",
      send_message: "Send message",
      "let's_talk": "Let's talk",
      "if_you_have_a_project_opportunity_or_question_send_me_a_message_and_i'll_get_back_to_you": "If you have a project, opportunity or question, send me a message and I'll get back to you.",
      copyright: "© {year} Aya Saouli. All rights reserved."
    },

    fr: {
      "skip to content": "Sauter au contenu",
      home: "Accueil",
      about: "À propos de moi",
      skills: "Compétences",
      projects: "Projets",
      certificates: "Certificats",
      contact: "Contact",
      hello_im: "Bonjour — je suis",
      hero_desc: "Je développe des applications web et mobiles modernes avec un accent sur la performance, l'accessibilité et une expérience utilisateur claire et fluide.",
      "View projects": "Voir les projets",
      "Contact me": "Me contacter",
      profile: "Profil",
      "about me": "À propos de moi",
      about_me_desc: "Bonjour — je suis Aya, développeuse web et mobile passionnée par la création d'applications responsives, accessibles et performantes. Je travaille dans le développement front-end et back-end, et j'aime transformer les idées en produits complets et professionnels.",
      focused_on_clean_code: "Je me concentre sur l'écriture de code propre, une architecture maintenable et des expériences utilisateur fiables.",
      interested_in_ux: "J'aime l'expérience utilisateur, les animations, les outils de développement et le développement d'applications modernes.",
      open_to_collaboration: "Je suis ouverte à la collaboration, aux projets indépendants et aux opportunités professionnelles.",
      toolkit: "Outils et technologies",
      selected_work: "Travaux sélectionnés",
      movies_bot: "🎬 Cenima Bot",
      chatbot_to_search_movie_data_and_recommendations: "Un chatbot pour rechercher des données de films et obtenir des recommandations.",
      receipt_management: "📜 gestion des reçus",
      tool_to_manage_receipts_and_generate_reports: "Un outil pour gérer les reçus et générer des rapports.",
      stock_manager: "📦 gestion du stock",
      inventory_and_stock_management_platform: "Une plateforme de gestion de stock et de produits.",
      noda_plast_film_company_website: "📦 site web de la société NodaPlastFilm",
      company_website_for_noda_plast_film: "Un site web pour l'entreprise NodaPlastFilm.",
      achievements: "Réalisations",
      "let's_connect": "Contactez-moi",
      name: "Nom",
      email: "Email",
      message: "Message",
      send_message: "Envoyer le message",
      "let's_talk": "Parlons",
      "if_you_have_a_project_opportunity_or_question_send_me_a_message_and_i'll_get_back_to_you": "Si vous avez un projet, une opportunité ou une question, envoyez-moi un message et je vous répondrai dans les plus brefs délais.",
      copyright: "© {year} Aya Saouli. Tous droits réservés."
    }
  };

  const attributes = {
    en: {
      "Aya Saouli home": "Aya Saouli home",
      "Open menu": "Open menu",
      "Close menu": "Close menu",
      "Switch to light mode": "Switch to light mode",
      "Previous project": "Previous project",
      "Next project": "Next project",
      "Open Movies Bot project": "Open Movies Bot project",
      "Open Receipt Management project": "Open Receipt Management project",
      "Open Stock Manager design": "Open Stock Manager design",
      "Open NodaPlastFilm company website": "Open NodaPlastFilm company website",
      "Previous certificate": "Previous certificate",
      "Next certificate": "Next certificate",
      "Back to top": "Back to top",
      "Social links": "Social links",
      "Your name": "Your name",
      "Write your message...": "Write your message...",
      "Portrait of Aya Saouli": "Portrait of Aya Saouli",
      "Aya Saouli Logo": "Aya Saouli Logo"
    },
    fr: {
      "Aya Saouli home": "Aya Saouli home",
      "Open menu": "Ouvrir le menu",
      "Close menu": "Fermer le menu",
      "Switch to light mode": "Passer en mode clair",
      "Previous project": "Projet précédent",
      "Next project": "Projet suivant",
      "Open Movies Bot project": "Ouvrir le projet Movies Bot",
      "Open Receipt Management project": "Ouvrir le projet de gestion des reçus",
      "Open Stock Manager design": "Ouvrir le design de gestion du stock",
      "Open NodaPlastFilm company website": "Ouvrir le site web de l'entreprise NodaPlastFilm",
      "Previous certificate": "Certificat précédent",
      "Next certificate": "Certificat suivant",
      "Back to top": "Retour en haut",
      "Social links": "Liens sociaux",
      "Your name": "Votre nom",
      "Write your message...": "Écrivez votre message...",
      "Portrait of Aya Saouli": "Portrait d'Aya Saouli",
      "Aya Saouli Logo": "Aya Saouli Logo"
    }
  };

  let currentLanguage = localStorage.getItem("aya-language") || document.documentElement.lang || "en";
  if (!["en", "fr"].includes(currentLanguage)) currentLanguage = "en";

  function translatePage(language = currentLanguage) {
    currentLanguage = language;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fr";

    document.querySelectorAll("[data-i18t]").forEach((element) => {
      const key = element.getAttribute("data-i18t");
      const value = translations[language]?.[key];

      if (value === undefined) return;

      if (key === "copyright") {
        const year = document.getElementById("year")?.textContent || new Date().getFullYear();
        element.textContent = value.replace("{year}", year);
      } else {
        element.textContent = value;
      }
    });

    const attrMap = attributes[language] || {};

    document.querySelectorAll("[aria-label]").forEach((element) => {
      const original = element.getAttribute("aria-label");
      if (attrMap[original]) element.setAttribute("aria-label", attrMap[original]);
    });

    document.querySelectorAll("[placeholder]").forEach((element) => {
      const original = element.getAttribute("placeholder");
      if (attrMap[original]) element.setAttribute("placeholder", attrMap[original]);
    });

    document.querySelectorAll("[alt]").forEach((element) => {
      const original = element.getAttribute("alt");
      if (attrMap[original]) element.setAttribute("alt", attrMap[original]);
    });

    document.querySelectorAll("#languageToggle, #mobileLanguageToggle").forEach((button) => {
      button.textContent = language === "en" ? "FR" : "EN";
      button.setAttribute(
        "aria-label",
        language === "en" ? "Switch to French" : "Switch to English"
      );
    });

    localStorage.setItem("aya-language", language);
    window.AYA_LANGUAGE = language;

    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language } })
    );
  }

  function toggleLanguage() {
    translatePage(currentLanguage === "en" ? "fr" : "en");
  }

  function init() {
    document.querySelectorAll("#languageToggle, #mobileLanguageToggle").forEach((button) => {
      button.addEventListener("click", toggleLanguage);
    });

    translatePage(currentLanguage);
  }

  window.AyaI18n = {
    translations,
    getLanguage: () => currentLanguage,
    setLanguage: translatePage,
    toggleLanguage
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
