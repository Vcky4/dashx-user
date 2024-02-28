const getCity = (address: string) => {
    const addressComponents = address.split(', ');
    const rawCity = addressComponents[1];
    const splited = rawCity.split(' ');
    console.log('splited: ', splited);
    //remove the part made of numbers
    const city = splited.filter((item) => isNaN(Number(item))).join(' ');
    console.log('city: ', city);
    return city;
}

export default getCity;