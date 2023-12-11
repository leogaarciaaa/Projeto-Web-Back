import { Router } from "express";
import { UserOperations } from "../model/userModel.js";
import { GuestOperations } from "../model/guestModel.js";
import { RoomOperations } from "../model/roomModel.js";
import { BookingOperations } from "../model/bookingModel.js";
import { FeedbackOperations } from "../model/feedbackModel.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const nbDocsUser = await mongoose.model('User').countDocuments();
    const nbDocsGuest = await mongoose.model('Guest').countDocuments();
    const nbDocsRoom = await mongoose.model('Room').countDocuments();
    const nbDocsBooking = await mongoose.model('Booking').countDocuments();
    const nbDocsFeedback = await mongoose.model('Feedback').countDocuments();

    if(nbDocsUser > 0) await mongoose.model('User').deleteMany({});
    if(nbDocsGuest > 0) await mongoose.model('Guest').deleteMany({});
    if(nbDocsRoom > 0) await mongoose.model('Room').deleteMany({});
    if(nbDocsBooking > 0) await mongoose.model('Booking').deleteMany({});
    if(nbDocsFeedback > 0) await mongoose.model('Feedback').deleteMany({});


    const DEFAULT_PASSWORD = '123456';

    let userList = [
      { name: 'Gustavo Pereira', email: 'gpereira@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: false },
      { name: 'Julia Gomes', email: 'julia123@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: false },
      { name: 'Rafaela Silva', email: 'rafasilva01@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: false },
      { name: 'Frederico Cáceres', email: 'elfredcaceres@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: false },
      { name: 'Antonella Ruiz', email: 'ar_qwerty@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: false }
    ];

    let createdUsers = [];
    for (let i = 0; i < userList.length; i++) {
      createdUsers.push(await UserOperations.create(userList[i]));
    }


    let userAdminList = [
      { name: 'Luciano da Rocha Neves', email: 'luciano10@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: true },
      { name: 'Admin da Silva', email: 'admin@mail.com', password: await bcryptjs.hash(DEFAULT_PASSWORD, 8), admin: true }
    ];

    let createdAdmins = [];
    for (let i = 0; i < userAdminList.length; i++) {
      createdAdmins.push(await UserOperations.create(userAdminList[i]));
    }

    
    let guestList = [
      { name: 'Guestino Torres', email: 'guest@mail.com', cpf: '99999999999', birth_date: '1997-05-15T00:00:00.000Z', dependent_guests_number: 4, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) }, //guest
      { name: 'Maria Silva', email: 'maria@mail.com', cpf: '12345678901', birth_date: '1990-08-22T00:00:00.000Z', dependent_guests_number: 2, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'João Oliveira', email: 'joao@mail.com', cpf: '98765432109', birth_date: '1985-03-10T00:00:00.000Z', dependent_guests_number: 3, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Ana Pereira', email: 'ana@mail.com', cpf: '45678901234', birth_date: '1988-11-05T00:00:00.000Z', dependent_guests_number: 1, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Pedro Santos', email: 'pedro@mail.com', cpf: '23456789012', birth_date: '1993-06-18T00:00:00.000Z', dependent_guests_number: 8, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Clara Lima', email: 'clara@mail.com', cpf: '56789012345', birth_date: '1982-09-30T00:00:00.000Z', dependent_guests_number: 4, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Marcos Souza', email: 'marcos@mail.com', cpf: '34567890123', birth_date: '1995-12-07T00:00:00.000Z', dependent_guests_number: 1, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Julia Oliveira', email: 'julia@mail.com', cpf: '78901234567', birth_date: '1980-04-25T00:00:00.000Z', dependent_guests_number: 3, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Lucas Pereira', email: 'lucas@mail.com', cpf: '89012345678', birth_date: '1999-01-15T00:00:00.000Z', dependent_guests_number: 2, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) },
      { name: 'Mariana Costa', email: 'mariana@mail.com', cpf: '67890123456', birth_date: '1987-07-03T00:00:00.000Z', dependent_guests_number: 5, password: await bcryptjs.hash(DEFAULT_PASSWORD, 8) }
    ];

    let createdGuests = [];
    for (let i = 0; i < guestList.length; i++) {
      createdGuests.push(await GuestOperations.create(guestList[i]));
    }


    let roomList = [
      { type: 'Unico Basico', capacity_number: 1, price_per_night: 280, user_admin_id: createdAdmins[1]._id }, //room
      { type: 'Duplo Basico', capacity_number: 2, price_per_night: 350, user_admin_id: createdAdmins[0]._id },
      { type: 'Triplo Basico', capacity_number: 3, price_per_night: 400.5, user_admin_id: createdAdmins[0]._id },  
      { type: 'Duplo Deluxe', capacity_number: 2, price_per_night: 380, user_admin_id: createdAdmins[0]._id },  
      { type: 'Familia Deluxe', capacity_number: 5, price_per_night: 595, user_admin_id: createdAdmins[0]._id },  
      { type: 'Suite Presidencial', capacity_number: 8, price_per_night: 1167.4, user_admin_id: createdAdmins[0]._id },  
    ];

    let createdRooms = [];
    for (let i = 0; i < roomList.length; i++) {
      createdRooms.push(await RoomOperations.create(roomList[i]));
    }

    
    let bookingList = [
      { price: (createdRooms[4].price_per_night * 4), number_of_guests: createdGuests[0].dependent_guests_number, start_date: '2023-10-15', end_date: '2023-10-19', number_of_nights: 4, guest_id: createdGuests[0]._id, room_id: createdRooms[4]._id },
      { price: (createdRooms[5].price_per_night * 8), number_of_guests: createdGuests[0].dependent_guests_number, start_date: '2023-11-10', end_date: '2023-10-18', number_of_nights: 8, guest_id: createdGuests[0]._id, room_id: createdRooms[5]._id },
      { price: (createdRooms[1].price_per_night * 3), number_of_guests: createdGuests[1].dependent_guests_number, start_date: '2023-12-05', end_date: '2023-12-08', number_of_nights: 3, guest_id: createdGuests[1]._id, room_id: createdRooms[1]._id },
      { price: (createdRooms[4].price_per_night * 1), number_of_guests: createdGuests[2].dependent_guests_number, start_date: '2023-05-03', end_date: '2023-05-04', number_of_nights: 1, guest_id: createdGuests[2]._id, room_id: createdRooms[4]._id },
      { price: (createdRooms[0].price_per_night * 6), number_of_guests: createdGuests[3].dependent_guests_number, start_date: '2023-09-21', end_date: '2023-09-27', number_of_nights: 6, guest_id: createdGuests[3]._id, room_id: createdRooms[0]._id },
      { price: (createdRooms[5].price_per_night * 5), number_of_guests: createdGuests[4].dependent_guests_number, start_date: '2023-12-01', end_date: '2023-12-06', number_of_nights: 5, guest_id: createdGuests[4]._id, room_id: createdRooms[5]._id },
    ];

    let createdBookings = [];
    for(let i = 0; i < bookingList.length; i++) {
      createdBookings.push(await BookingOperations.create(bookingList[i]));
    }

    let feedbackList = [
      { }
    ];


    return res.status(201).json({ message: "API installed", users: createdUsers, userAdmins:  createdAdmins, rooms: createdRooms, bookings: createdBookings});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
});



export { router as installApiRoute };