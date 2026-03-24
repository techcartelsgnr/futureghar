import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import {
  useTheme,
} from "../../theme/theme";

import PropertyCard from "../../screens/property/PropertyCard";

const { width, height } = Dimensions.get("window");

export default function MapViewScreen({ navigation }) {

  const { colors } = useTheme();

  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: "1",
      latitude: 26.9124,
      longitude: 75.7873,
      image: "https://picsum.photos/500/300",
      price: "75,00,000",
      title: "Luxury 3BHK Apartment",
      location: "Jaipur",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
    },
    {
      id: "2",
      latitude: 28.6139,
      longitude: 77.2090,
      image: "https://picsum.photos/500/301",
      price: "1,10,00,000",
      title: "Modern Villa",
      location: "Delhi",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
    },
  ];

  return (
    <View style={{ flex: 1 }}>

      {/* GOOGLE MAP */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 26.9124,
          longitude: 75.7873,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >

        {properties.map((property) => (

          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            onPress={() => setSelectedProperty(property)}
          />

        ))}

      </MapView>

      {/* PROPERTY CARD PREVIEW */}

      {selectedProperty && (

        <View style={styles.cardWrapper}>

          <PropertyCard
            item={selectedProperty}
            onPress={() =>
              navigation.navigate("PropertyDetail", {
                item: selectedProperty,
              })
            }
          />

        </View>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  map: {
    width: width,
    height: height,
  },

  cardWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

});