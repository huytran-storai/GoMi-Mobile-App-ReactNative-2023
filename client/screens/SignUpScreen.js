import {
    View, Text, TouchableOpacity, Image, TextInput,
    TouchableWithoutFeedback,
    Keyboard, Alert, ActivityIndicator,Switch
} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    //mange state for validation
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVerifyError, setPasswordVerifyError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const handleSubmit = async () => {
        if (validateFields()) {
            if (email && password) {
                try {
                    setIsLoading(false)
                    await createUserWithEmailAndPassword(auth, email, password);
                    Alert.alert('Đăng kí thành công!', 'Xin chào bạn', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                } catch (err) {
                    Alert.alert('Đăng kí thất bại!', 'Tài khoản đã tồn tại', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    setIsLoading(true)
                }
            }
        }
    }
    const validateFields = () => {
        let isValid = true;
        // Xác thực họ và tên
        const nameRegex = /[A-Za-z]/;
        if (fullName.trim() === '') {
            setFullNameError('Vui lòng nhập họ và tên');
            isValid = false;
        } else if (!nameRegex.test(fullName.trim())) {
            setFullNameError('Họ và tên nhập không hợp lệ');
            isValid = false;
        } else {
            setFullNameError('');
        }

        // Xác thực số điện thoại
        const phoneRegex = /^\d{10}$/;
        if (phoneNumber.trim() === '') {
            setPhoneNumberError('Vui lòng nhập số điện thoại');
            isValid = false;
        } else if (!phoneRegex.test(phoneNumber.trim())) {
            setPhoneNumberError('Số điện thoại không hợp lệ');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        // Xác thực email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Vui lòng nhập địa chỉ email');
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Email không hợp lệ');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Xác thực mật khẩu
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (password.trim() !== passwordVerify.trim()) {
            setPasswordVerifyError('Mật khẩu không khớp');
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Vui lòng nhập mật khẩu');
            isValid = false;
        } else if (passwordVerify.trim() === '') {
            setPasswordVerifyError('Vui lòng nhập mật khẩu');
            isValid = false;
        }
        else if (!passwordRegex.test(password.trim())) {
            setPasswordError('Mật khẩu không hợp lệ!');
            isValid = false;
        } else {
            setPasswordError('');
        }
        return isValid;


    };
    return (
        <KeyboardAwareScrollView scrollEnabled={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-white h-screen" style={{ backgroundColor: '#429F9E' }}>
                    <SafeAreaView className="flex">
                        <View className="flex-row justify-start">
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                            >
                                <ArrowLeftIcon size="20" color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center">
                        </View>
                    </SafeAreaView>
                    <View className="flex-1 bg-white px-8 pt-8"
                        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                    >
                        {!isLoading ? <View style={{
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            bottom: 120,
                            left: 30,
                            zIndex: 1
                        }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View> : ""}
                        <View className="form space-y-2">
                            <Text className="text-gray-700 ml-4">Họ và tên</Text>
                            <TextInput
                                className={`p-4 bg-gray-100 text-gray-700 rounded-2xl ${fullNameError !== '' && 'border border-red-500'}`}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder='Họ và tên'
                            />
                            {fullNameError !== '' && <Text className="text-red-500 ml-4">{fullNameError}</Text>}
                            <Text className="text-gray-700 ml-4">Địa chỉ email</Text>
                            <TextInput
                                className={`p-4 bg-gray-100 text-gray-700 rounded-2xl ${emailError !== '' && 'border border-red-500'}`}
                                value={email}
                                onChangeText={value => setEmail(value)}
                                placeholder='Địa chỉ email'
                            />
                            {emailError !== '' && <Text className="text-red-500 ml-4">{emailError}</Text>}
                            <Text className="text-gray-700 ml-4">Số điện thoại</Text>
                            <TextInput
                                className={`p-4 bg-gray-100 text-gray-700 rounded-2xl ${phoneNumberError !== '' && 'border border-red-500'}`}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder='Số điện thoại'
                                keyboardType={'phone-pad'}
                            />
                            {phoneNumberError !== '' && <Text className="text-red-500 ml-4">{phoneNumberError}</Text>}
                            <Text className="text-gray-700 ml-4">Mật Khẩu</Text>
                            <TextInput
                                className={`p-4 bg-gray-100 text-gray-700 rounded-2xl ${passwordError !== '' && 'border border-red-500'}`}
                                secureTextEntry
                                value={password}
                                onChangeText={value => setPassword(value)}
                                placeholder='Mật Khẩu'
                            />
                            {passwordError !== '' && <Text className="text-red-500 ml-4">{passwordError}</Text>}
                            <Text className="text-gray-700 ml-4">Nhập Mật Khẩu Lần 2</Text>
                            <TextInput
                                className={`p-4 bg-gray-100 text-gray-700 rounded-2xl ${passwordVerifyError !== '' && 'border border-red-500'}`}
                                secureTextEntry
                                value={passwordVerify}
                                onChangeText={setPasswordVerify}
                                placeholder='Mật Khẩu'
                            />
                            {passwordVerifyError !== '' && <Text className="text-red-500 ml-4">{passwordVerifyError}</Text>}
                            <TouchableOpacity
                                style={{ backgroundColor: '#429F9E' }}
                                className="py-3 rounded-xl" onPress={handleSubmit}
                            >
                                <Text className="font-xl font-bold text-center text-white">
                                    Đăng kí
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center space-x-12 mt-4">
                        <Text className="text-gray-500">Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt(@,$,%,!,~,*,^)</Text>
                        </View>
                        <View className="flex-row justify-center mt-7">
                            <Text className="text-gray-500 font-semibold">Bạn đã có tài khoản rồi?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className="font-semibold text-green-800"> Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

    )
}