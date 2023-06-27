const GOOGLE_API_KEY = 'AIzaSyCFIFsboCQJ_fkDbFsmOFguOOPdd1Q1y_o';

export function getMapPreview(lat: number, lng: number) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=AIzaSyCFIFsboCQJ_fkDbFsmOFguOOPdd1Q1y_o`;
    return imagePreviewUrl;
}

export async function getAddress(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!')
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}