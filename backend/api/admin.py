from django.contrib import admin
from .models import CustomUser, Central, Node, SoilData

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Central)
admin.site.register(Node)
admin.site.register(SoilData)

