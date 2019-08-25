const index = 'https://www.rijksmuseum.nl/api/nl/usersets/1836065-meestermatches?key=fpGQTuED&format=json&pageSize=10&page=1';
const  getList = async ()=> {
  return await fetch(index)
      .then(function(response) {
        return response.json();
      })

};
const  Search = async (q = 0, type ='otherTerms', currentIndex = 1, pageSize = 10)=> {
    return await fetch(`https://www.rijksmuseum.nl/api/nl/usersets/1836065-meestermatches?key=fpGQTuED&format=json&q=${q}&type=${type}&page=${currentIndex}&pageSize=${pageSize}`)
        .then(function(response) {
            return response.json();
        })

};
export {
  getList,
    Search
}
