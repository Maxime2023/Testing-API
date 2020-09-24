import React, { Component } from 'react';
import './App.css';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Button, notification, Select, Checkbox, Input, Switch } from 'antd';

const { Option } = Select;

class App extends Component {
  state = {
    url: '',
    config: {},
    apiSelected: 0,
    apiValidated: 0,
    isChecked: false,
    isHeader: true,
    value: "",
    testImage: "",
    isLogedIn: true,
    api: "transactions"
  }

  componentDidMount() {
    const auth = {
      headers: {
        "Authorization" : localStorage.getItem("Token"),
      }
    };
    this.setState({config: auth});
  }

  handleChange = (value) => {
    this.setState({apiSelected: value});
  }

  handleCheck = () => {
    this.setState({isChecked: !this.state.isChecked})
  }               

  handleHeader = () => {
    this.setState({isHeader: !this.state.isHeader})
  }

  openNotification = (str, msg, colorSent) => {
    notification.open({
      style: {color: colorSent},
      message: msg,
      description: str,
    });
  }

  modifyUrl = (e) => {
    this.setState({value: e.target.value});
    this.setState({url: e.target.value});
  }

  clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
  }
  onChangeSwicth = (checked) => {
    
    if (checked === true) {
      this.setState({api: "transactions"})
    }
    else {
      this.setState({api: "map"})
    }
  }

  callApi = () => {
    const url = [
      "https://jsonplaceholder.typicode.com/todos/1",
      "https://2fthddyg5m.execute-api.eu-central-1.amazonaws.com/Prod/get/get?map=cp%2F3876_australia_vodafone_062018.map&srs=EPSG%3A3857&transparent=true&format=image%2Fpng&exceptions=application%2Fvnd.ogc.se_xml&styles=&tiled=true&feature_count=101&service=WMS&version=1.1.1&request=GetMap&layers=ORTHO&bbox=15429272.781532537%2C-4138606.4594725817%2C15439056.72115304%2C-4128822.5198520795&width=256&height=256",
      "https://3kzsy3ah3h.execute-api.eu-central-1.amazonaws.com/Prod/tms/mosaic/ndvimask/1/0/1/1/1/1.png",
      `https://vr77y6sw57.execute-api.eu-central-1.amazonaws.com/TestCognitoToken/${this.state.api}`
    ]
    // axios.get(url[this.state.apiSelected], this.state.config).then((response) => {
    //   var test = btoa(unescape(encodeURIComponent(response.data)));
    //   this.setState({testImage: "data:image/png;base64," + btoa(unescape(encodeURIComponent(test)))})
    //   console.log("test", this.state.testImage)
    // }).catch((error) => {
    //   console.log(error)
    // })

    var xhr = new XMLHttpRequest();
    if (this.state.isChecked) {
      xhr.open("GET", this.state.value, true);
    }
    else {
      xhr.open("GET", url[this.state.apiSelected], true);
    }
    if (this.state.isHeader)
      xhr.setRequestHeader("Authorization", localStorage.getItem("Token"));
    xhr.onload = function (e) {

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({apiValidated: this.state.apiSelected})
          this.setState({url: this.state.apiSelected})
          console.log("reponse :", xhr.responseText)
          this.setState({url: xhr.responseText});
          this.openNotification("L'API a été correctement appelée", "", "green");
        } else {
          console.error(xhr.statusText);
          this.openNotification(`erreur status : ${xhr.status}`, "Une erreur s'est produite lors de l'appel", "red");
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
      this.openNotification( `erreur status : ${xhr.status}`, "Une erreur s'est produite lors de l'appel", "red")
    }.bind(this);
    xhr.send(null);
  }
  
  identify = () => {
    const authenticationData = {
      Username : "maxime.dizier.luxcarta@gmail.com",
      Password : "Password1!",
    };
    const poolData = {
      UserPoolId : "eu-central-1_cosPuLBeK",
      ClientId : "6cl7iogefk5mjfk5qfsgo2ogmq"
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username : "maxime.dizier.luxcarta@gmail.com",
      Pool : userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        this.openNotification(result.idToken.jwtToken.slice(0, 20) + "...", 'Le Token a été correctement généré :')
        console.log("token generated :", result.idToken.jwtToken)
        localStorage.setItem('Token', result.idToken.jwtToken);
        this.loadScript();
      }.bind(this),
    });
  }

  render() {
    const style = {width: "60%", marginLeft: "20%", marginTop: "2%", textAlign: "center"}
    if (this.state.isLogedIn) {
      return (
      <>
        <div>
          <Button onClick={this.identify} style={style}>OBTENIR UN TOKEN</Button>
        </div>
        <div style={style}>
          Ne pas ajouter le Header <Checkbox onChange={this.handleHeader}></Checkbox>
        </div>
        <div style={style}>
          <Button onClick={this.clearStorage}>Effacer le storage</Button>
        </div>
        <div className="api">
          <div className="select-api">
            <Select  defaultValue="Choisir L'API" onChange={this.handleChange}>
              <Option value="0">API PUBLIQUE</Option>
              <Option value="1">1ere API AWS</Option>
              <Option value="2">2eme API AWS</Option>
              <Option value="3">API PERSO AWS</Option>
            </Select>
          </div>

          <div className="call-api">
            <Button onClick={this.callApi} style={{backgroundColor: "limegreen", color: "white"}}>APPELER L'API</Button>
          </div>
          
        </div>
        {this.state.apiSelected >= 3 ?
          <div className="switch">
            <div className="switchLeft">
              Sans Proxy
            </div>
            <div className="switchMiddle">
              <Switch defaultChecked onChange={this.onChangeSwicth} />
            </div>
            <div className="switchRight">
              Avec Proxy
            </div>
          </div>
          :
          <div></div>
        }
      </>
      )
    }
    else {
      return (
        <div>
          <div style={style}>
            <Input></Input>
          </div>
          <div style={style}>
            <Input></Input>
          </div>
          <div style={style}>
            <Button>Se connecter</Button>
          </div>
        </div>
      )
    }
  }
}

export default App;
