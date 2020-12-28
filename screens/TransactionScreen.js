import React from "react";
import { Text, View , StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { TextInput } from "react-native-gesture-handler";

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState:"normal",
      scannedBookID:"",
      scannedStudentID:""
    };
  }

handleBarcodeScan = async ({type,data}) => {
  const {buttonState}=this.state
  if (buttonState==="Book ID"){
    this.setState ({
    scanned:true,
    scannedBookID: data,
    buttonState:'normal'
  })
    }
else if (buttonState==="Student ID"){
  this.setState ({
    scanned:true,
    scannedStudentID: data,
    buttonState:'normal'
})
}
}
  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState:id,
      scanned:false
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState

    if(buttonState!=="normal" && hasCameraPermissions){

      return(

        <BarCodeScanner 
        onBarCodeScanned={scanned? undefined:this.handleBarcodeScan}
        />

      )

    }
    else if(buttonState==="normal"){
      return (
        <View style={styles.container}>
          <View>
            <Image 
              source={require("../assets/booklogo.jpg")}
              style={{width:200, height:200 }}
            />
            <Text style={{textAlign:'center', fontSize:30}}>
              WILY APP
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Book ID"
              value={this.state.scannedBookID}
            /> 
            <TouchableOpacity style={styles.scanButton} 
            onPress={()=>{this.getCameraPermissions("Book ID")}}
            >
            <Text style={styles.buttonText}>
              scan
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Student ID"
              value={this.state.scannedStudentID}
            /> 
            <TouchableOpacity style={styles.scanButton}
            onPress={()=>{this.getCameraPermissions("Student ID")}}
            >
            <Text style={styles.buttonText}>
              scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  scanButton: { backgroundColor: "#2196F3", padding: 10, margin: 10 },
  buttonText: { fontSize: 20 },
});
