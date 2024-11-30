import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { Pin, CSVPin } from './types';

export const schedulePins = async (
  pins: CSVPin[],
  boardId: string,
  accountId: string,
  userId: string,
  pinsPerDay: number
): Promise<Pin[]> => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  
  const scheduledPins: Pin[] = [];
  let currentDate = new Date(now);
  
  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    const pinIndex = i % pinsPerDay;
    
    // Add 5 minutes between pins
    const scheduledTime = new Date(currentDate);
    scheduledTime.setMinutes(scheduledTime.getMinutes() + (pinIndex * 5));
    
    const scheduledPin: Pin = {
      ...pin,
      boardId,
      accountId,
      userId,
      status: 'scheduled',
      scheduledTime: scheduledTime.getTime()
    };
    
    // Add to Firestore
    const pinsRef = collection(db, 'users', userId, 'pins');
    const docRef = await addDoc(pinsRef, scheduledPin);
    scheduledPins.push({ ...scheduledPin, id: docRef.id });
    
    // Move to next day after pinsPerDay
    if ((i + 1) % pinsPerDay === 0) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return scheduledPins;
};