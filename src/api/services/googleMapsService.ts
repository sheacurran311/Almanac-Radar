import { Client } from "@google/maps";

const client = new Client({});

export const getPlaceDetails = (placeId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.place({
      placeid: placeId,
      fields: ['name', 'formatted_address', 'geometry']
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.json.result);
      }
    });
  });
};

export const getNearbyPlaces = (latitude: number, longitude: number, radius: number, type: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.placesNearby({
      location: [latitude, longitude],
      radius: radius,
      type: type
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.json.results);
      }
    });
  });
};