import React, {Component} from 'react';
import TextInputMask from 'react-native-text-input-mask';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Alert,
  View,
  Keyboard
}  from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = { altura:0, massa:0, resultado:0, resultadoText: "" },
    this.calcular = this.calcular.bind(this)
  }  

  calcular(){

    const regex_input = /^[0-9.]+$/
    Keyboard.dismiss()
    
    if (this.state.massa && this.state.altura){

      if ( regex_input.test(this.state.massa) && regex_input.test(this.state.altura) ){
        let imc = this.state.massa / (this.state.altura * this.state.altura)

        let state = this.state
        state.resultado = imc
        this.setState(state)

        if ( state.resultado < 16 ){
          state.resultadoText = "Magreza Grave"

        } else if ( state.resultado < 17 ){
          state.resultadoText = "Magreza Moderada"

        } else if ( state.resultado < 18.5 ){
          state.resultadoText = "Magreza Leve"

        } else if ( state.resultado < 25 ){
          state.resultadoText = "Saudável"

        } else if ( state.resultado < 30 ){
          state.resultadoText = "Sobrepeso"

        } else if ( state.resultado < 35 ){
          state.resultadoText = "Obesidade Grau I"

        } else if ( state.resultado < 40 ){
          state.resultadoText = "Obesidade Grau II"
        
        }else {
          state.resultadoText = "Obesidade Grau III"
        
        }
      } else {
        Alert.alert(
          'Preenchimento dos Campos',
          'Por favor, os campos massa e altura devem ser preenchidos somente com números e um ponto, se necessário. \n\n' + 
          'Exemplo: \n\n' +
          'Massa: 81 ou 85.8 \n' +
          'Altura: 1.80 ou 2',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }

    } else {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha os campos massa e altura.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.entradas}>
          <View style={styles.entrada}>
            <TextInputMask placeholder="Massa" keyboardType="numeric" style={styles.input} mask={"[099].[99]"} onChangeText={(massa) => {this.setState({massa})}}/>
            <Text style={styles.inputText}>Kg</Text>
          </View>
          <View style={styles.entrada}>
            <TextInputMask placeholder="Altura" keyboardType="numeric" style={styles.input} mask={"[9].[99]"} onChangeText={(altura) => {this.setState({altura})}}/>
            <Text style={styles.inputText}>M</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        <Text style={styles.resultado}>{this.state.resultado.toFixed(2)}</Text>
        <Text style={[styles.resultado, {fontSize: 35}]}>{this.state.resultadoText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  entradas: {
    flexDirection: 'row'
  },
  entrada: {
    flexDirection: 'row',
    width: "50%"
  },
  button: {
    backgroundColor: "#89ffa5"
  },
  input:{
    height: 80,
    textAlign: "right",
    fontSize: 40,
    marginTop: 15,
    color: "gray"
  },
  inputText:{
    height: 80,
    fontSize: 30,
    marginTop: 35,
    color: "lightgray"
  },
  buttonText: {
    alignSelf: 'center',
    padding: 30,
    fontSize: 25,
    color: "#6dc4a4"
  },
  resultado: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 65,
    padding: 15
  }
});
