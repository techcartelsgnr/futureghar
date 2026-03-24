import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { Camera } from "lucide-react-native";

import AppHeader from "../../components/AppHeader";
import InputAuthField from "../../components/InputAuthField";
import ButtonWithLoader from "../../components/ButtonWithLoader";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  DeviceSize,
} from "../../theme/theme";

export default function EditProfile() {
  const { colors } = useTheme();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE PICK ================= */

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSave = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Profile Updated");
    }, 1200);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title="Edit Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* PROFILE IMAGE */}

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imageWrapper}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View
                  style={[
                    styles.placeholder,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text style={{ color: colors.textSecondary }}>
                    Add Photo
                  </Text>
                </View>
              )}

              {/* CAMERA ICON */}

              <View
                style={[
                  styles.cameraIcon,
                  { backgroundColor: colors.primaryDark },
                ]}
              >
                <Camera size={16} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* FORM */}

        <InputAuthField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          required
        />

        <InputAuthField
          label="Mobile Number"
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
          required
        />

        <InputAuthField
          label="WhatsApp Number"
          placeholder="Enter WhatsApp number"
          keyboardType="phone-pad"
          maxLength={10}
          value={whatsapp}
          onChangeText={setWhatsapp}
        />

        <InputAuthField
          label="Email ID"
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputAuthField
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        />

        {/* SAVE BUTTON */}

        <View style={{ marginTop: Spacing.xl }}>
          <ButtonWithLoader
            text="Save Changes"
            isLoading={loading}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: DeviceSize.hp(5),
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});