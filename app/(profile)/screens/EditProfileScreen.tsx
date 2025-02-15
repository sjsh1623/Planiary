import React, {useState, useEffect, useRef} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Keyboard
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Text} from "@/components/ui/text";
import {Button} from "@/components/ui/button";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const MAX_NICKNAME_LENGTH = 20;
const defaultProfileImage = "https://picsum.photos/22"; // 기본 프로필 이미지
const defaultNickname = "라라라라"; // 기존 닉네임

const EditProfileScreen = () => {
    const router = useRouter();
    const [nickname, setNickname] = useState(defaultNickname);
    const [isFocused, setIsFocused] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null); // 이미지 상태
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            if (inputRef.current) {
                inputRef.current.focus(); // ✅ 화면이 로드되면 자동으로 포커스
            }
        });

        return () => {
            keyboardShowListener.remove();
        };
    }, []);

    // ✅ 갤러리에서 사진 가져오기 (Deprecated 해결)
    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("권한 필요", "갤러리 접근을 허용해야 합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: "photo", // ✅ Deprecated 해결: mediaType을 문자열로 설정
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            setProfileImage(selectedImage);
            console.log("선택된 이미지 URI:", selectedImage);
        }
    };

    const handleClearText = () => {
        setNickname("");
    };

    const isValid = nickname.trim().length > 0;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* 뒤로 가기 버튼 */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="black"/>
            </Pressable>

            {/* 프로필 이미지 (클릭 시 갤러리에서 선택) */}
            <Pressable onPress={pickImage} style={styles.profileContainer}>
                <Image
                    source={{uri: profileImage || defaultProfileImage}} // ✅ 기본 이미지 설정
                    style={styles.profileImage}
                />
            </Pressable>

            {/* 닉네임 입력 필드 */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>닉네임</Text>
                <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="닉네임 입력"
                        placeholderTextColor="#B0B0B0"
                        value={nickname}
                        onChangeText={setNickname}
                        maxLength={MAX_NICKNAME_LENGTH}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {nickname.length > 0 && (
                        <Pressable onPress={handleClearText} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color="#B0B0B0"/>
                        </Pressable>
                    )}
                </View>
            </View>

            {/* 수정 완료 버튼 */}
            <Button
                style={[styles.button, !isValid && styles.buttonDisabled]}
                disabled={!isValid}
                onPress={() => console.log("프로필 수정 완료")}
            >
                <Text style={styles.buttonText}>수정완료</Text>
            </Button>

            {/* 안내 문구 */}
            <Text style={styles.infoText}>한글/영어/숫자/밑줄/띄어쓰기를 사용할 수 있습니다.</Text>
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 10,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#DADADA",
        paddingBottom: 10,
    },
    inputFocused: {
        borderBottomColor: "#007AFF",
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    button: {
        backgroundColor: "#007AFF",
        alignItems: "center",
        borderRadius: 8,
        minHeight: 50,
    },
    buttonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },
});