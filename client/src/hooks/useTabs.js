import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux'

const useTabs = (data) => {
  const [tabs, setTabs] = useState(data);
  const {userDetails, user, isLoading} = useSelector(state => state.auth)

  const history = useHistory();

  const handleTabClick = (id, param) => {
    const prevActiveTab = tabs.find((tab) => tab.isActive === true);

    let newActiveTab = null;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.isActive = true;
        newActiveTab = tab;
        history.push(param)
      } else if (prevActiveTab && tab.id === prevActiveTab.id)
        tab.isActive = false;

      return tab;
    });

    setTabs(updatedTabs);

    return newActiveTab;
  };

  const updateTabs = (status) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.label === status) {
        tab.isActive = true;
      }

      return tab;
    });

    setTabs(updatedTabs);
  };

  return {handleTabClick, updateTabs, tabs};
};

export default useTabs;
