import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
} from "../../theme/theme";

import {
  Home,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  ImagePlus,
} from "lucide-react-native";

import InputAuthField from "../../components/InputAuthField";
import ButtonWithLoader from "../../components/ButtonWithLoader";

import { launchImageLibrary } from "react-native-image-picker";
import { Dropdown } from "react-native-element-dropdown";

const AddPropertyScreen = () => {
  const { colors } = useTheme();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- Property Types ---------------- */

  const propertyTypes = [
    { label: "House", value: "house" },
    { label: "Villa", value: "villa" },
    { label: "Apartment", value: "apartment" },
    { label: "Office", value: "office" },
  ];

  /* ---------------- Image Picker ---------------- */

  const pickImages = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 5,
      },
      (response) => {
        if (!response.didCancel && response.assets) {
          setImages([...images, ...response.assets]);
        }
      }
    );
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = () => {
    if (!title || !price) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Property Added Successfully");
    }, 1500);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}

        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Add Property
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          List your property easily
        </Text>

        {/* IMAGE PICKER */}

        <TouchableOpacity
          style={[
            styles.imageUpload,
            { backgroundColor: colors.surface },
          ]}
          onPress={pickImages}
        >
          <ImagePlus size={22} color={colors.primary} />

          <Text
            style={{
              marginLeft: 10,
              color: colors.textPrimary,
              fontFamily: Fonts.quicksand.bold,
            }}
          >
            Upload Property Images
          </Text>
        </TouchableOpacity>

        {/* IMAGE PREVIEW */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.uri }}
              style={styles.previewImage}
            />
          ))}
        </ScrollView>

        {/* PROPERTY TITLE */}

        <InputAuthField
          label="Property Title"
          placeholder="Enter property title"
          icon={<Home size={18} color={colors.textSecondary} />}
          value={title}
          onChangeText={setTitle}
          required
        />

        {/* PRICE */}

        <InputAuthField
          label="Price"
          placeholder="Enter price"
          icon={<DollarSign size={18} color={colors.textSecondary} />}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          required
        />

        {/* LOCATION */}

        <InputAuthField
          label="Location"
          placeholder="Enter location"
          icon={<MapPin size={18} color={colors.textSecondary} />}
          value={location}
          onChangeText={setLocation}
        />

        {/* PROPERTY TYPE */}

        <Text
          style={[
            styles.label,
            { color: colors.textSecondary },
          ]}
        >
          Property Type
        </Text>

        <Dropdown
          style={[
            styles.dropdown,
            { backgroundColor: colors.cardBackground },
          ]}
          data={propertyTypes}
          labelField="label"
          valueField="value"
          placeholder="Select property type"
          value={propertyType}
          onChange={(item) => setPropertyType(item.value)}
          activeColor={colors.cardBackground}
           containerStyle={{
          backgroundColor: colors.surface,
          borderRadius: BorderRadius.large,
          borderColor: colors.divider,
          borderWidth: 1,
        }}
          itemContainerStyle={{ backgroundColor: colors.surface }}
          placeholderStyle={{
          fontFamily: Fonts.quicksand.bold,
          fontSize: FontSizes.small,
          color: colors.textTertiary,
        }}
        selectedTextStyle={{
          fontFamily: Fonts.quicksand.bold,
          fontSize: FontSizes.small,
          color: colors.textPrimary,
        }}
        itemTextStyle={{
          fontFamily: Fonts.quicksand.bold,
          fontSize: FontSizes.small,
          color: colors.textPrimary,
        }}
        />

        {/* BEDROOMS */}

        <InputAuthField
          label="Bedrooms"
          placeholder="Number of bedrooms"
          icon={<BedDouble size={18} color={colors.textSecondary} />}
          keyboardType="numeric"
          value={bedrooms}
          onChangeText={setBedrooms}
        />

        {/* BATHROOMS */}

        <InputAuthField
          label="Bathrooms"
          placeholder="Number of bathrooms"
          icon={<Bath size={18} color={colors.textSecondary} />}
          keyboardType="numeric"
          value={bathrooms}
          onChangeText={setBathrooms}
        />

        {/* SUBMIT BUTTON */}

        <View style={{ marginTop: Spacing.lg }}>
          <ButtonWithLoader
            text="Submit Property"
            isLoading={loading}
            onPress={handleSubmit}
          />
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default AddPropertyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },

  title: {
    fontSize: FontSizes.xlarge,
    fontFamily: Fonts.quicksand.bold,
  },

  subtitle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.medium,
    marginBottom: Spacing.lg,
  },

  imageUpload: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.md,
  },

  previewImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.medium,
    marginRight: 10,
    marginBottom: Spacing.md,
  },

  dropdown: {
    height: 50,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  label: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
    marginBottom: 5,
  },
});