import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';

import {
    useTheme,
    FontSizes,
    Spacing,
    BorderRadius,
    TextStyles,
    DeviceSize,
    Fonts,
    Shadows,
} from '../../theme/theme';

import {
    ArrowLeft,
    Share2,
    Bookmark,
    BedDouble,
    Bath,
    Move,
    Phone,
    MessageCircle,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';


const PropertyDetails = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef();

    /* ---------------- Image Slider ---------------- */

    const images = [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    ];

    /* ---------------- Features ---------------- */

    const features = [
        { id: 1, label: '5 Bedrooms', icon: BedDouble },
        { id: 2, label: '3 Bathrooms', icon: Bath },
        { id: 3, label: '2 Floors', icon: Move },
        { id: 4, label: '5000 sqft', icon: Move },
    ];

    const renderImage = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* IMAGE SLIDER */}

                <View>
                    <FlatList
                        ref={sliderRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => {
                            const index = Math.round(
                                e.nativeEvent.contentOffset.x /
                                DeviceSize.width
                            );
                            setActiveIndex(index);
                        }}
                    />

                    {/* BACK BUTTON */}

                    <TouchableOpacity
                        style={[
                            styles.backBtn,
                            { backgroundColor: colors.cardBackground },
                        ]}
                        onPress={()=> navigation.goBack()}
                    >
                        <ArrowLeft size={20} color={colors.textPrimary} />
                    </TouchableOpacity>

                    {/* PAGINATION */}

                    <View style={styles.pagination}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            index === activeIndex
                                                ? colors.primary
                                                : colors.border,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* PROPERTY INFO */}

                <View style={styles.container}>
                    <View style={styles.priceRow}>
                        <Text
                            style={[
                                styles.price,
                                { color: colors.textPrimary },
                            ]}
                        >
                            $3.2 Million
                        </Text>

                        <View style={styles.tags}>
                            <View style={styles.tagGreen}>
                                <Text style={styles.tagText}>
                                    Negotiable
                                </Text>
                            </View>

                            <View style={styles.tagBlue}>
                                <Text style={styles.tagText}>
                                    For Sell
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text
                        style={[styles.commonText, {
                            color: colors.textSecondary,
                            marginTop: 4,
                        }]}
                    >
                        $1,640 - Sqft
                    </Text>

                    {/* READY ROW */}

                    <View style={styles.readyRow}>
                        <Text
                            style={{
                                color: colors.textPrimary,
                                fontSize: FontSizes.small,
                            }}
                        >
                            ✓ Ready to move
                        </Text>

                        <View style={styles.readyIcons}>
                            <Share2
                                size={18}
                                color={colors.textPrimary}
                            />

                            <Bookmark
                                size={18}
                                color={colors.textPrimary}
                            />
                        </View>
                    </View>

                    {/* TITLE */}

                    <Text
                        style={[
                            styles.title,
                            { color: colors.textPrimary },
                        ]}
                    >
                        St. Morgan's House
                    </Text>

                    <Text
                        style={[
                            styles.desc,
                            { color: colors.textSecondary },
                        ]}
                    >
                        3BHK - Modern House with greater architectural view,
                        Minimal Wall Textures, Styles Windows Ultimate
                        facilities in lows price
                    </Text>

                    {/* TAGS */}

                    <View style={styles.tagsRow}>
                        {[
                            'Modern',
                            'Clean Air',
                            'Direct sunlight',
                            'Kids Safe',
                        ].map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.featureTag,
                                    { backgroundColor: colors.surface },
                                ]}
                            >
                                <Text
                                    style={[styles.tagsText, {
                                        color: colors.textPrimary,
                                    }]}
                                >
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* AGENT CARD */}

                    <View
                        style={[
                            styles.agentCard,
                            { backgroundColor: colors.cardBackground },
                        ]}
                    >
                        <View style={styles.agentLeft}>
                            <View
                                style={[
                                    styles.agentAvatar,
                                    { backgroundColor: colors.primary },
                                ]}
                            >
                                <Text style={{ color: '#fff' }}>DK</Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        color: colors.textSecondary,
                                        fontSize: FontSizes.xsmall,
                                        fontFamily: Fonts.quicksand.medium,
                                    }}
                                >
                                    Agent
                                </Text>

                                <Text
                                    style={{
                                        color: colors.textPrimary,
                                        fontSize: FontSizes.xsmall,
                                        fontFamily: Fonts.quicksand.bold,
                                    }}
                                >
                                    DK Fernandes
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.viewBtn,
                                { backgroundColor: colors.surface },
                            ]}
                        >
                            <Text
                                style={{
                                    color: colors.textPrimary,
                                    fontSize: FontSizes.xsmall,
                                    fontFamily: Fonts.quicksand.bold,
                                }}
                            >
                                View Details
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* YOU MAY LIKE */}

                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        You may like
                    </Text>

                    <View style={styles.featureGrid}>
                        {features.map((item) => {
                            const Icon = item.icon;

                            return (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.featureBox,
                                        { backgroundColor: colors.surface },
                                    ]}
                                >
                                    <Icon
                                        size={20}
                                        color={colors.primary}
                                    />

                                    <Text
                                        style={[styles.tagsText, {
                                            color: colors.textPrimary,
                                            marginLeft: 10,
                                        }]}
                                    >
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            {/* BOTTOM ACTION */}

            <View
                style={[
                    styles.bottomBar,
                    { backgroundColor: colors.cardBackground },
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.enquireBtn,
                        { backgroundColor: colors.primary },
                    ]}
                >
                    <Phone size={18} color="#fff" />

                    <Text style={styles.enquireText}>
                        Enquire Now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.chatBtn,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <MessageCircle
                        size={20}
                        color={colors.textPrimary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PropertyDetails;

const styles = StyleSheet.create({
    image: {
        width: DeviceSize.width,
        height: 280,
    },

    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        borderRadius: 40,
    },

    pagination: {
        position: 'absolute',
        bottom: 12,
        alignSelf: 'center',
        flexDirection: 'row',
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        marginHorizontal: 4,
    },

    container: {
        padding: Spacing.md,
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    price: {
        fontSize: FontSizes.xlarge,
        fontFamily: Fonts.quicksand.bold,
    },

    tags: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagsText: {
        fontSize: FontSizes.xsmall,
        fontFamily: Fonts.quicksand.bold,
    },

    tagGreen: {
        backgroundColor: '#22c55e',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.small,
        marginRight: 6,
    },

    tagBlue: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.small,
    },

    tagText: {
        color: '#fff',
        fontSize: FontSizes.small,
        fontFamily: Fonts.quicksand.bold,
    },

    readyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    readyIcons: {
        flexDirection: 'row',
        gap: 12,
    },

    title: {
        fontSize: FontSizes.medium,
        fontFamily: Fonts.quicksand.bold,
        marginTop: Spacing.md,
    },

    desc: {
        fontSize: FontSizes.xsmall,
        fontFamily: Fonts.quicksand.medium,
        marginTop: 6,
        lineHeight: 20,
    },

    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Spacing.sm,
        fontSize: FontSizes.medium,
        fontFamily: Fonts.quicksand.bold,
    },

    featureTag: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.small,
        marginRight: 8,
        marginTop: 6,
    },

    agentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Spacing.md,
        borderRadius: BorderRadius.large,
        marginTop: Spacing.md,
    },

    agentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    agentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    viewBtn: {
        paddingHorizontal: 14,
        justifyContent: 'center',
        borderRadius: BorderRadius.medium,
    },

    sectionTitle: {
        fontFamily: Fonts.quicksand.bold,
        fontSize: FontSizes.medium,
        marginTop: Spacing.lg,
    },

    commonText: {
        fontFamily: Fonts.quicksand.bold,
        fontSize: FontSizes.xsmall,
    },

    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: Spacing.md,
    },

    featureBox: {
        width: '48%',
        padding: Spacing.sm,
        borderRadius: BorderRadius.medium,
        alignItems: 'center',
        marginBottom: Spacing.sm,
        flexDirection: 'row',

    },

    bottomBar: {
        flexDirection: 'row',
        padding: Spacing.md,
        alignItems: 'center',
    },

    enquireBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: BorderRadius.large,
    },

    enquireText: {
        color: '#fff',
        fontSize: FontSizes.small,
        fontFamily: Fonts.quicksand.bold,
        marginLeft: 8,
    },

    chatBtn: {
        marginLeft: 10,
        padding: 14,
        borderRadius: BorderRadius.large,
    },
});