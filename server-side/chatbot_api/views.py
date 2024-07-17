from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import numpy as np
from tensorflow import keras
import pickle

model = keras.models.load_model('./chatbot_api/model_info/chat_model.h5')
with open('./chatbot_api/model_info/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
with open('./chatbot_api/model_info/label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)
with open('./chatbot_api/model_info/intents.json') as file:
    data = json.load(file)

max_len = 20

@csrf_exempt
def chatbot_api(request):
    if request.method == 'POST':
        try:
            request_data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data in request body'}, status=400)

        message = request_data.get('message', '')

        if not message:
            return JsonResponse({'error': 'Message cannot be empty'}, status=400)

        result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([message]), truncating='post', maxlen=max_len))
        tag = lbl_encoder.inverse_transform([np.argmax(result)])

        for i in data['intents']:
            if i['tag'] == tag:
                response = np.random.choice(i['responses'])
                return JsonResponse({'response': response})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)
