// App.js
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import RecurringPicker from '../../components/RecurringPicker'
import { format } from 'date-fns'

const App = () => {
  const [events, setEvents] = useState([])

  const getRecurringEvents = () => {
    const recurringEvents = []

    events.forEach(event => {
      const { start, end, recurringType, recurrenceCount } = event

      let currentDate = new Date(start)

      for (let i = 0; i < recurrenceCount; i++) {
        recurringEvents.push({
          title: event.title,
          start: currentDate.toISOString(),
          end: new Date(
            currentDate.getTime() + (new Date(end) - new Date(start))
          ).toISOString()
        })

        if (recurringType === 'weekly') {
          currentDate.setDate(currentDate.getDate() + 7)
        } else if (recurringType === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + 1)
        }
      }
    })

    return recurringEvents
  }

  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  })

  console.log(
    '🚀 ~ file: Home.screen.js:50 ~ App ~ selectedDates:',
    selectedDates
  )

  const onDayPress = day => {
    const { start, end } = selectedDates

    if (!start || (start && end)) {
      // If no start date selected or both start and end dates are selected, set a new start date
      setSelectedDates({
        start: new Date(day.dateString).toISOString().slice(0, -5),
        end: null
      })
    } else {
      // If start date is already selected, set the end date
      setSelectedDates({
        start,
        end: new Date(day.dateString).toISOString().slice(0, -5)
      })
    }
  }

  const selectedEventDates = {
    [selectedDates.start]: {
      startingDay: true,
      color: 'green',
      textColor: 'white',
      selected: true,
      selectedColor: 'blue'
    },
    [selectedDates.end]: {
      endingDay: true,
      color: 'green',
      textColor: 'white',
      selected: true,
      selectedColor: 'red'
    }
  }

  const recurringEvents = getRecurringEvents().reduce((acc, event) => {
    acc[event.start.substring(0, 10)] = {
      marked: true,
      selected: true,
      selectedColor: 'green'
    }
    return acc
  }, {})

  const markedDates = {
    ...recurringEvents,
    ...selectedEventDates
  }

  const [title, setTitle] = useState('')
  const [recurringType, setRecurringType] = useState('weekly')

  const handleTitleChange = text => {
    setTitle(text)
  }

  const handleRecurringTypeChange = value => {
    setRecurringType(value)
  }

  const handleCreateEvent = () => {
    setEvents({
      title: title,
      start: selectedDates.start,
      end: selectedDates.end,
      recurringType: recurringType, // 'weekly' or 'monthly'
      recurrenceCount: 5, // Number of occurrences
      color: 'red' // Specify the color for this date
    })
    // setEvents(eventss)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5E1DA' }}>
      <Calendar markedDates={markedDates} onDayPress={onDayPress} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 15
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            alignSelf: 'center',
            color: 'black'
          }}>
          Title:
        </Text>
        <TextInput
          style={{
            fontSize: 14,
            width: 300,
            color: 'black',
            backgroundColor: 'white'
          }}
          placeholder="Enter Event Title"
          value={title}
          onChangeText={handleTitleChange}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 15
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            alignSelf: 'center',
            color: 'black'
          }}>
          Start Date:
        </Text>
        <TextInput
          editable={false}
          style={{
            fontSize: 14,
            width: 300,
            color: 'black',
            backgroundColor: 'white'
          }}
          placeholder={format(new Date(selectedDates?.start), 'MMMM d, yyyy')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 15
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            alignSelf: 'center',
            color: 'black'
          }}>
          End Date
        </Text>
        <TextInput
          editable={false}
          style={{
            fontSize: 14,
            width: 300,
            color: 'black',
            backgroundColor: 'white'
          }}
          placeholder={format(new Date(selectedDates?.end), 'MMMM d, yyyy')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 15
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            alignSelf: 'center',
            color: 'black'
          }}>
          Recurring Type:
        </Text>
        <RecurringPicker
          value={recurringType}
          onChange={handleRecurringTypeChange}
        />
      </View>
      <View style={{ marginHorizontal: 30 }}>
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View>
    </View>
  )
}

export default App
