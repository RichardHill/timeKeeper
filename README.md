timeKeeper

React-Native app to run on iOS and Android

Project uses Firebase as the store handler and redux to maintain application 
state.

To run the app -:

1. Ensure you have xcode installed on iOS
2. Make sure you have react-cli installed
3. On the command line type -: react-native run-ios to run the ios version.

The application allows the user to store simple details about their working day.
It will store the Date a description, hours worked and minutes rounded to the closes 15 minutes in the firebase database. The user can then view these enteries. 

Planned Enhancements -:

1. Properly use redux for app state.
2. Differentiate between Employer and Employee.
3. To be able to send times to the emploter for approval.
4. Set up an hourly rate for work
5. Set up the Employer type and allow them to Authorise work.
6. Add notifications for when employees send time to be authorised.
7. Add a rejection cycle for when times sent for pay are incorrect
8. Styling - cos man it looks rough currently!
