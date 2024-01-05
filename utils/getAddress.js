import endpoints from "../assets/endpoints/endpoints";


export default getAddress = async (lat, lng, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + endpoints.gg;
    const response = await fetch(url);
    const data = await response.json();

    // console.log("rtyui",data)
    return callback(data.results);
}