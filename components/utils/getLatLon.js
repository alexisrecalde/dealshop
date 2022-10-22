import Swal from "sweetalert2";
import { getShippingData } from "../../queries/cart/cart.queries";
import { deliveryVehicle } from "../../utils/constants.utils";

export const getLatLngByZipcode = (
  authToken,
  addressDir,
  postal,
  setShipping,
  isTruckDelivery
) => {
  const originLat = -34.67475708063456;
  const originLon = -58.58622969909215;

  var address = addressDir;
  var postcode = postal;
  var geocoder = new google.maps.Geocoder();
  var longitude, latitude;
  geocoder.geocode(
    {
      address: address + "," + postcode,
    },
    function (results, status) {
      if (status == "OK") {
        longitude = results[0].geometry.location.lng();
        latitude = results[0].geometry.location.lat();
        if (longitude && latitude) {
          longitude = parseFloat(longitude);
          latitude = parseFloat(latitude);
          try {
            const origin = new google.maps.LatLng(originLat, originLon);
            const destination = new google.maps.LatLng(latitude, longitude);

            let distanceInKm = 0;
            let service = new google.maps.DistanceMatrixService();
            service
              .getDistanceMatrix(
                {
                  origins: [origin],
                  destinations: [destination],
                  travelMode: "DRIVING",
                  avoidHighways: true,
                  avoidTolls: true,
                },
                (results) => {
                  if (!results.rows[0].elements[0].distance) {
                    Swal.fire({
                      title: "Error!",
                      text: "Ocurrió un problema al intentar obtener la dirección. Por favor complete con una direccion correcta.",
                      icon: "error",
                      confirmButtonColor: "#00bcd4",
                    });
                    return;
                  } else {
                    const distance = results.rows[0].elements[0].distance.value;
                    distanceInKm = distance / 1000;
                  }
                }
              )
              .then(() => {
                const vehicle = isTruckDelivery
                  ? deliveryVehicle.CAMIONETA
                  : deliveryVehicle.MOTO;
                getShippingData(authToken, distanceInKm, vehicle).then((el) => {
                  setShipping({
                    price: el.price,
                    shippingType: el.shippingType,
                  });
                  return true;
                });
              });
          } catch (e) {
            Swal.fire({
              title: "Error!",
              text: "Ocurrió un problema al intentar obtener la dirección. Por favor intente más tarde.",
              icon: "error",
              confirmButtonColor: "#00bcd4",
            });
            return false;
          }
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un problema al intentar obtener la dirección. Por favor intente más tarde.",
          icon: "error",
          confirmButtonColor: "#00bcd4",
        });
      }
    }
  );
};
