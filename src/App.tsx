
import React from 'react';
import { connect } from 'react-redux';
import { fetchUserAsync } from './actions/user.actions';
import './App.css';
import { IUserState } from './reducers/user.reducer';
import { IApplicationState } from './store/store';

interface IProps {
  userDataRequest: IUserState;
  fetchUserAsync: () => void;
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    userDataRequest: state.user
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserAsync: () => dispatch(fetchUserAsync()),
  };
};


class App extends React.Component<IProps> {

  public componentDidMount() {
    this.props.fetchUserAsync();
  }

  private renderPleaseWait(): React.ReactFragment {
    return (
      <div className="App">
        <header className="App-header">
          <p>Please wait...</p>
        </header>
      </div>
    );
  }

  private renderFetchError(): React.ReactFragment {
    return (
      <div className="App">
        <header className="App-header">
          <p>Sorry: an error occured</p>
        </header>
      </div>
    );
  }

  private renderUserDetail(): React.ReactFragment {
    const user = JSON.stringify(this.props.userDataRequest.user);

    return (
      <div className="App">
        <header className="App-header">
          <p>User: {user}</p>
        </header>
      </div>
    );
  }

  public render() {
    if (this.props.userDataRequest.fetching) {
      return this.renderPleaseWait();
    }

    if (this.props.userDataRequest.fetchError) {
      return this.renderFetchError();
    }

    return this.renderUserDetail();
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
