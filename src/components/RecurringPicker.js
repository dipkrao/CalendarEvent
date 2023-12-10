import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const RecurringPicker = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const options = ['daily', 'weekly', 'monthly']

  const handleOptionPress = option => {
    setModalVisible(false)
    onChange(option)
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          width: 270,
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
        onPress={() => setModalVisible(true)}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '300',
            alignSelf: 'center',
            color: 'black'
          }}>
          {value}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: 'flex-end' }}>
              <Icon name="times" size={15} color="black" />
            </TouchableOpacity>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOptionPress(item)}>
                  <Text
                    style={{
                      paddingVertical: 8,
                      fontSize: 14,
                      colour: 'black',
                      fontWeight: '600'
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    padding: 16,
    width: 200,
    borderRadius: 8,
    elevation: 5, // This adds a shadow on Android
    shadowColor: '#000', // These properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
})

export default RecurringPicker
