import React, {Component} from 'react';
import axios from 'axios';

const Item = props => (
    <tr>
        <td>{props.item.item_title}</td>
        <td>{props.item.item_description}</td>
    </tr>
)

export default class ItemList extends Component {

  constructor(props) {
    super(props);
      this.state = {petro: []};
  }

  componentDidMount() {
        axios.get('http://localhost:4000/petro/')
            .then(response => {
                this.setState({petro: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

  itemList() {
        return this.state.petro.map(function(currentItem, i) {
            return <Item item={currentItem} key={i} />;
        });
    }


  render() {
        return (
            <div className="items" style={{ marginTop: 20 }}>
              { this.itemList() }
            </div>
        )
    }
}