const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverView = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }
  res.status(200).render('tours', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.login = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Login page'
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });
  console.log(bookings);
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  if (!bookings) {
    return next(new AppError('Current user doesnt have bookings', 404));
  }

  res.status(200).render('overview', {
    title: 'My Bookings',
    tours
  });
});

exports.myAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'My account'
  });
});
