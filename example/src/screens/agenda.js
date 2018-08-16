import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  require,
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
      <Text>aaaa</Text>
      <View style={{flex:2,borderColor:'#ded5c1',borderWidth:1}}>
      <Agenda
        style={{hight:300}}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2018-08-17'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        //markingType={'2018-08-19'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
         // monthFormat={'yyyy'}
        theme={{backgroundColor:'#f7f3e9',agendaKnobColor: '#fd9944',agendaTodayColor:'#fd9944',selectedColor:'#fd9944'}}
        onRefresh={() => console.log('refreshing...')}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
      </View>
      <View style={{flex:1,backgroundColor:'#f7f3e9'}}>
        <Text>お気に入りレシピとかのスペース</Text>
      </View>
      </View>

    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          //const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < 3; j++) {
            this.state.items[strTime].push({
              name: 'Item  ' + strTime,
              height: 100,
              description:'★★★殿堂入りレシピ★★★つくれぽ1100件ひき肉で簡単ビビンバ＊ナムルと韓国風肉そぼろを作り置きしておくと便利♪',
              img: 'https://img.cpcdn.com/recipes/3807570/280/dcdd6e04ffe2c0eafd817c7bdd844d02.jpg?u=1843442&p=1460900083',
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Image
              source={{uri:item.img}}
              style={{ width: 66, height: 58 }}
          />
        <View style={{}}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection:'row',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth:1,
    borderColor:'#ded5c1',


  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
