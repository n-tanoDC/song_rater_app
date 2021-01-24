import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import PopUpMenu from '../common/PopUpMenu';

import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default (props) => {
  const { 
    sortValue, 
    setSortValue,
    subsciptionsOnly,
    setSubscriptionsOnly } = props;

  const [triggerText, setTriggerText] = useState('');

  const { connectedUser } = useContext(UserContext);

  useEffect(() => {
    switch(sortValue) {
      case 'created_at': 
        setTriggerText('Les plus récentes')
        break;
      case 'upvotes':
        setTriggerText('Les mieux notées')
        break;
      default:
        setTriggerText('Trier')
    }
  }, [sortValue])

  return (
    <View style={styles.header}>
      <PopUpMenu 
        trigger={{ 
          icon: 'chevron-down',
          iconSize: 24,
          text: triggerText, 
          background: colors.primary }}
        options={[
            { 
              icon: 'update', 
              text: 'Les plus récentes', 
              onSelect: () => setSortValue('created_at') 
            },
            { 
              icon: 'thumb-up', 
              text: 'Les mieux notées', 
              onSelect: () => setSortValue('upvotes')
            }
        ]} />
      <TouchableWithoutFeedback onPress={() => setSubscriptionsOnly(!subsciptionsOnly)}>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            disabled={!connectedUser}
            value={subsciptionsOnly}
            onValueChange={newValue => setSubscriptionsOnly(newValue)}
            tintColors={{ true: colors.green, false: colors.grey }} />
          <Text style={styles.checkboxLabel}>Abonnements</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 5,
    fontFamily: 'baloo2-semibold',
    color: colors.darkgrey
  }
})