import React from 'react';
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native';
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"


export default class TransactionScreen extends React.Component {
    constructor(){
      super()
      this.state={
        hasCameraPermissions:null ,
        scanned: false,
        scannedData: "",
        buttonState :"normal",
      }
    } 
    
    getCameraPermissions=async ()=>{
      const{status} = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({
        hasCameraPermissions :status === "granted"
      })
    }

    handleBarCodeScanned= async({})=>{
      this.setState({
        scanned:true,
        scannedData:data,
        buttonState:"normal"
      })
    }

  
  
  
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned  = this.state.scanned;
      const buttonState = this.state.buttonState;

      if(buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner 
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
           />
        )
      }
      else if (buttonState==="normal"){
        return (
          <View style={styles.container}>
            <Text style={styles.displayText}>
              {hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permissions" }
              </Text>
            <TouchableOpacity style={styles.scanButton}
            onPress={this.getCameraPermissions}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        );
      }
      
    }
  }

  const styles = StyleSheet.create({
    container:{
       flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    displayText:{
      fontSize:30,
      textDecorationLine:"underline"
  
    },
    scanButton:{
      backgroundColor:"yellow",
      margin:10
    },
    buttonText:{
      fontSize:20
    }
  })