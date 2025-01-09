
const generateId =(start) =>{
  const gen = start+Math.floor(100 + Math.random() * 9999);
  return gen;    
}

module.exports = generateId;