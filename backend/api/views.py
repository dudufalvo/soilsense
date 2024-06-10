from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .models import CustomUser, Central, Node, SoilData
from .serializers import CentralSerializer, NodeSerializer, SoilDataSerializer, UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, ListUsersSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from django.utils import timezone
from django.db.models import Avg

class MyTokenObtainPairView(TokenObtainPairView):
  permission_classes = (AllowAny,)
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
  user = request.user
  
  serializer = UserSerializer(user)
  return JsonResponse(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
  return JsonResponse({'message': 'Logout successful'}, status=200)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
  user = request.user
  serializer = UserSerializer(user, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
  return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_users(request):
  users = CustomUser.objects.all()
  serializer = ListUsersSerializer(users, many=True)
  return JsonResponse(serializer.data, safe=False)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
  user_id = request.user.id
  user = CustomUser.objects.get(id=user_id)
  user.delete()
  return JsonResponse({'message': 'User was deleted successfully'}, status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def central_list(request):
  if request.method == 'GET':
    central = Central.objects.all()
    serializer = CentralSerializer(central, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users_central_list(request):
  if request.method == 'GET':
    user = request.user
    central = Central.objects.filter(user=user)
    serializer = CentralSerializer(central, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_central(request):
  user = request.user
  if request.method == 'POST':
    data = JSONParser().parse(request)
    data['data']['user'] = user.id
    print(data['data'])
    serializer = CentralSerializer(data=data['data'])
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def central_detail(request, pk):
  user = request.user
  try:
    central = Central.objects.get(pk=pk)
  except Central.DoesNotExist:
    return JsonResponse({'message': 'The central does not exist'}, status=404)

  if central.user != user:
    return JsonResponse({'message': 'You are not authorized to access this resource'}, status=403)

  if request.method == 'GET':
    serializer = CentralSerializer(central)
    return JsonResponse(serializer.data)
  elif request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = CentralSerializer(central, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)
  elif request.method == 'DELETE':
    central.delete()
    return JsonResponse({'message': 'Central was deleted successfully'}, status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def node_list(request):
  if request.method == 'GET':
    node = Node.objects.all()
    serializer = NodeSerializer(node, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def central_node_list(request, pk):
  user = request.user
  central = Central.objects.get(pk=pk)
  if central.user != user:
    return JsonResponse({'message': 'You are not authorized to access this resource'}, status=403)
  node = Node.objects.filter(central=central)
  serializer = NodeSerializer(node, many=True)
  return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_node(request):
  if request.method == 'POST':
    data = JSONParser().parse(request)
    print("============")
    print(data)
    serializer = NodeSerializer(data=data['data'])
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def node_detail(request, pk):
  try:
    node = Node.objects.get(pk=pk)
  except Node.DoesNotExist:
    return JsonResponse({'message': 'The node does not exist'}, status=404)
  
  # verify if the central associate with the node belongs to the user
  if node.central.user != request.user:
    return JsonResponse({'message': 'You are not authorized to access this resource'}, status=403)
  
  if request.method == 'GET':
    serializer = NodeSerializer(node)
    return JsonResponse(serializer.data)
  elif request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = NodeSerializer(node, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)
  elif request.method == 'DELETE':
    node.delete()
    return JsonResponse({'message': 'Node was deleted successfully'}, status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def node_activate_irrigation(request, pk):
  return JsonResponse({'message': 'Irrigation activated successfully'}, status=200)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def soil_data_list(request):
  if request.method == 'GET':
    soil_data = SoilData.objects.all()
    serializer = SoilDataSerializer(soil_data, many=True)
    return JsonResponse(serializer.data, safe=False)
  elif request.method == 'POST':
    try:
      data = JSONParser().parse(request)
      print(data)

      # extract data from the request
      all_moisture = data['uplink_message']['decoded_payload']['sensorData']
      
      for i in range(len(all_moisture)):
        moisture = all_moisture[i]
        if moisture == "Offline":
          continue

        sensor_id = i
        device_id = data['end_device_ids']['device_id']
        latitude = data['uplink_message']['rx_metadata'][0]['location']['latitude']
        longitude = data['uplink_message']['rx_metadata'][0]['location']['longitude']
        timestamp = data['received_at']
        #battery = data['uplink_message']['decoded_payload']['battery']
        battery = 100

        node = Node.objects.get(node_id=device_id)

        # create a dictionary containing the extracted data
        soil_data = {
          'node': node,
          'moisture': moisture,
          'sensor_id': sensor_id,
          'latitude': latitude,
          'longitude': longitude,
          'timestamp': timestamp,
          'battery': battery
        }

        # create a serializer instance with the extracted data
        serializer = SoilDataSerializer(data=soil_data)
        
        # check if the serializer is valid
        if serializer.is_valid():
          # save the data to the database
          serializer.save()
          return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    except Exception as e:
      print(e)
      return JsonResponse({'message': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def node_soil_data_list(request, pk):
  node = Node.objects.get(pk=pk)
  soil_data = SoilData.objects.filter(node=node)
  serializer = SoilDataSerializer(soil_data, many=True)
  return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'PUT', 'DELETE'])
def soil_data_detail(request, pk):
  try:
    soil_data = SoilData.objects.get(pk=pk)
  except SoilData.DoesNotExist:
    return JsonResponse({'message': 'The soil data does not exist'}, status=404)
  
  if request.method == 'GET':
    serializer = SoilDataSerializer(soil_data)
    return JsonResponse(serializer.data)
  elif request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = SoilDataSerializer(soil_data, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)
  elif request.method == 'DELETE':
    soil_data.delete()
    return JsonResponse({'message': 'Soil data was deleted successfully'}, status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
# function to get the average moisture of a node of the hour, day, week, month, year
def node_average_moisture(request, pk, period):
  node = Node.objects.get(pk=pk)
  soil_data = SoilData.objects.filter(node=node)
  
  # get the current date and time
  current_date = timezone.now()
  
  if period == 'last_ten_data':
    # get the last 10 data of the node and return the moisture and the timestamp
    moisture = []
    time = []
    for data in soil_data.order_by('-timestamp')[:10]:
      moisture.append(data.moisture)
      time.append(data.timestamp.strftime("%d/%m %H:%M"))
    return JsonResponse({'average_moisture': moisture, 'period': time})

  elif period == 'hour':
    # get the average moisture of the last 60 minutes divided in blocks of 5 minutes and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(12):
      start_time = current_date - timezone.timedelta(minutes=(i+1)*5)
      end_time = current_date - timezone.timedelta(minutes=i*5)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%H:%M") + " - " + end_time.strftime("%H:%M"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})
  elif period == 'day':
    # get the average moisture of the today divided in blocks of 1 hour and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(24):
      # start time is the hour 0 of the current day
      start_time = current_date.replace(hour=i, minute=0, second=0, microsecond=0)
      end_time = current_date.replace(hour=i, minute=59, second=59, microsecond=59)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%H:%M"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})
  elif period == 'week':
    # get the average moisture of the last 7 days divided in blocks of 1 day and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(7):
      start_time = current_date - timezone.timedelta(days=(i+1))
      end_time = current_date - timezone.timedelta(days=i)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%A"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})
  elif period == 'month':
    # get the average moisture of the last 30 days divided in blocks of 1 day and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(30):
      start_time = current_date - timezone.timedelta(days=(i+1))
      end_time = current_date - timezone.timedelta(days=i)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%d/%m"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})
  elif period == 'year':
    # get the average moisture of the last 365 days divided in blocks of 1 month and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(12):
      start_time = current_date - timezone.timedelta(days=(i+1)*30)
      end_time = current_date - timezone.timedelta(days=i*30)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%B") + " " + start_time.strftime("%Y"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})
  else:
    return JsonResponse({'message': 'Invalid period'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def central_modes_average_moisture(request, pk, period):
  central = Central.objects.get(pk=pk)
  nodes = Node.objects.filter(central=central)
  soil_data = SoilData.objects.filter(node__in=nodes)
  
  # get the current date and time
  current_date = timezone.now()
  
  if period == 'last_ten_data':
    # get the last 10 data of the node and return the moisture and the timestamp
    moisture = []
    time = []
    for data in soil_data.order_by('-timestamp')[:10]:
      moisture.append(data.moisture)
      time.append(data.timestamp.strftime("%d/%m %H:%M"))
    return JsonResponse({'average_moisture': moisture, 'period': time})
  
  elif period == 'hour':
    # get the average moisture of the last 60 minutes divided in blocks of 5 minutes and return the average and the time block
    average_moisture = []
    time_block = []
    for i in range(12):
      start_time = current_date - timezone.timedelta(minutes=(i+1)*5)
      end_time = current_date - timezone.timedelta(minutes=i*5)
      moisture = soil_data.filter(timestamp__range=(start_time, end_time)).aggregate(Avg('moisture'))
      average_moisture.append(moisture['moisture__avg'])
      time_block.append(start_time.strftime("%H:%M") + " - " + end_time.strftime("%H:%M"))
    return JsonResponse({'average_moisture': average_moisture, 'period': time_block})