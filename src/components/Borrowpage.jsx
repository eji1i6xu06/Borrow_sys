import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ItemList from 'components/ItemList.jsx';
import Calendar from 'components/Calendar.jsx';
import TimeTable from 'components/TimeTable.jsx';
import 'components/Borrowpage.css'
import ITEM from 'components/item.json';

export default class Borrowpage extends React.Component {
  constructor(props) {
    super(props);

    const ax = axios.create({
      baseURL: 'http://localhost:7070/components'
    })
    ax.get('testdata.json')
    /*
    axios({
      method:'get',
      url:'/Users/winston/Desktop/Borrow_sys/src/components/testdata.json',
      params: {'operator_uid':0},
      headers: {
        'Access-Control-Allow-Origin': 'http://140.114.84.187:5000/',
      },
      timeout: 1000,
      "routes": {"cors": true}
    })
    .then(function(response) {
      var item_iid = response.data.payload.map(function(item){return(item.iid)}); 
      var item_name = response.data.payload.map(function(item){return(item.item_name)});
      var item = response.data.payload.map(function(item){return [item.iid, item.item_name]});
      //console.log(item_iid)
      //console.log(item_name)
      self.setState({id: item_iid, name: item_name})
      return item;
    });
    */
    this.state = {
      date: moment(),
      selectedDays: [],
    	selectedItems: [],
      item: ['- Select -', ...ITEM.item[0].name],
      //item: this.loadData()
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleItemList = this.toggleItemList.bind(this);
    this.restoreItems = this.restoreItems.bind(this);
    //this.loadData = this.loadData.bind(this);
  }
  
  toggleItemList(item) {
    const isPicked = this.state.selectedItems.includes(item);

    this.setState({
      item: this.state.item.filter(function(stuff){return(stuff != item)})
    })
  
    if (isPicked != 'True') {
      this.setState({
        selectedItems: [...this.state.selectedItems, item]
      })
    }  
  }

  toggleCalendar(e) {
    const className = e.target.className;
    const isPicked = this.state.selectedDays.includes(className);
    
    
    if (isPicked){
      this.setState({
        selectedDays: this.state.selectedDays.filter(function(item){
                        return item != className
                      })
      })
    }
    else{
      if (this.state.selectedDays.length <= 6){
        this.setState({
          selectedDays: [...this.state.selectedDays, className]
        })
      }
      else {
        alert('選擇天數不可超過七天')
      }
    }
  }
  /*
  loadData() {
    var self = this;
    return axios({
      method:'get',
      url:'http://140.114.84.187:5000/api/items/read',
      params: {'operator_uid':0},
      headers: {
        'Access-Control-Allow-Origin': 'http://140.114.84.187:5000/',
      },
      timeout: 1000,
      "routes": {"cors": true}
    })
    .then(function(response) {
      var item_iid = response.data.payload.map(function(item){return(item.iid)}); 
      var item_name = response.data.payload.map(function(item){return(item.item_name)});
      var item = response.data.payload.map(function(item){return [item.iid, item.item_name]});
      //console.log(item_iid)
      //console.log(item_name)
      self.setState({id: item_iid, name: item_name})
      return item;
    });
  }
  */
  restoreItems(item) {
    this.setState({
      item: [...this.state.item, item],
      selectedItems: this.state.selectedItems.filter(function(stuff){return(stuff != item)})
    })
  }

  render() {
    return (
      <div>
        <div id = "ItemList">
        	<ItemList 
        		choosedItems = {this.toggleItemList}
        		selectedItems = {this.state.selectedItems}
        		item = {this.state.item}
            restoreItems = {this.restoreItems}
        	/>
        </div>
        <div id = "Calendar"> 
          <Calendar
            onChangeMonth={(date) => this.setState({date})}
            date = {this.state.date}
            choosedDays = {this.toggleCalendar}
            selectedDays = {this.state.selectedDays}
          />
        </div>
        <div id = "TimeTable">  
          <TimeTable 
            frontDate={this.state.selectedDays}
            item={this.state.selectedItems}
          />
        </div>
      </div>
    );
  }
}