import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params?.user.name,
  });

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({}),
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    final: false,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadStarred();
  }

  loadStarred = async () => {
    const { stars, page, final, loading } = this.state;

    if (final || loading) return;

    this.setState({ loading: true });

    const { route } = this.props;
    const user = route.params?.user;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    await this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      page: page + 1,
      final: !response.data.length,
    });
  };

  refreshList = async () => {
    await this.setState({
      stars: [],
      page: 1,
      final: false,
      refreshing: true,
    });

    this.loadStarred();

    this.setState({
      refreshing: false,
    });
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <Loading>
        <ActivityIndicator color="#7159c1" size={30} />
      </Loading>
    );
  };

  render() {
    const { route } = this.props;
    const { stars, refreshing } = this.state;
    const user = route.params?.user;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={this.loadStarred} // Função que carrega mais itens
          onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    );
  }
}
