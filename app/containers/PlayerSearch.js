import React, { Component, PropTypes  } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Actions } from 'react-native-router-flux';

import { fetchPlayers } from "../actions/players";
import Loader from "../components/Loader"

class PlayerSearch extends Component {

  constructor(props){
    super(props);

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      loading: false,
      dataSource: dataSource
    }
  };

  componentWillMount() {
    this.setState({loading: true});

    this.props.actions.fetchPlayers().then(data => {
      this.initDataSource(data.players);
    });
  };

  initDataSource(rows) {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(rows);

    this.setState({
      dataSource: dataSource,
      loading: false
    });
  };

  renderRow = player => {
    return (
      <TouchableHighlight
        key={player.id}
        style={styles.playerButton}
        onPress={() => Actions.player({mlbid: player.mlbid})}
        >
        <View key={player.id} style={styles.row}>
          <Image
            source={{uri: `http://mlb.mlb.com/mlb/images/players/head_shot/${player.mlbid}.jpg`}}
            style={styles.playerProfile}
          />
          <Text style={styles.playerName}>{player.firstName} {player.lastName}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  renderList() {
    if (this.state.dataSource._cachedRowCount > 0) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      );
    }
  };

  renderLoader() {
    if (this.state.loading) { return <Loader /> }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={{fontSize:17, fontWeight: '500', color:'rgba(51,51,51,1)'}}>Players</Text>
        </View>

        { this.renderLoader() }

        { this.renderList() }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(239,239,239,1)',
  },
  navBar: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
    paddingTop:31,
    paddingBottom:14,
    borderColor:'rgba(204,204,204,0.5)',
    borderBottomWidth:1,
  },
  row: {
    backgroundColor:'white',
    flexDirection:'row',
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:15,
    marginTop: 3,
    alignItems:'center',
    borderBottomColor:'rgba(204,204,204,0.5)',
    borderBottomWidth: 1,
  },
  playerProfile: {
    backgroundColor:'black',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  playerName: {
    color: 'rgba(153,153,153,1)',
    fontSize: 17,
    paddingLeft: 10,
  },

});

function mapStateToProps(state) {
        return state
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ fetchPlayers }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);
