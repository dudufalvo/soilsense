from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .models import CustomUser, Central, Node, SoilData
from .serializers import CentralSerializer, NodeSerializer, SoilDataSerializer, UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, ListUsersSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
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

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
  user = request.user
  serializer = UserSerializer(user, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
  return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
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
    data['user'] = user.id
    serializer = CentralSerializer(data=data)
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
    serializer = NodeSerializer(data=data)
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

@api_view(['GET', 'POST'])
def soil_data_list(request):
  if request.method == 'GET':
    soil_data = SoilData.objects.all()
    serializer = SoilDataSerializer(soil_data, many=True)
    return JsonResponse(serializer.data, safe=False)
  elif request.method == 'POST':
    try:
      data = JSONParser().parse(request)

      # extract data from the request
      moisture = data['uplink_message']['decoded_payload']['moisture']
      device_id = data['end_device_ids']['device_id']
      latitude = data['uplink_message']['rx_metadata'][0]['location']['latitude']
      longitude = data['uplink_message']['rx_metadata'][0]['location']['longitude']
      timestamp = data['received_at']
      battery = data['uplink_message']['decoded_payload']['battery']

      node = Node.objects.get(node_id=device_id)

      # create a dictionary containing the extracted data
      soil_data = {
        'node': node,
        'moisture': moisture,
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
      return JsonResponse({'message': str(e)}, status=400)

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
