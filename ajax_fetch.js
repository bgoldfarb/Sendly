//write a function to retrieve a blob of json
//make an ajax requet using the fetch function

function fetchAlbumsOldWay() {
    //returns a promise
    fetch('http://rallycoding.herokuapp.com/api/music_albums')
    //resolves anothe promise
    .then(res => res.json())
    .then(json => console.log(json))
}


const fetchAlbums = async () => {
   const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
   const json = await res.json()
   console.log(json)
}


fetchAlbums()