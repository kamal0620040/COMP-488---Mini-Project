from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .serializers import PredictionSerializer

# Load the RNN models from the HDF5 files
def load_models_from_h5():
    rnn_model = keras.models.load_model('./models/rnn_model.h5')
    lstm_model = keras.models.load_model('./models/lstm_model.h5')
    gru_model = keras.models.load_model('./models/gru_model.h5')
    return rnn_model, lstm_model, gru_model

# Load the RNN models
rnn_model, lstm_model, gru_model = load_models_from_h5()

# API endpoint for making predictions
class PredictionView(APIView):
    def post(self, request):
        serializer = PredictionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        model_type = serializer.validated_data['model']
        news = [serializer.validated_data['news']]
        
        # Select the corresponding model based on the model_type
        if model_type == 'rnn':
            model = rnn_model
        elif model_type == 'lstm':
            model = lstm_model
        elif model_type == 'gru':
            model = gru_model
        else:
            return Response({'error': 'Invalid model type'},status=status.HTTP_400_BAD_REQUEST)
        
        # Tokenizing the data
        tokenizer = Tokenizer()
        tokenizer.fit_on_texts(news)
        
        # word_index = tokenizer.word_index
        sequences = tokenizer.texts_to_sequences(news)
        
        # Padding the Tokenize data
        padded_data = pad_sequences(sequences, maxlen=1000)
        
        # Predicting the news is fake or real
        predictions = model.predict(padded_data)

        print(predictions)
       
        # Postprocess the predictions if needed
        return Response({'predictions': predictions.tolist()},status=status.HTTP_200_OK)