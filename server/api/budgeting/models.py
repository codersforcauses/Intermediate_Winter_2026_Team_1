from django.db import models

# Create your models here.
class Budget(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    aim_date = models.DateField()
    saving_frequency = models.CharField(max_length=20, choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
