import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { Loading } from './styles';

export default class Webview extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params?.repo.name,
  });

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({}),
    }).isRequired,
  };

  displaySpinner = () => (
    <Loading>
      <ActivityIndicator size={30} color="#7159c1" />
    </Loading>
  );

  render() {
    const { route } = this.props;
    return (
      <>
        <WebView
          startInLoadingState
          source={{ uri: route.params?.repo.html_url }}
          style={{ flex: 1 }}
          renderLoading={() => {
            return this.displaySpinner();
          }}
        />
      </>
    );
  }
}
