import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { addDays, format } from 'date-fns'

const Profile = () => {
  const [recurringEvents, setRecurringEvents] = useState({})

  const generateRecurringDates = (startDate, frequency, numOccurrences) => {
    const recurringDates = {}
    let currentDate = new Date(startDate)

    for (let i = 0; i < numOccurrences; i++) {
      const dateStr = format(currentDate, 'yyyy-MM-dd')
      recurringDates[dateStr] = { marked: true, dotColor: 'red' }

      currentDate = addDays(currentDate, frequency)
    }

    return recurringDates
  }

  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  })

  // Example: Weekly recurring events starting from '2023-12-11', for 5 occurrences
  const weeklyRecurringEvents = generateRecurringDates(
    selectedDates.start,
    7,
    5
  )

  // const handleDayPress = day => {
  //   // Handle the selected date
  //   console.log('Selected date:', day.dateString)
  // }

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

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{ ...weeklyRecurringEvents, ...recurringEvents }}
      />
    </View>
  )
}

export default Profile
