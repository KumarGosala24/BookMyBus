
# authicate, permission, token, status, response, generics, apiviews
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, BusSerializer, BookingSerializer
from rest_framework.response import Response
from .models import Bus, Seat, Booking

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data= request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username= username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token':token.key,
                'user_id': user.id
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class BusListCreateView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class BusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seat_id = request.data.get('seat')
        try:
            seat = Seat.objects.get(id = seat_id)
            if seat.is_booked:
                return Response({'error': 'Seat already booked'}, status=status.HTTP_400_BAD_REQUEST)

            seat.is_booked = True
            seat.save()

            bookings = Booking.objects.create(
                user = request.user,
                bus = seat.bus,
                seat = seat
            )
            serializer = BookingSerializer(bookings)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Seat.DoesNotExist:
            return Response({'error':'Invalid Seat ID'}, status=status.HTTP_400_BAD_REQUEST)
        
class UserBookingView(APIView):
    permission_classes= [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        bookings = Booking.objects.filter(user_id= user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
    



class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            # Fetch the booking
            booking = Booking.objects.get(id=booking_id, user=request.user)
            
            if booking.seat.is_booked is False:
                return Response({'error': 'Booking is already canceled'}, status=status.HTTP_400_BAD_REQUEST)

            # Mark seat as available
            booking.seat.is_booked = False
            booking.seat.save()

            # Optional: you can delete the booking or just mark it canceled
            # booking.delete()  # If you want to remove it from DB
            # Or mark canceled field if you have it:
            # booking.canceled = True
            # booking.save()

            return Response({'success': f'Seat {booking.seat.seat_number} booking canceled'}, status=status.HTTP_200_OK)

        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)



# class CancelBookingView(APIView):
#     """
#     Cancel a booking (only if it belongs to the logged-in user)
#     Also free the seat so it can be booked again
#     """
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, booking_id):
#         try:
#             booking = Booking.objects.get(id=booking_id, user=request.user)

#             # Free the seat
#             booking.seat.is_booked = False
#             booking.seat.save()

#             # Delete the booking
#             booking.delete()

#             return Response({'message': 'Booking cancelled successfully'}, status=status.HTTP_200_OK)

#         except Booking.DoesNotExist:
#             return Response({'error': 'Booking not found or not yours'}, status=status.HTTP_404_NOT_FOUND)
