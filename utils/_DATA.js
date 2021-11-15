let decks = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    topic: "Menopause",
    cards: [
      {
        question: "What Is Menopause?",
        answer:
          "Menopause is the end of a womans menstrual cycles. The term can describe any of the changes you go through just before or after you stop having your period, marking the end of your reproductive years.",
      },
      {
        question: "What Causes Menopause?",
        answer:
          "Menopause happens when the ovaries no longer release an egg every month and menstruation stops. Menopause is a regular part of aging when it happens after the age of 40.",
      },
    ],
    createdAt: 1467166872634,
  },
  "loxhs1bqm25b708cmbf3g": {
    id: "loxhs1bqm25b708cmbf3g",
    topic: "Architecture",
    cards: [
      {
        question: "What Is Architecture?",
        answer:
          'Architecture (Latin architectura, from the Greek ἀρχιτέκτων arkhitekton "architect", from ἀρχι- "chief" and τέκτων "creator") is both the process and the product of planning, designing, and constructing buildings or other structures.',
      },
      {
        question: "Origins and vernacular architecture?",
        answer:
          'Building first evolved out of the dynamics between needs (shelter, security, worship, etc.) and means (available building materials and attendant skills). As human cultures developed and knowledge began to be formalized through oral traditions and practices, building became a craft, and "architecture" is the name given to the most highly formalized and respected versions of that craft.',
      },
    ],
    createdAt: 1468479767190,
  },
};

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...decks }), 1000);
  });
}
