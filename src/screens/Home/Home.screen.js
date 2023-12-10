// App.js
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import RecurringPicker from '../../components/RecurringPicker'

const App = () => {
  const [events, setEvents] = useState([
    {
      title: 'Recurring Event',
      start: '2023-12-11T10:00:00',
      end: '2023-12-11T12:00:00',
      recurringType: 'weekly', // 'weekly' or 'monthly'
      recurrenceCount: 5, // Number of occurrences
      color: 'red' // Specify the color for this date
    }
  ])
  console.log('🚀 ~ file: Home.screen.js:17 ~ App ~ events:', events)

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
        start: day.dateString,
        end: null
      })
    } else {
      // If start date is already selected, set the end date
      setSelectedDates({
        start,
        end: day.dateString
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
  const [eventss, setEventss] = useState({})

  const handleTitleChange = text => {
    setTitle(text)
  }

  const handleRecurringTypeChange = value => {
    setRecurringType(value)
  }

  const handleCreateEvent = () => {
    // TODO: Validate input and handle recurring events based on recurringType

    // For simplicity, adding a single event for non-recurring events
    const event = { marked: true, dotColor: 'blue' }
    const startDateFormat = format(new Date(startDate), 'yyyy-MM-dd')
    const endDateFormat = format(new Date(endDate), 'yyyy-MM-dd')

    setEventss(prevEvents => ({
      ...prevEvents,
      [startDateFormat]: event,
      [endDateFormat]: event
    }))
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
          placeholder={selectedDates?.start}
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
          placeholder={selectedDates?.end}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 15
        }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>
          Recurring Type:
        </Text>
        <RecurringPicker
          value={recurringType}
          onChange={handleRecurringTypeChange}
        />
      </View>

      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  )
}

export default App
