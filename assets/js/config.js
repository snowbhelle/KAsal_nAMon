window.WEDDING_DATA = {
  couple: {
    bride: "Ashley",
    groom: "Kevin",
    monogramLeft: "A",
    monogramRight: "K"
  },
  wedding: {
    isoDate: "2027-08-26T15:30:00+08:00",
    displayDate: "August 26, 2027",
    numericDate: "08 · 26 · 27",
    ceremonyTime: "2:00 PM",
    receptionTime: "5:00 PM",
    venue: "People Center",
    city: "Tacloban City",
    country: "Philippines",
    hashtag: "[Wedding hashtag]",
    guestCount: 150
  },
  rsvp: {
    deadline: "[RSVP deadline]",
    maxAllotmentDefault: 1,

    // GOOGLE SHEETS CONNECTION
    // 1. Deploy google-apps-script/Code.gs as a Web App.
    // 2. Paste the deployment URL ending in /exec below.
    googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbw7IT8CKXamjLxW5i1T2DW36qu2PZwHYyEdtdKiOBCY15j9EPeQ0jdqR_ifTIK3aunG9A/exec",
    backendMode: "google-sheets"
  },
  links: {
    ceremonyMap: "https://www.google.com/maps/search/?api=1&query=People+Center+Tacloban+City",
    receptionMap: "https://www.google.com/maps/search/?api=1&query=People+Center+Tacloban+City",
    hotelSearch: "https://www.google.com/maps/search/hotels+Tacloban+City"
  },
  coordinator: {
    name: "[Coordinator name]",
    phone: "[Coordinator phone]"
  },
  palette: [
    { name: "Burgundy / Wine", hex: "#6B1F2A", guidance: "Deep wine, merlot, oxblood" },
    { name: "Midnight Navy", hex: "#17243A", guidance: "Ink, navy, deep blue" },
    { name: "Forest Green", hex: "#30483A", guidance: "Pine, eucalyptus, hunter green" },
    { name: "Blush", hex: "#C99AA8", guidance: "Muted rose, dusty blush" }
  ],
  schedule: [
    { time: "[2:45 PM]", title: "Guest arrival", note: "Welcome refreshments and seating." },
    { time: "[3:30 PM]", title: "Ceremony", note: "Please be seated before the processional begins." },
    { time: "[5:00 PM]", title: "Cocktails", note: "A relaxed pause before dinner." },
    { time: "[6:00 PM]", title: "Reception", note: "Dinner, toasts and dancing." }
  ],
  story: [
    { year: "20XX", label: "First hello", title: "Where it began", text: "Replace this with the small, specific detail you both still remember about meeting for the first time.", image: "assets/images/story-01.svg" },
    { year: "20XX", label: "First trip", title: "A little farther from home", text: "Add the place, the mishap, the meal, or the moment that made this trip yours.", image: "assets/images/story-02.svg" },
    { year: "20XX", label: "A favorite chapter", title: "Ordinary days, made special", text: "Use this space for the memory your friends and family would immediately recognize as uniquely you.", image: "assets/images/story-03.svg" },
    { year: "20XX", label: "The proposal", title: "The easiest yes", text: "Tell this simply: where you were, what surprised you, and what you remember most clearly.", image: "assets/images/story-04.svg" }
  ]
};
