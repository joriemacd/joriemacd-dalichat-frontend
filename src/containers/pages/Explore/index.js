import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import ActionTypes from '../../../state/actionCreators';
import { createLoadingSelector, createErrorSelector } from '../../../state/actionCreators/requestActionCreators';
import { postSearch } from '../../../state/actionCreators/searchActionCreators';

import TabContainer from '../../TabContainer';
import LoadingIcon from '../../../components/LoadingIcon';
import Post from '../../Post';

import { generateMetaTitleFromPage } from '../../../constants';
import './Explore.scss';

const Explore = ({
  userId, postResults, isLoading, errorMessage, ...props
}) => {
  const [activeTab, setActiveTab] = React.useState('New Posts');
  React.useEffect(() => {
    if (activeTab === 'New Posts') {
      props.postSearch();
    } else {
      props.postSearch({ field: 'likes' });
    }
  }, [activeTab]);

  return (
    <div id="explore-container">
      <Helmet>
        <title>{generateMetaTitleFromPage('Explore')}</title>
      </Helmet>

      {isLoading
        ? <LoadingIcon />
        : (
          <TabContainer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <div label="New Posts">
              {postResults.map((post) => (
                <Post
                  postContent={post}
                  className="explore-post"
                  key={post._id}
                />
              ))}
            </div>

            <div label="Popular Posts">
              {postResults.map((post) => (
                <Post
                  postContent={post}
                  className="explore-post"
                  key={post._id}
                />
              ))}
            </div>
          </TabContainer>
        )}
    </div>
  );
};

const watchActions = [ActionTypes.POST_SEARCH];
const loadingSelector = createLoadingSelector(watchActions);
const errorSelector = createErrorSelector(watchActions);

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  postResults: state.post.results?.reduce((accum, id) => [...accum, state.post.posts?.[id]], []) || [],
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { postSearch })(Explore);
