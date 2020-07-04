

const throwIfEmpty = (param) => {
  throw new Error(`Missing param: ${param}`);
}

module.exports = {
  throwIfEmpty
}