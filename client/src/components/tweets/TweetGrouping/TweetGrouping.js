import React from 'react';

import Tweet from 'components/tweets/Tweet/Tweet';

const TweetGrouping = ({post, reply}) => {
    return (
        <div style={styles.container} className='tweet__grouping'>
            <Tweet post={post} hasReply={true} />
            <Tweet post={reply} hasReply={true} />
        </div>
    )
}

const styles = {
    container: {
        borderBottom: '1px solid gray'
    }
}

export default TweetGrouping
