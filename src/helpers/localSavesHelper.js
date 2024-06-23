const HASH = "hash";
const LEVEL = "level";
const FOUND_WORDS = "found-words";

const LocalSavesHelper = {
  getHash() {
    return +localStorage.getItem(HASH) || 0;
  },

  increaseHash() {
    const newHash = this.getHash() + 1;
    localStorage.setItem(HASH, newHash);
    return newHash;
  },

  getFoundedWords() {
    return JSON.parse(localStorage.getItem(FOUND_WORDS)) || [];
  },

  setFoundedWords(words) {
    localStorage.setItem(FOUND_WORDS, JSON.stringify(words));
    return this.increaseHash();
  },
  getLevel() {
    return JSON.parse(localStorage.getItem(LEVEL)) || 1;
  },

  setLevel(level) {
    localStorage.setItem(LEVEL, level);
    return this.increaseHash();
  },
};

export default LocalSavesHelper;
