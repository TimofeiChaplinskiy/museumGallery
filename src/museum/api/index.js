const index = 'https://www.rijksmuseum.nl/api/nl/collection?q=Q&key=fpGQTuED&format=json';
const  getList = async ()=> {
  return await fetch(index)
      .then(function(response) {
        return response.json();
      })

};

export {
  getList
}
