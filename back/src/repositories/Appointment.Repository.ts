
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import moment from "moment-timezone";

const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({

    validateAllowAppointment: function (date: Date, time: string): void {
     
     const [hours, minutes] = time.split(":").map(Number);
   
     if (isNaN(hours) || isNaN(minutes)) {
       throw new Error("Invalid time format.");
     }
   
     
     const appointmentDate = moment.tz(date, "America/Argentina/Buenos_Aires").set({ hour: hours, minute: minutes, second: 0 });
   
     
     const currentDate = moment.tz("America/Argentina/Buenos_Aires");
   
    
     if (appointmentDate.isBefore(currentDate, 'minute')) {
       throw new Error("You cannot schedule appointments in the past.");
     }
   
     
     const diffInHours = appointmentDate.diff(currentDate, 'hours');
     if (diffInHours < 24) {
       throw new Error("You must schedule appointments at least 24 hours in advance.");
     }
   
     
     const dayOfWeek = appointmentDate.day(); 
     if (dayOfWeek === 0 || dayOfWeek === 6) {
       throw new Error("You cannot schedule appointments on weekends.");
     }
   
     
     if (appointmentDate.hour() < 9 || appointmentDate.hour() > 17) {
       throw new Error("You can only schedule appointments between 9:00 and 17:00.");
     }
   },
   
     
     validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
      
       const appointmentFound = await this.findOne({
         where: {
           user: {
             id: userId,
           },
           date: date,
           time: time,
         },
       });
   
       if (appointmentFound) {
         throw new Error(
           `You already have an appointment scheduled with that date and time.`
         );
       }
     },
   });
   
   export default AppointmentsRepository;