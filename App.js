import React,{useState, useEffect} from 'react';
import { FlatList, Image,  StatusBar, Text, TextInput, View} from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {const myurl = "https://onlinecardappwebservice-7mbz.onrender.com/allcards";
        fetch (myurl)
            .then((response) => {return response.json()})
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })}, [])

    const FilterData = (text) => {
        if (text != '') {
            text = text. toLowerCase();
            let myFilterData = originalData.filter((item) => item.card_name.toLowerCase().includes(text));
            setMyData(myFilterData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={{borderWidth:1}}>{item.card_name}</Text>
                <Image source = {{uri: item.card_pic}} style={{ width: 200, height: 280, marginTop: 10 }}/>
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=> {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
