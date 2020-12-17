import React from 'react';
import { connect } from 'react-redux';

import withLoading from '../../../hocs/withLoading';

import ActionTypes from '../../../actions';
import { fetchPosts, updatePostByID } from '../../../actions/postActions';
import { createErrorSelector } from '../../../actions/requestActions';

import SearchItem from '../../../components/searchItem';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        {this.props.isLoading ? 'Loading results...' : (this.props.errorMessage
          || (
          <>
            {/* Number of results available for given query and filter options */}
            {/* Check if there have been results loaded or if there is an array of posts in redux */}
            <p>{this.props.numResults || (this.props.results && this.props.results.length) ? this.props.numResults || this.props.results.length : 0} results</p>

            {/* Go through passed data array and break into SearchItem elements */}
            {this.props.results && this.props.results.length ? this.props.results.map((element) => {
              return <SearchItem key={element.id || element._id} displayObject={element} />;
            }) : null}
          </>
          )
        )}
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const errorSelector = createErrorSelector([ActionTypes.SEARCH, ActionTypes.FETCH_POSTS]);

const mapStateToProps = (state) => ({
  results: state.post.results,
  numResults: state.post.numResults,
  errorMessage: errorSelector(state),
});

// Waits for fetchPosts action to resolve or reject
const LoadingSearchPane = withLoading(SearchPane, [ActionTypes.FETCH_POSTS, ActionTypes.SEARCH]);

export default connect(mapStateToProps, { fetchPosts, updatePostByID })(LoadingSearchPane);
