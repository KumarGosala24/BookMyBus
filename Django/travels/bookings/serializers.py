

# from rest_framework import serializers
# from .models import Bus, Seat, Booking
# from django.contrib.auth.models import User


# class UserRegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only = True)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']


#     def create(self,validate_date):
#         user = User.objects.create_user(
#             username = validate_date['username'],
#             email = validate_date['email'],
#             password = validate_date['password']
#         )
#         return user 
    

# class BusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Bus
#         fields = '__all__'

# class SeatSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Seat 
#         fields = ['id', 'bus', 'seat_number', 'is_booked']
        

# class BookingSerializer(serializers.ModelSerializer):
#     bus = serializers
#     seat = SeatSerializer()
#     user = serializers.StringRelatedField()

#     class Meta:
#         model = Booking
#         # fields = '__all__'
#         # read_only_fields = ['user', 'booking_time', 'bus', 'seat']
#         fields = ['id', 'seat', 'user', 'booking_time', 'bus']



from rest_framework import serializers
from .models import Bus, Seat, Booking
from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):  # ✅ Fixed typo: 'validate_date' → 'validated_data'
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user



class SeatSerializer(serializers.ModelSerializer):
    # bus = BusSerializer()  # ✅ Nested Bus details inside seat

    class Meta:
        model = Seat
        fields = ['id', 'seat_number', 'is_booked']



class BusSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)  # ✅ Nested seats inside bus
    class Meta:
        model = Bus
        fields = '__all__'  # ✅ Include all fields of Bus model
        # fields = ['id', 'bus_name', 'bus_number', 'origin', 'destination']  # ✅ Only include needed fields


# class SeatSerializer(serializers.ModelSerializer):
#     bus = BusSerializer()  # ✅ Nested Bus details inside seat

#     class Meta:
#         model = Seat
#         fields = ['id', 'bus', 'seat_number', 'is_booked']


class BookingSerializer(serializers.ModelSerializer):
                 # ✅ Shows detailed seat info
    bus = BusSerializer()                # ✅ Shows detailed bus info
    seat = SeatSerializer() 
    user = serializers.StringRelatedField()  # ✅ Shows username

    class Meta:
        model = Booking
        fields = ['id', 'seat', 'user', 'booking_time', 'bus']
