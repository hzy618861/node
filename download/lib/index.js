async function cli() {
    try {
      await require("./check").init()
    } catch (e) {
      console.error(e.message)
    }
  }
  
  module.exports = cli