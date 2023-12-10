from rest_framework import serializers

class PredictionSerializer(serializers.Serializer):
    model = serializers.ChoiceField(choices=['rnn', 'lstm', 'gru'])
    news = serializers.CharField()