import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { addDays, addWeeks, addMonths, format } from 'date-fns'
import RecurringPicker from '../../components/RecurringPicker'

const RecurringEventsCalendar = ({ recurrenceType }) => {
  const [markedDates, setMarkedDates] = useState({})
  const [recurringType, setRecurringType] = useState('weekly')
  console.log(
    '🚀 ~ file: Home.screen.js:10 ~ RecurringEventsCalendar ~ recurringType:',
    recurringType
  )
  const generateRecurringDates = (
    startDate,
    frequency,
    numOccurrences,
    recurrenceType
  ) => {
    const recurringDates = {}
    let currentDate = new Date(startDate)

    for (let i = 0; i < numOccurrences; i++) {
      const dateStr = format(currentDate, 'yyyy-MM-dd')
      recurringDates[dateStr] = {
        marked: true,
        dotColor: 'white',
        selected: true,
        selectedColor: 'green'
      }

      if (recurrenceType === 'daily') {
        currentDate = addDays(currentDate, frequency)
      } else if (recurrenceType === 'weekly') {
        currentDate = addWeeks(currentDate, frequency)
      } else if (recurrenceType === 'monthly') {
        currentDate = addMonths(currentDate, frequency)
      }
    }

    return recurringDates
  }

  const handleRecurringTypeChange = value => {
    setRecurringType(value)
  }

  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  })

  const handleDayPress = day => {
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

  const startDate = selectedDates?.start
  const numOccurrences = 30

  const updatedMarkedDates = generateRecurringDates(
    startDate,
    1,
    numOccurrences,
    recurringType
  )

  return (
    <View style={{ flex: 1 }}>
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
          Select:
        </Text>
        <RecurringPicker
          value={recurringType}
          onChange={handleRecurringTypeChange}
        />
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{ ...markedDates, ...updatedMarkedDates }}
      />
    </View>
  )
}

export default RecurringEventsCalendar
