import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'

const RecurringPicker = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const options = ['Weekly', 'Monthly']

  const handleOptionPress = option => {
    setModalVisible(false)
    onChange(option)
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
        onPress={() => setModalVisible(true)}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            alignSelf: 'center',
            color: 'white'
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
          <View
            style={{
              width: 200,
              backgroundColor: '#D3D0E4',
              padding: 16,
              borderRadius: 8
            }}>
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

export default RecurringPicker
