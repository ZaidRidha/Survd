const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.checkAppointmentStatus = functions.firestore
  .document('appointments/{appointmentId}')
  .onWrite((change, context) => {
    // Exit if document does not exist (for delete operations)
    if (!change.after.exists) {
      return null;
    }

    const appointment = change.after.data();
    const startTime = appointment.timeDate; // assuming this is a Firestore Timestamp
    const duration = appointment.duration; // in minutes
    const status = appointment.status;

    // Calculate the supposed end time of the appointment
    const endTime = new admin.firestore.Timestamp(startTime.seconds + duration * 60, startTime.nanoseconds);

    // Check if the current Firestore Timestamp is greater than the end time
    if (status !== 'completed' && admin.firestore.Timestamp.now().seconds >= endTime.seconds) {
      // Update the status to 'completed'
      return change.after.ref.update({
        status: 'completed',
      });
    } else {
      return null; // No update required
    }
  });
