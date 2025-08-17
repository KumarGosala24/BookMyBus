# from django.db import models
# from django.contrib.auth.models import User

# # Create your models here.

# class Bus(models.Model):
#     bus_name = models.CharField(max_length=100)
#     bus_number = models.CharField(max_length=20,unique=True)
#     origin = models.CharField(max_length=100)
#     destination = models.CharField(max_length=100)
#     features = models.TextField(blank=True, null=True)
#     departure_time = models.TimeField()
#     arrival_time = models.TimeField()
#     no_of_seats = models.PositiveIntegerField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)


#     def __str__(self):
#         return f"{self.bus_name} ({self.bus_number}) from {self.origin} to {self.destination}"


# class Seat(models.Model):
#     bus = models.ForeignKey('Bus', on_delete=models.CASCADE, related_name='seats')
#     seat_number = models.CharField(max_length=10)
#     is_booked = models.BooleanField(default=False)

#     def __str__(self):
#         return f"Seat {self.seat_number} on {self.bus.bus_name} ({self.bus.bus_number})"



# class Booking(models.Model):
#     user = models.ForeignKey(User, on_delete = models.CASCADE)
#     bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
#     seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
#     booking_time = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"Booking by {self.user.username} for {self.bus.bus_name} ({self.seat.seat_number}) on {self.booking_time.strftime('%Y-%m-%d %H:%M:%S')}"




from django.db import models
from django.contrib.auth.models import User

# -------------------------
# Bus Model
# -------------------------
class Bus(models.Model):
    bus_name = models.CharField(max_length=100)
    bus_number = models.CharField(max_length=20, unique=True)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    features = models.TextField(blank=True, null=True)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    no_of_seats = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.bus_name} ({self.bus_number}) from {self.origin} to {self.destination}"


# -------------------------
# Seat Model
# -------------------------
class Seat(models.Model):
    bus = models.ForeignKey('Bus', on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"Seat {self.seat_number} on {self.bus.bus_name} ({self.bus.bus_number})"


# -------------------------
# Booking Model
# -------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)
    canceled = models.BooleanField(default=False)  # New field for cancel feature

    def __str__(self):
        return f"Booking by {self.user.username} for {self.bus.bus_name} ({self.seat.seat_number}) on {self.booking_time.strftime('%Y-%m-%d %H:%M:%S')}"
