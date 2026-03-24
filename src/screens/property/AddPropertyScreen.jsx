import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

import {
  Video,
  X,
  ImagePlus,
  MapPin,
  Home,
  DollarSign,
  Bed,
  Bath,
  Sparkles,
  ChevronRight,
} from "lucide-react-native";

import InputAuthField from "../../components/InputAuthField";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import AppHeader from "../../components/AppHeader";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  Shadows,
} from "../../theme/theme";

/* ================= STEPS CONFIG ================= */

const steps = [
  { label: "Home", icon: Home },
  { label: "Amenities", icon: Sparkles },
  { label: "Photos", icon: ImagePlus },
  { label: "Video", icon: Video },
];

/* ================= COMPONENT ================= */

export default function AddPropertyScreen() {
  const { colors } = useTheme();

  const [currentStep, setCurrentStep] = useState(0);

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");

  const [amenities, setAmenities] = useState([]);

  const amenitiesList = [
    "Parking",
    "WiFi",
    "Swimming Pool",
    "Gym",
    "Garden",
    "Security",
  ];

  /* ================= IMAGE PICK ================= */

  const pickImages = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 5 },
      (res) => {
        if (res.assets) {
          setImages([...images, ...res.assets]);
        }
      }
    );
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ================= VIDEO PICK ================= */

  const pickVideo = () => {
    launchImageLibrary({ mediaType: "video" }, (res) => {
      if (res.assets) setVideo(res.assets[0]);
    });
  };

  /* ================= AMENITIES ================= */

  const toggleAmenity = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  /* ================= STEP CONTENT ================= */

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InputAuthField
              label="Property Title"
              placeholder="Enter property title"
              icon={<Home size={18} color={colors.textSecondary} />}
              value={title}
              onChangeText={setTitle}
            />

            <InputAuthField
              label="Price"
              placeholder="Enter price"
              keyboardType="numeric"
              icon={<DollarSign size={18} color={colors.textSecondary} />}
              value={price}
              onChangeText={setPrice}
            />

            <InputAuthField
              label="Location"
              placeholder="Enter location"
              icon={<MapPin size={18} color={colors.textSecondary} />}
              value={location}
              onChangeText={setLocation}
            />

            <InputAuthField
              label="Area Size (sqft)"
              placeholder="Enter area"
              keyboardType="numeric"
              value={size}
              onChangeText={setSize}
            />

            <InputAuthField
              label="Bedrooms"
              placeholder="Enter bedrooms"
              keyboardType="numeric"
              icon={<Bed size={18} color={colors.textSecondary} />}
              value={bedrooms}
              onChangeText={setBedrooms}
            />

            <InputAuthField
              label="Bathrooms"
              placeholder="Enter bathrooms"
              keyboardType="numeric"
              icon={<Bath size={18} color={colors.textSecondary} />}
              value={bathrooms}
              onChangeText={setBathrooms}
            />

            <InputAuthField
              label="Description"
              placeholder="Describe property"
              value={description}
              onChangeText={setDescription}
            />
          </>
        );

      case 1:
        return (
          <View style={styles.wrap}>
            {amenitiesList.map((item, index) => {
              const active = amenities.includes(item);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleAmenity(item)}
                  style={[
                    styles.amenity,
                    {
                      backgroundColor: active
                        ? colors.primary
                        : colors.surface,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? "#fff" : colors.textSecondary,
                      fontFamily: Fonts.quicksand.medium,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 2:
        return (
          <>
            <TouchableOpacity
              style={[styles.uploadBox, { borderColor: colors.border }]}
              onPress={pickImages}
            >
              <ImagePlus size={30} color={colors.textSecondary} />
              <Text style={{ color: colors.textSecondary }}>
                Upload Photos
              </Text>
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrap}>
                  <Image source={{ uri: img.uri }} style={styles.image} />

                  <TouchableOpacity
                    style={styles.remove}
                    onPress={() => removeImage(index)}
                  >
                    <X size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        );

      case 3:
        return (
          <>
            <TouchableOpacity
              style={[styles.uploadBox, { borderColor: colors.border }]}
              onPress={pickVideo}
            >
              <Video size={30} color={colors.textSecondary} />
              <Text style={{ color: colors.textSecondary }}>
                Upload Video
              </Text>
            </TouchableOpacity>

            {video && (
              <Text style={{ marginTop: 10 }}>
                Selected: {video.fileName || "Video"}
              </Text>
            )}
          </>
        );
    }
  };

  /* ================= NAVIGATION ================= */

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    console.log("Final Submit");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* 🔥 STEP HEADER */}
      <AppHeader title="Add Property" />

      <View style={styles.stepHeader}>
        {steps.map((step, index) => {
          const Icon = step.icon;

          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <View key={index} style={styles.stepRow}>

              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor:
                      isActive || isCompleted
                        ? colors.primary
                        : colors.surface,
                  },
                ]}
              >
                <Icon
                  size={16}
                  color={
                    isActive || isCompleted
                      ? "#fff"
                      : colors.textSecondary
                  }
                />
              </View>

              {index !== steps.length - 1 && (
                <ChevronRight
                  size={18}
                  color={colors.textTertiary}
                  style={{ marginHorizontal: 6 }}
                />
              )}
            </View>
          );
        })}
      </View>

      {/* CONTENT */}

      <ScrollView contentContainerStyle={styles.content}>
        {renderStepContent()}
      </ScrollView>

      {/* FOOTER */}

      <View style={styles.footer}>
        {currentStep > 0 && (
          <TouchableOpacity onPress={prevStep}>
            <Text style={{ color: colors.textSecondary }}>Back</Text>
          </TouchableOpacity>
        )}

        {currentStep < steps.length - 1 ? (
          <ButtonWithLoader text="Next" onPress={nextStep} />
        ) : (
          <ButtonWithLoader text="Submit" onPress={handleSubmit} />
        )}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: Spacing.md,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  amenity: {
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },

  uploadBox: {
    height: 140,
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  imageWrap: {
    position: "relative",
    marginRight: 10,
  },

  image: {
    width: 120,
    height: 90,
    borderRadius: 10,
  },

  remove: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 3,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.md,
  },
});