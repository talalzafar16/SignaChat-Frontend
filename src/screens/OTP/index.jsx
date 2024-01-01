import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";

function OTP({navigation}){
    const theme = useTheme();
    const[input1, setInput1] = useState('');
    const[input2, setInput2] = useState('');
    const[input3, setInput3] = useState('');
    const[input4, setInput4] = useState('');
    const[seconds, setSeconds] = useState(60);
    const isButtonEnabled = input1 && input2 && input3 && input4;
    useEffect(()=>{
        if(seconds > 0){
            const Timer = setTimeout(()=>{
                setSeconds(seconds - 1);
            }, 1000)

            return ()=> clearTimeout(Timer);
        }
    }, [seconds]);

  const handleVerifyPress = () => {
    // Perform verification logic here

    if (isButtonEnabled) {
      navigation.navigate('Home');
    }
  };

    return(
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent: 'center', alignContent: 'center'}} keyboardDismissMode="on-drag">
            <Text style={styles.msg}>Code has been send to +92 33******22</Text>
            <View style={styles.inputContainer} KeyboardAvoidingView='on-drag'>
            <TextInput style={styles.input} value={input1} onChangeText={(text)=> setInput1(text)} keyboardType="numeric" keyboardAppearance="dark" maxLength={1}/>
            <TextInput style={styles.input} value={input2} onChangeText={(text)=> setInput2(text)} keyboardType="numeric" keyboardAppearance="dark" maxLength={1}/>
            <TextInput style={styles.input} value={input3} onChangeText={(text)=> setInput3(text)} keyboardType="numeric" keyboardAppearance="dark" maxLength={1}/>
            <TextInput style={styles.input} value={input4} onChangeText={(text)=> setInput4(text)} keyboardType="numeric" keyboardAppearance="dark" maxLength={1}/>
            </View>
            <View style={styles.container2}>
                <Text style={styles.timer}>{`Resend Code in ${seconds} s`}</Text>
                <Pressable style={[styles.btn, isButtonEnabled ? styles.enabledBtn : styles.disabledBtn]} onPress={handleVerifyPress} disabled={!isButtonEnabled}>
                    <Text style={styles.btnTxt}>Verify</Text>
                </Pressable>
            </View>
            
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default OTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection:'column',
        alignContent: 'space-between',
        paddingHorizontal: 16,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        height: 60,
        width: "20%",
        borderColor: '#F33F7F',
        borderWidth: 3,
        textAlign: "center",
        marginHorizontal: 5,
        borderRadius: 15
    },
    msg: {
        textAlign: 'center',
        marginTop: '65%',
        marginBottom: '20%'
    },
    timer: {
        marginTop: '20%',
    },
    container2:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#F33F7F',
        marginTop: 20,
        width: '90%',
        height: 40,
        borderRadius: 20,
        marginTop: '30%'
    },
    btnTxt: {
        textAlign: 'center',
        color: '#ffffff',
        padding: 6,
        fontSize: 16,
        fontWeight: '800'
    },
    enabledBtn: {
        backgroundColor: '#F33F7F',
      },
    
      disabledBtn: {
        backgroundColor: 'grey', 
      },
});
