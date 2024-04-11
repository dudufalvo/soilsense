import uuid
from django.utils import timezone
from django.db import models
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
  image = models.CharField(max_length=150)

  def __str__(self):
    return self.username

class Central(models.Model):
  central_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ForeignKey(CustomUser, on_delete=CASCADE, null=True, blank=True)
  name = models.CharField(max_length=150)
  image = models.CharField(max_length=150)
  latitude = models.FloatField()
  longitude = models.FloatField()

  def __str__(self):
    return self.central_id

class Node(models.Model):
  node_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  central = models.ForeignKey(Central, on_delete=CASCADE)
  latitude = models.FloatField()
  longitude = models.FloatField()

  def __str__(self):
    return self.node_id

class SoilData(models.Model):
  soil_data_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  node = models.ForeignKey(Node, on_delete=CASCADE)
  moisture = models.FloatField()
  timestamp = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return self.soil_data_id